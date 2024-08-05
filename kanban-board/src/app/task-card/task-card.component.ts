import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../model/Task';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { EditTaskContainerComponent } from '../edit-task-container/edit-task-container.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../model/User';
import { AssigneeDropdownDialogComponent } from '../assignee-dropdown-dialog/assignee-dropdown-dialog.component';
import { NotificationService } from '../service/notification.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatepickerDialogComponent } from '../datepicker-dialog/datepicker-dialog.component';
import { PriorityDropdownComponent } from '../priority-dropdown/priority-dropdown.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task = {
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority: '',
    dueDate: ''

  };


  statusTitle: string = "";
  statusColour: string = "";
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() taskDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Input() statuses: Status[] = [];
  @ViewChild('picker') datePicker!: ElementRef;
  users: User[] = [];
  showAssigneeDropdown: boolean = false;
  searchQuery: string = '';
  showCalendar: boolean = false;
  priorityColor: string = '';

  constructor(private dialog: MatDialog, private taskService: TaskServiceService, private notifictaionService: NotificationService,private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    const matchedStatus = this.statuses.find(status => status.statusCode === this.task.statusCode);
    if (matchedStatus) {
      this.statusTitle = matchedStatus.statusTitle;
      this.statusColour = matchedStatus.statusColour;
    }
    this.setPriorityColor()
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskContainerComponent, {
      width: '500px',
      data: { task: this.task } // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onEditTaskClick() {
    this.openEditDialog();
    this.editTask.emit(this.task);

  }

  toggleAssigneeDropdown(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';

    const dialogRef = this.dialog.open(AssigneeDropdownDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assign the selected emailId
        const previousEmailId = this.task.emailId;
        this.task.emailId = result.emailId;
        this.taskService.updatedTask(this.task.taskId, this.task).subscribe({
          next: response => {
            this.notifictaionService.sendEmail(this.task, this.taskService.usersCache.find(user => user.emailId === this.task.emailId),'reassign')
          },
          error: errot => {
            console.log("error Reassigning task!");
            this.task.emailId = previousEmailId;
          }
        })

      }
    });
  }



  
setPriorityColor(): void {
  switch (this.task.priority) {
    case 'Urgent':
      this.priorityColor = 'red';
      break;
    case 'High':
      this.priorityColor = 'darkorange';
      break;
    case 'Medium':
      this.priorityColor = 'blue';
      break;
    case 'Low':
      this.priorityColor = 'darkgrey';
      break;
    default:
      this.priorityColor = 'inherit'; // Default color
      break;
  }}

  onDeleteTaskClick() {
    if (window.confirm("Delete task?")) {

      this.taskService.deleteTask(this.task.taskId).subscribe({
        next: response => {

          console.log("Task deleted successfully:", response);
          this.taskDeleted.emit(this.task.taskId);

        },
        error: error => {

          console.error("Error deleteing task:", error);
        }
      });
    } else {
      // User clicked Cancel, do nothing
      console.log("Deletion cancelled.");
    }

  }

  openDatePicker(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';

    const dialogRef = this.dialog.open(DatepickerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((selectedDate) => {
      if (selectedDate) {
        const previousDate = this.task.dueDate;
        this.task.dueDate = selectedDate;
        this.taskService.updatedTask(this.task.taskId, this.task).subscribe({
          next: response => {

            console.log("Due Date updated successfully:", response);
          },
          error: error => {

            console.error("Error updating  dueDate:", error);
            this.task.dueDate = previousDate;
          }
        });
        // Add your logic here to handle the selected date
      }
    });
  }

  openPriorityDialog(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';
    const dialogRef = this.dialog.open(PriorityDropdownComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: string) => {

      if (result) {
        const previuosPriority = this.task.priority;
        this.task.priority = result;
        this.taskService.updatedTask(this.task.taskId, this.task).subscribe({
          next: response => {

            console.log("Due Date updated successfully:", response);
            this.setPriorityColor();

          },
          error: error => {

            console.error("Error updating  dueDate:", error);
            this.task.priority = previuosPriority;
          }
        })
      }
      // Do something with the selected priority
    });
  }


}
