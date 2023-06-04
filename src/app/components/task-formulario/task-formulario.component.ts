import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-formulario',
  templateUrl: './task-formulario.component.html',
  styles: [
  ]
})
export class TaskFormularioComponent implements OnInit, OnDestroy {
  selectTask: Task;
  onSelectTask: Subscription;
  formuTask: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    ) { }

  ngOnInit(): void {
    this.formuTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required],
    });
    this.setTaskDataChangeListeners();
  }

  setTaskDataChangeListeners() {
    this.onSelectTask = this.taskService.onTaskSelect
      .subscribe((task) => {
        if (task) {
          this.formuTask.controls['title'].setValue(task.title);
          this.formuTask.controls['description'].setValue(task.description);
          this.formuTask.controls['status'].setValue(task.status);
          this.selectTask = task;
        }
      })
  }

  createTaskForm(): void {
    this.formuTask = this.fb.group({
      title: [this.selectTask.title || '', Validators.required],
      description: [this.selectTask.description || '', Validators.required],
      status: [this.selectTask.status || '', Validators.required],
    });
  }

  enviarFormulario(): void {
    if(this.formuTask.valid) {
      this.taskService.addTask(this.formuTask.value);
      this.limpiarFormulario()
    }
  }

  limpiarFormulario(): void {
    this.formuTask.reset();
    this.selectTask = this.formuTask.value;
    this.taskService.onTaskSelect.next(null);
  }

  ngOnDestroy(): void {
    this.onSelectTask.unsubscribe();
  }

}
