import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styles: [
  ]
})
export class TaskTableComponent implements OnInit, OnDestroy {
  public tareas: Task[] = [];
  onTasksChanged: Subscription;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.setTaskDataChangeListeners();
    this.taskService.getTask();
  }

  setTaskDataChangeListeners() {
    this.onTasksChanged = this.taskService.onTasksChanged
      .subscribe((tasks) => {
        this.tareas = tasks;
      })
  }

  editarTarea(tarea: Task) {
    this.taskService.onTaskSelect.next(tarea);

  }

  eliminarTarea(id: any) {
    this.taskService.deleteTask(id);
  }

  cambiarEstado(id: any, status: string) {
    this.taskService.changeStatusTask(id, status === 'pending'? 'complete' : 'pending' )
  }

  ngOnDestroy(): void {
    this.onTasksChanged.unsubscribe();
  }

}
