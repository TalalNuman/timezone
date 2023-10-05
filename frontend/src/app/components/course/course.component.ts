import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  searchTerm: string = '';
  courseId: number = 0;
  courses: Course[] = [];
  fields = ['Science', 'Arts', 'History'];
  courseField = null;
  loading: boolean = true;
  courseForm!: FormGroup;
  courseInfo!: Course;
  isEditMode: boolean = false;

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllCourses();
    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      field: new FormControl('', [Validators.required]),
      credit_hours: new FormControl('', [Validators.required]),
      lab: new FormControl(false, []),
    });
  }

  onSubmit() {
    console.log('Form submitted');

    if (this.courseForm.invalid) {
      console.log('Invalid form', this.courseForm.invalid);
      return;
    }
    const formData = this.courseForm.value;
    this.courseService.createCourse({ ...formData }).subscribe((res) => {
      console.log(res); // log the response from the server
      // reset the form after successful submission
      this.courseForm.reset();
      // close the modal after successful submission
      this.modalService.dismissAll();
      // fetch the updated courses list
      this.getAllCourses();
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.courses = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error:', error);
        this.loading = false;
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
    return this.filterData(this.courses, this.searchTerm);
  }

  openAddCourseModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'addCourseModal',
      size: 'lg',
    });
  }
  onCourseModalClose() {
    this.isEditMode = false;
    this.modalService.dismissAll();
    this.courseForm.reset();
  }
  onCourseViewModalClose() {
    this.modalService.dismissAll();
  }

  onOpenViewCourseModal(modal: any, id: number) {
    this.courseService.getCourseById(id).subscribe((courseData: any) => {
      // set form values
      this.courseInfo = courseData;
      this.openAddCourseModal(modal);
    });
  }
  moveToLast = (array: string[], value: string) => {
    const index = array.indexOf(value.charAt(0).toUpperCase() + value.slice(1));
    if (index !== -1) {
      array.splice(index, 1);
      array.push(value.charAt(0).toUpperCase() + value.slice(1));
    }
  };
  get sortedFields() {
    const fields = [...this.fields];
    if (this.courseField) {
      console.log('courseField', this.courseField);
      this.moveToLast(fields, this.courseField);
    }
    return fields;
  }

  editCourse(id: number, courseModal: any) {
    this.courseService.getCourseById(id).subscribe(
      (courseData: any) => {
        // set form values
        this.courseId = courseData.id;
        this.courseField = courseData.field;
        this.courseForm.setValue({
          name: courseData.name,
          field: courseData.field,
          credit_hours: courseData.credit_hours,
          lab: courseData.lab,
        });
        // this.selectedCourses = courseData.Courses;
        console.log(this.courseForm.value);
        console.log(this.courseField);
        this.isEditMode = true;
        this.openAddCourseModal(courseModal);
      },
      (error) => {
        console.error(error);
      }
    );
    // const modalRef = this.modalService.open(AddEditCourseModalComponent);
    // modalRef.componentInstance.course = data;
    // modalRef.componentInstance.isEditMode = true;
  }
  onUpdate(id: number) {
    console.log('Update course', id);
    if (this.courseForm.invalid) {
      console.log('Invalid form', this.courseForm.invalid);
      return;
    }

    const formData = this.courseForm.value;
    this.courseService
      .updateCourse(id, { ...formData })
      .subscribe((res: any) => {
        console.log(res); // log the response from the server
        // reset the form after successful submission
        this.courseForm.reset();
        this.courseField = null;
        // close the modal after successful submission
        this.modalService.dismissAll();
        // fetch the updated courses list
        this.getAllCourses();
      });
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.getAllCourses();
      });
    }
  }
}
