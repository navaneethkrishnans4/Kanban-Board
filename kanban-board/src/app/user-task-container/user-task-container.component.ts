
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskServiceService } from '../service/task-service.service';
import { Task } from '../model/Task';
import { User } from '../model/User';
import { Status } from '../model/Status';
import { FilterService } from '../service/filter.service';
import { EditTaskContainerComponent } from '../edit-task-container/edit-task-container.component';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';
import { AddTaskService } from '../service/add-task.service';
import { TaskValidationService } from '../service/task-validation.service';
import { PriorityDropdownComponent } from '../priority-dropdown/priority-dropdown.component';

@Component({
  selector: 'app-user-task-container',
  templateUrl: './user-task-container.component.html',
  styleUrls: ['./user-task-container.component.css']
})
export class UserTaskContainerComponent implements OnInit {

  @Input() isFolderOpen: boolean = true;
  @Input() fitlerData: any;

  users: User[] = [];
  tasks: Task[] = [];
  statuses: Status[] = [];
  filteredTasks: Task[] = [];
  orginialUsers: User[] = [];
  originalTasks: Task[] = [];
  originalStatuses: Status[] = [];
  tasksLoaded: boolean = false;
  selectedColumnIndex: number = -1;
  selectedRowIndex: number = -1;
  quickAddStatusCode: string = '';
  quickAddEmailId: string= '';

  constructor(private cdr: ChangeDetectorRef,
    private taskService: TaskServiceService,
    private filterService: FilterService,
    private authService: AuthService,
    private notifictaionService: NotificationService,
    private addTaskService: AddTaskService,
    private taskValidationService:TaskValidationService) { }

  ngOnInit(): void {
    console.log("auth token:", this.authService.bearerToken);

    this.taskService.getUsers().subscribe(users => {
      this.users = users;
      this.orginialUsers = users;


    });

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.tasksLoaded = true;
      this.originalTasks = tasks;


    });

    this.taskService.getStatus().subscribe(statusArray => {
      this.statuses = statusArray;
      this.originalStatuses = statusArray;
    });

    this.addTaskService.taskAdded$.subscribe(task => {
      if (task) {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
          console.log("after adding:" + this.tasks)
          this.tasksLoaded = true;
          this.originalTasks = tasks;


        });

      }


    });


    this.filterService.currentFilter.subscribe(filter => {

      console.log("filter recieved:", filter.filtersToApply)

      this.statuses = this.originalStatuses;
      this.tasks = this.originalTasks;
      this.users = this.orginialUsers;

      if (filter.selectedFilter.length > 0) {
        for (var i = 0; i < filter.selectedFilter.length; i++) {
          if (filter.selectedFilter[i] === "status") {
            this.statuses = filter.filtersToApply[i];

          }
          else if (filter.selectedFilter[i] === "email") {
            this.users = filter.filtersToApply[i];
          }
          else if (filter.selectedFilter[i] === "title") { // for searching
            this.tasks = this.tasks.filter(task =>
              task.taskTitle.toLowerCase().includes(filter.filtersToApply.toLowerCase())
            );
          }
          else if(filter.selectedFilter[i] === "priority") {
            this.tasks = filter.filtersToApply[i];
          }


        }
      }

    });
  }



  getUserTasksForUser(email: string): any[] {

    let filteredTasks = this.tasks.filter(task => task.emailId === email);

    return filteredTasks;
  }

  getStatusTasks(userEmail: string, status: string): Task[] {
    return this.tasks.filter(task => task.emailId === userEmail && task.statusCode === status);
  }

  // getTotalTimeForUser(email: string): number {
  //   return this.tasks.filter(task => task.emailId === email).reduce((total, task) => total + task.timeSpent, 0);
  // }

  getTotalTimeForUser(email: string, statusCodes: string[]): number {
    // Filter tasks based on email and specified status codes
    const filteredTasks = this.tasks.filter(task => task.emailId === email && statusCodes.includes(task.statusCode));
    // Calculate total time spent for filtered tasks
    return filteredTasks.reduce((total, task) => total + task.timeSpent, 0);
  }
  

  getStatusTasksCount(status: string): number {
    return this.tasks.filter(task => task.statusCode === status).length;
  }


  onTaskDrop(event: DragEvent, newStatus: string, newEmail: string) {
    if (event.dataTransfer) {
      event.preventDefault();
      const taskString = event.dataTransfer.getData('task');
      const task: Task = JSON.parse(taskString);
      task.emailId = newEmail;
      task.statusCode = newStatus;
  
      // Check if the new status is "status003" and if the email already has 4 or more tasks with "status003"
      if (this.taskValidationService.hasTooManyTasksInStatus(this.tasks, newEmail, newStatus, 4)) {
        // If there are already 4 or more tasks with "status002", show an alert
        alert("You already have 4 tasks In Progress ");
      } else {
        // If the condition is not met, proceed with updating the task
        this.originalTasks = this.tasks = this.tasks.map(t => {
          if (t.taskId === task.taskId) {
            const updatedTask = { ...t, statusCode: newStatus, emailId: newEmail };
            this.taskService.updatedTask(task.taskId, updatedTask).subscribe({
              next: response => {
                // Handle the response if needed
                this.notifictaionService.sendEmail(updatedTask, this.taskService.usersCache.find(user => user.emailId === updatedTask.emailId),'reassign')
                console.log("Task updated successfully:", response);
                // Only update the task in the array if the request is successful
                this.tasks = this.tasks.map(t => (t.taskId === updatedTask.taskId ? updatedTask : t));
                this.cdr.detectChanges();
              },
              error: error => {
                // Handle any errors
                console.error("Error updating task:", error);
                // Optionally, rollback changes if needed
                // You can add your logic here to handle the error accordingly
              }
            });
          }
          return t;
        });
      }
    }
  }
  
  

  onTaskDragStart(event: DragEvent, task: Task) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('task', JSON.stringify(task));
    }
  }

  onTaskDragOver(event: DragEvent) {
    event.preventDefault();
  }

  openQuickAddTask(statusCode: string, emailId: string, j: number, i: number) {

    this.quickAddStatusCode=statusCode;
    this.quickAddEmailId=emailId;
    this.selectedColumnIndex = j;
    this.selectedRowIndex = i;
  }

  onTaskAdded(title: string, priority: string) {
    // Handle the task addition here
    console.log('New task added:', title);
    // For example, you can add the task to the list of tasks
    const newTask: Task = {
      taskId: 'T'+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000, // Assign a unique taskId
      taskTitle: title,
      taskDescription: '',
      statusCode: this.quickAddStatusCode, // Assign the appropriate status code
      emailId: this.quickAddEmailId, // Assign the appropriate emailId
      timeSpent: 0,
      priority: priority,
      dueDate:""
    };
    // Add the new task to the tasks array
    
    this.taskService.postTask(newTask).subscribe({next: response => {
       
      console.log("Task Created successfully:", response);
      this.tasks.push(newTask);

    },
    error: error => {
      
      console.error("Error Creating task:", error);
      alert("Error creating Task!");
    }
  });

    // Hide the quick-add task card
    this.selectedColumnIndex = -1;
  }

  onQuickAddCardClosed() { this.selectedColumnIndex = -1; }

  onTaskDeleted(taskId: string) {
    // Filter out the deleted task from the tasks array
    this.tasks = this.tasks.filter(task => task.taskId !== taskId);
    this.originalTasks = this.tasks;
  }

  
}

