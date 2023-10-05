export interface Course {
  id: number;
  name: string;
  field: 'Science' | 'History' | 'Arts';
  credit_hours: number;
  lab: boolean;
}
