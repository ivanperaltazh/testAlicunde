import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../models/task.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // URL de tu json-server para tasks

  // Opciones HTTP para POST, PUT
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET: Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        tap(tasks => console.log('Tareas obtenidas:', tasks)),
        catchError(this.handleError)
      );
  }

  // GET: Obtener una tarea por ID
  getTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(task => console.log(`Tarea obtenida id=${id}:`, task)),
        catchError(this.handleError)
      );
  }

  // POST: Añadir una nueva tarea
  // json-server asignará un 'id' automáticamente si no lo envías
  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions)
      .pipe(
        tap((newTask: Task) => console.log(`Tarea añadida con id=${newTask.id}:`, newTask)),
        catchError(this.handleError)
      );
  }

  // PUT: Actualizar una tarea existente
  updateTask(task: Task): Observable<any> { // json-server devuelve el objeto actualizado
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, task, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Tarea actualizada id=${task.id}`)),
        catchError(this.handleError)
      );
  }

  // DELETE: Eliminar una tarea
  deleteTask(id: number): Observable<Task> { // json-server devuelve {} o el objeto eliminado
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Tarea eliminada id=${id}`)),
        catchError(this.handleError)
      );
  }

  // Manejador de errores simple
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    // Podrías transformar el error para el consumidor del servicio
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtalo de nuevo más tarde.'));
  }
}
