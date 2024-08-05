import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { User } from '../model/User';
import { Task } from '../model/Task';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddTaskService } from '../service/add-task.service';
import { TaskValidationService } from '../service/task-validation.service';
import { DatepickerDialogComponent } from '../datepicker-dialog/datepicker-dialog.component';

@Component({
  selector: 'app-edit-task-container',
  templateUrl: './edit-task-container.component.html',
  styleUrls: ['./edit-task-container.component.css']
})
export class EditTaskContainerComponent implements OnInit {
  taskForm!: FormGroup;
  task: Task = {
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority: '',
    dueDate: ''
  };
  users: User[] = [];
  statuses: Status[] = [];
  filteredUsers!: Observable<User[]>;
  filteredStatuses!: Observable<Status[]>;
  selectedAssignee = '';
  selectedStatus = '';
  selectedDueDate = '';
  tasks: Task[] = [];
  priorities = [
    { value: 'Urgent', viewValue: 'Urgent' },
    { value: 'High', viewValue: 'High' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Low', viewValue: 'Low' }
  ];
  constructor(private fb: FormBuilder,
    private taskService: TaskServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTaskContainerComponent>,
    private addTaskService: AddTaskService,
    private taskValidationService: TaskValidationService,
    private dialog: MatDialog) {
    this.task = data.task;
  }

  ngOnInit(): void {

    console.log(this.task);


    this.taskService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.taskForm.get('emailId')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value))
      );
    });

    this.taskService.getStatus().subscribe(statuses => {
      this.statuses = statuses;
      console.log(statuses);
      this.filteredStatuses = this.taskForm.get('statusCode')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterStatuses(value))
      );
      const statusTitle = this.getStatusTitlefromStatusCode(this.task.statusCode);
      if (statusTitle) {
        this.taskForm.get('statusCode')!.setValue(statusTitle);
      }
    });

    this.taskForm = this.fb.group({
      taskTitle: [this.task.taskTitle, Validators.required],
      taskDescription: [this.task.taskDescription],
      statusCode: ['', Validators.required],
      emailId: [this.task.emailId, Validators.required],
      priority: [this.task.priority, Validators.required],
      timeSpent: [this.task.timeSpent],
      dueDate: [this.task.dueDate],
    });

    this.selectedDueDate = this.task.dueDate;

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

  private getStatusCodefromStatusTitle(value: string) {
    const status = this.statuses.find(element => element.statusTitle == value);

    return status!.statusCode;
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
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const newTask: Task = {
        taskId: this.task.taskId,
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
        this.taskService.updatedTask(this.task.taskId, newTask).subscribe({
          next: response => {

            console.log("Task Edited successfully:", response);
            this.addTaskService.taskAdded();
            this.dialogRef.close();

          },
          error: error => {

            console.error("Error Editing task:", error);
            alert("Error creating Task!");
          }
        });
      }
    } else {
      // Form is invalid, handle accordingly
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
