import { Course } from './course.interface';
export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  cell_number: string;
  address: string;
  courses: Course[];
}
