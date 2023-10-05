import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../interfaces/teacher.interface';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  searchTerm: string = '';
  teachers: Teacher[] = [];
  teacherId: number = 0;
  courses: Course[] = [];
  selectedCourses: Number[] = [];
  loading: boolean = true;
  teacherForm!: FormGroup;
  teacherInfo!: Teacher;
  isEditMode: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllTeachers();
    this.getAllCourses();
    this.teacherForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  checkCourse(courseId: number) {
    return this.selectedCourses.includes(courseId);
  }
  onCourseSelect(courseId: number) {
    // check if course is already selected
    const included = this.selectedCourses.includes(courseId);

    if (!included) {
      // add course to selected courses array
      this.selectedCourses.push(courseId);
    } else {
      // remove course from selected courses array
      this.selectedCourses = this.selectedCourses.filter(
        (id) => id !== courseId
      );
    }
    console.log(this.selectedCourses);
  }
  onSubmit() {
    console.log('Form submitted');

    if (this.teacherForm.invalid) {
      console.log('Invalid form', this.teacherForm.invalid);
      return;
    }
    const formData = this.teacherForm.value;
    this.teacherService
      .addTeacher({ ...formData, courses: this.selectedCourses })
      .subscribe((res) => {
        console.log(res); // log the response from the server
        // reset the form after successful submission
        this.teacherForm.reset();
        // close the modal after successful submission
        this.modalService.dismissAll();
        // fetch the updated teachers list
        this.getAllTeachers();
      });
  }

  getAllTeachers() {
    this.loading = true;
    this.teacherService.getAllTeachers().subscribe(
      (response) => {
        this.teachers = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error:', error);
        this.loading = false;
      }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.courses = response;
        console.log(this.courses);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  filterData(data: any[], term: string): any[] {
    return data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  get filteredData(): any[] {
    return this.filterData(this.teachers, this.searchTerm);
  }

  onRowClicked(teacher: Teacher) {
    console.log('Row clicked:', teacher);
  }

  openAddTeacherModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'addTeacherModal',
      size: 'lg',
    });
  }
  onTeacherModalClose() {
    this.isEditMode = false;
    this.selectedCourses = [];
    this.modalService.dismissAll();
    this.teacherForm.reset();
  }
  onTeacherViewModalClose() {
    this.modalService.dismissAll();
  }

  onOpenViewTeacherModal(modal: any, id: number) {
    this.teacherService.getTeacherById(id).subscribe((teacherData: any) => {
      // set form values
      this.teacherInfo = teacherData;
      this.openAddTeacherModal(modal);
    });
  }

  editTeacher(id: number, teacherModal: any) {
    this.teacherService.getTeacherById(id).subscribe(
      (teacherData: any) => {
        // set form values
        this.teacherId = teacherData.id;
        this.teacherForm.setValue({
          name: teacherData.name,
        });
        // this.selectedCourses = teacherData.Courses;
        this.selectedCourses = teacherData.courses.map(
          (course: any) => course.id
        );

        this.isEditMode = true;
        this.openAddTeacherModal(teacherModal);
      },
      (error) => {
        console.error(error);
      }
    );
    // const modalRef = this.modalService.open(AddEditTeacherModalComponent);
    // modalRef.componentInstance.teacher = data;
    // modalRef.componentInstance.isEditMode = true;
  }
  onUpdate(id: number) {
    console.log('Update teacher', id);
    if (this.teacherForm.invalid) {
      console.log('Invalid form', this.teacherForm.invalid);
      return;
    }

    const formData = this.teacherForm.value;
    this.teacherService

      .updateTeacher(id, {
        ...formData,
        courses: this.selectedCourses,
      })
      .subscribe((res) => {
        console.log(res); // log the response from the server
        // reset the form after successful submission
        this.teacherForm.reset();
        // close the modal after successful submission
        this.modalService.dismissAll();
        // fetch the updated teachers list
        this.getAllTeachers();
      });
  }

  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.getAllTeachers();
      });
    }
  }
}
