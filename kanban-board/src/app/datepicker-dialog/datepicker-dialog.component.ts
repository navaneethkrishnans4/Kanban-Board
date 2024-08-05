import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datepicker-dialog',
  templateUrl: './datepicker-dialog.component.html',
  styleUrl: './datepicker-dialog.component.css'
})
export class DatepickerDialogComponent {
  selected!: Date;
  minDate: Date;
  constructor(private dialogRef: MatDialogRef<DatepickerDialogComponent>) {
    this.minDate = new Date();
  }

  close(): void {
    
    this.dialogRef.close(this.formatDate(this.selected).toString());
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}
