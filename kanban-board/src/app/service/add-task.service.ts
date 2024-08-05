import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  private taskAddedSource = new BehaviorSubject<boolean>(false);
  taskAdded$ = this.taskAddedSource.asObservable();

  constructor() { }

  taskAdded() {
    this.taskAddedSource.next(true);
  }
}
