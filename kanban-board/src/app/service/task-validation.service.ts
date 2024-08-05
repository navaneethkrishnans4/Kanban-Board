import { Injectable } from '@angular/core';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskValidationService {

  constructor() { }

  hasTooManyTasksInStatus(tasks: Task[], emailId: string, statusCode: string, threshold: number): boolean {
    if(statusCode === 'status002')
      {
    const tasksWithStatus = tasks.filter(task => task.emailId === emailId && task.statusCode === statusCode);
    return tasksWithStatus.length >= threshold;
      }
      else{
        return false;
      }
  }
}
