import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Task } from '../models/task.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient ) { }

  getTask() {

  }

  getTaskById( id: string ) {

  }

  addTask( task: { title: string, description: string, status: string } ) {

  }
  
  updateTask( task: Task  ) {

  }

  deleteTask( _id: string ) {

  }

  updateStatusTask( _id: string ) {

  }

}
