import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

import { Task } from '../models/task.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  onTasksChanged: BehaviorSubject<any>;
  onTaskSelect: BehaviorSubject<any>;
  tasks: Task[];

  constructor(
    private http: HttpClient,

  ) {
    this.onTasksChanged = new BehaviorSubject([]);
    this.onTaskSelect = new BehaviorSubject(Task);

  }

  getTask(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${base_url}/tasks`)
        .subscribe({
          next: (resp: any) => {
            this.tasks =  resp.tasks;
            this.onTasksChanged.next(this.tasks);
          },
          error: (err) => {
            this.onTasksChanged.next([])
          },
          complete: () => resolve(this.tasks)
        })
    });
  }
    
  addTask( task: { title: string, description: string, status: string } ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post( `${base_url}/tasks`, task)
        .subscribe({
          next: (resp: any) => {
            this.getTask();
            resolve(resp);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => console.log()
        })
      });
  }
  
  updateTask( task: Task  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put( `${base_url}/tasks/${task.id}`, task )
      .subscribe({
        next: (resp: any) => {
          this.getTask();
          resolve(resp);
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => console.log()
      })
    });
  }

  deleteTask( id: string ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${base_url}/tasks/${id}`)
      .subscribe({
        next: (resp: any) => {
          this.getTask();
          resolve(resp);
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => console.log()
      })
    });
  }

  changeStatusTask( id: string, status: string ): Promise<any> {
    console.log('status', status);
    console.log('id', id);
    
    return new Promise((resolve, reject) => {
      this.http.patch( `${base_url}/tasks/${id}`, { status } )
      .subscribe({
        next: (resp: any) => {
          this.getTask();
          resolve(resp);
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => console.log()
      })
    });
  }

}
