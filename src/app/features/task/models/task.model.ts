export interface Task {
  id: number; // json-server añade 'id' si no lo provees en un POST
  title: string;
  completed: boolean;
}
