import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../app/components/home/home.component";
import { StudentComponent } from "../app/components/student/student.component";
import { CourseComponent } from "../app/components/course/course.component";
import { TeacherComponent } from "../app/components/teacher/teacher.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "students", component: StudentComponent },
  { path: "courses", component: CourseComponent },
  { path: "teachers", component: TeacherComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
