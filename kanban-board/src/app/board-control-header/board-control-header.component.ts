import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { FilterService } from '../service/filter.service';
import { AssigneeDropdownDialogComponent } from '../assignee-dropdown-dialog/assignee-dropdown-dialog.component';
import { TaskServiceService } from '../service/task-service.service';
import { User } from '../model/User';

@Component({
  selector: 'app-board-control-header',
  templateUrl: './board-control-header.component.html',
  styleUrl: './board-control-header.component.css'
})
export class BoardControlHeaderComponent {
  @Output() toggleExpansion: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('filterButton') filterButton!: ElementRef;
  searchText: string = '';
  filterApplied:boolean = false;
  filterActive: boolean = false; // Add this line
  assigneeActive: boolean = false; // Add this line
  
  constructor(public dialog: MatDialog,private filterService:FilterService,private taskService:TaskServiceService) { }

  onToggleExpansion(): void {
    console.log("onToggle Expansion : BoardContainer Header Called : ");
    this.toggleExpansion.emit();
  }

  openFilterDialog(event: MouseEvent): void {
    this.toggleFilter();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };

    const dialogRef = this.dialog.open(FilterContainerComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddTaskDialog():void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
  }

  filterTasks(event:any): void {
    const inputValue = event?.target?.value;
    if (inputValue !== undefined && inputValue !== null){
      this.filterService.changeFilter({selectedFilter:["title"],filtersToApply:inputValue})
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.filterService.changeFilter({selectedFilter:["title"],filtersToApply:this.searchText})
  }

  toggleAssigneeDropdown(event: MouseEvent): void {

    this.toggleAssignee();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';

    const dialogRef = this.dialog.open(AssigneeDropdownDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assign the selected emailId
        const filterUser:any[]=[];
        const inputValue:any [] =[]
        inputValue.push(result);
        filterUser.push(inputValue);
        this.filterService.changeFilter({selectedFilter:["email"],filtersToApply:filterUser})
        this.filterApplied=true;
        this.isFilterApplied();
      }
    });
  }

  isFilterApplied() {
    // Return true if filter is applied, false otherwise
    return this.filterApplied;
  }
  
  clearFilter() {
    // Code to clear the filter
    this.searchText = ''; // Clear search text
    this.filterService.changeFilter({ selectedFilter: [], filtersToApply: [] });
    this.filterActive = false;
    this.assigneeActive = false; 
  }

  toggleFilter() { // Add this function
    this.filterActive = !this.filterActive;
  }

  toggleAssignee() { // Add this function
    this.assigneeActive = !this.assigneeActive;
  }
}
