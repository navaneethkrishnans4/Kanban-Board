import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-priority-dropdown',
  templateUrl: './priority-dropdown.component.html',
  styleUrl: './priority-dropdown.component.css'
})
export class PriorityDropdownComponent {
  priorities: string[] = ['Urgent', 'High', 'Medium', 'Low'];
  selectedPriority: string = '';

  constructor(
    private dialogRef: MatDialogRef<PriorityDropdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  selectPriority(priority: string): void {
    this.selectedPriority = priority;
    this.dialogRef.close(this.selectedPriority);
  }
}
