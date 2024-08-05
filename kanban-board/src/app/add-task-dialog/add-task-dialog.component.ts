import { Component, EventEmitter, InjectionToken, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../model/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { User } from '../model/User';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddTaskService } from '../service/add-task.service';
import { TaskValidationService } from '../service/task-validation.service';
import { DatepickerDialogComponent } from '../datepicker-dialog/datepicker-dialog.component';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent implements OnInit {
  task: Task = {
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority: '',
    dueDate: ''
  }

  users: User[] = [];
  statuses: Status[] = [];
  filteredUsers!: Observable<User[]>;
  filteredStatuses!: Observable<Status[]>;
  selectedAssignee = '';
  selectedStatus = '';
  selectedDueDate = '';
  tasks: Task[] = [];
  taskForm!: FormGroup;
  priorities = [
    { value: 'Urgent', viewValue: 'Urgent' },
    { value: 'High', viewValue: 'High' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Low', viewValue: 'Low' }
  ];
  constructor(private fb: FormBuilder,
    private taskService: TaskServiceService,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private addTaskService: AddTaskService,
    private taskValidationService: TaskValidationService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      statusCode: ['', Validators.required],
      emailId: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: [''],
      timeSpent: [0]
    });


    this.taskService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.taskForm.get('emailId')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value))
      );
    });

    this.taskService.getStatus().subscribe(statuses => {
      this.statuses = statuses;
      this.filteredStatuses = this.taskForm.get('statusCode')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterStatuses(value))
      );
      // const statusTitle = this.getStatusTitlefromStatusCode(this.task.statusCode);

    });

    this.taskService.getTasks().subscribe(task =>
      this.tasks = task
    )


  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.firstName.toLowerCase().includes(filterValue) || user.lastName.toLowerCase().includes(filterValue));
  }

  private _filterStatuses(value: string): Status[] {
    const filterValue = value.toLowerCase();
    return this.statuses.filter(status => status.statusTitle.toLowerCase().includes(filterValue));
  }

  private getStatusTitlefromStatusCode(value: string) {
    const status = this.statuses.find(element => element.statusCode == value);
    return status?.statusTitle;

  }

  openDatePickerDialog(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY - 200 + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';

    const dialogRef = this.dialog.open(DatepickerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((selectedDate: string | undefined) => {
      if (selectedDate) {
        // Update the value of dueDate field in the form
        this.taskForm.get('dueDate')!.setValue(selectedDate);
        this.selectedDueDate = selectedDate;
      }
    });
  }
  
  private getStatusCodefromStatusTitle(value: string) {
    const status = this.statuses.find(element => element.statusTitle == value);

    return status!.statusCode;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log(formData);
      const newTask: Task = {
        taskId: 'T' + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000, // Assign a unique taskId
        taskTitle: formData.taskTitle,
        taskDescription: formData.taskDescription,
        statusCode: this.getStatusCodefromStatusTitle(formData.statusCode),
        emailId: formData.emailId,
        timeSpent: formData.timeSpent,
        priority: formData.priority,
        dueDate: this.selectedDueDate
      };

      if (this.taskValidationService.hasTooManyTasksInStatus(this.tasks, newTask.emailId, newTask.statusCode, 4)) {
        alert("You already have 4 tasks In Progress ");

      }
      else {
        this.taskService.postTask(newTask).subscribe({
          next: response => {

            console.log("Task Created successfully:", response);
            this.addTaskService.taskAdded();
            this.dialogRef.close();

          },
          error: error => {

            console.error("Error Creating task:", error);
            alert("Error creating Task! Database Connection failed!");
          }
        });
      }


    } else {
      alert("Error creating Task!");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
