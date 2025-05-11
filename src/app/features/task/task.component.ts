import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [FormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  error: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.error = null;
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        this.error = err.message || 'No se pudieron cargar las tareas.';
      }
    });
  }

  onAddTask(): void {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Omit<Task, 'id'> = { title: this.newTaskTitle, completed: false };
    this.taskService.addTask(newTask).subscribe({
      next: (addedTask) => {
        this.tasks.push(addedTask); // Añadir a la lista local
        this.newTaskTitle = ''; // Limpiar input
        this.error = null;
      },
      error: (err) => {
        console.error('Error al añadir tarea:', err);
        this.error = err.message || 'No se pudo añadir la tarea.';
      }
    });
  }

  onToggleComplete(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        // Actualizar la tarea en la lista local
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.error = null;
      },
      error: (err) => {
        console.error('Error al actualizar tarea:', err);
        this.error = err.message || 'No se pudo actualizar la tarea.';
      }
    });
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id); // Eliminar de la lista local
        this.error = null;
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        this.error = err.message || 'No se pudo eliminar la tarea.';
      }
    });
  }
}
