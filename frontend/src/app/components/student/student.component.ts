import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  searchTerm: string = '';
  students: Student[] = [];
  studentId: number = 0;
  courses: Course[] = [];
  selectedCourses: Number[] = [];
  loading: boolean = true;
  studentForm!: FormGroup;
  studentInfo!: Student;
  isEditMode: boolean = false;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllStudents();
    this.getAllCourses();
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cell_number: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
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

    if (this.studentForm.invalid) {
      console.log('Invalid form', this.studentForm.invalid);
      return;
    }
    const formData = this.studentForm.value;
    this.studentService
      .addStudent({ ...formData, courses: this.selectedCourses })
      .subscribe((res) => {
        console.log(res); // log the response from the server
        // reset the form after successful submission
        this.studentForm.reset();
        // close the modal after successful submission
        this.modalService.dismissAll();
        // fetch the updated students list
        this.getAllStudents();
      });
  }

  getAllStudents() {
    this.loading = true;
    this.studentService.getAllStudents().subscribe(
      (response) => {
        this.students = response;
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
    return this.filterData(this.students, this.searchTerm);
  }

  onRowClicked(student: Student) {
    console.log('Row clicked:', student);
  }

  openAddStudentModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'addStudentModal',
      size: 'lg',
    });
  }
  onStudentModalClose() {
    this.isEditMode = false;
    this.selectedCourses = [];
    this.modalService.dismissAll();
    this.studentForm.reset();
  }
  onStudentViewModalClose() {
    this.modalService.dismissAll();
  }

  onOpenViewStudentModal(modal: any, id: number) {
    this.studentService.getStudentById(id).subscribe((studentData: any) => {
      // set form values
      this.studentInfo = studentData;
      this.openAddStudentModal(modal);
    });
  }

  editStudent(id: number, studentModal: any) {
    this.studentService.getStudentById(id).subscribe(
      (studentData: any) => {
        // set form values
        this.studentId = studentData.id;
        this.studentForm.setValue({
          name: studentData.name,
          email: studentData.email,
          cell_number: studentData.cell_number,
          age: studentData.age,
          address: studentData.address,
        });
        // this.selectedCourses = studentData.Courses;
        this.selectedCourses = studentData.courses.map(
          (course: any) => course.id
        );

        this.isEditMode = true;
        this.openAddStudentModal(studentModal);
      },
      (error) => {
        console.error(error);
      }
    );
    // const modalRef = this.modalService.open(AddEditStudentModalComponent);
    // modalRef.componentInstance.student = data;
    // modalRef.componentInstance.isEditMode = true;
  }
  onUpdate(id: number) {
    console.log('Update student', id);
    if (this.studentForm.invalid) {
      console.log('Invalid form', this.studentForm.invalid);
      return;
    }

    const formData = this.studentForm.value;
    this.studentService

      .updateStudent(id, {
        ...formData,
        courses: this.selectedCourses,
      })
      .subscribe((res) => {
        console.log(res); // log the response from the server
        // reset the form after successful submission
        this.studentForm.reset();
        // close the modal after successful submission
        this.modalService.dismissAll();
        // fetch the updated students list
        this.getAllStudents();
      });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getAllStudents();
      });
    }
  }
}
