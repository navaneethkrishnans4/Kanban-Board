import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { User } from '../model/User';
import { FilterService } from '../service/filter.service';
import { Task } from '../model/Task';

class FilterDropdown {
  showDropdown: boolean = false;
  selectedFilter: string | null = 'status'; // Default to status
  isIsNot: string | null = "is";
  selectedOptions: string[] = [];
}

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {
  statuses: Status[] = [];
  users: User[] = [];
  priorities: string[] = ["Urgent","High","Medium","Low"];
  tasks: Task[] = [];
  
  addedFilters: FilterDropdown[] = [];
  filters = [
    { value: 'status', viewValue: 'Status' },
    { value: 'email', viewValue: 'Email ID' },
    {value: 'priority', viewValue: 'Priority'}
  ];

  constructor(
    public dialogRef: MatDialogRef<FilterContainerComponent>,
    private taskService: TaskServiceService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    const savedFilters = localStorage.getItem('savedFilters');
    if (savedFilters) {
      this.addedFilters = JSON.parse(savedFilters);
    }
    this.getStatuses();
    this.getUsers();
    this.getTasks();
  }

  getStatuses(): void {
    this.taskService.getStatus().subscribe(
      statusArray => {
        this.statuses = statusArray;

      },
      error => console.error(error)
    );
  }



  getUsers(): void {
    this.taskService.getUsers().subscribe(
      users => this.users = users,
      error => console.error(error)
    );
  }

  getTasks():void {
    this.taskService.getTasks().subscribe(
    task=> this.tasks=task

  );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onFilterChange(filterValue: string, index: number): void {
    this.addedFilters[index].selectedFilter = filterValue;
    this.saveFilters();
  }

  onIsIsNotChange(value: string, index: number): void {
    this.addedFilters[index].isIsNot = value;
    this.saveFilters();
  }

  onOptionChange(option: string, index: number): void {
    const filter = this.addedFilters[index];
    const optionIndex = filter.selectedOptions.indexOf(option);
    if (optionIndex > -1) {
      filter.selectedOptions.splice(optionIndex, 1);
    } else {
      filter.selectedOptions.push(option);
    }
    this.saveFilters();
  }


  applyFilters(): void {
    let filtersToApply: any[] = [];
   
  
    const filterArray: { type: string, options: string[], isNot: boolean }[] = [];

  // Group filters by type and their respective options
  for (let filter of this.addedFilters) {
    if (filter.selectedFilter && filter.isIsNot) {
      const type = filter.selectedFilter;
      const options = filter.selectedOptions;
      const isNot = filter.isIsNot === 'isNot';

      filterArray.push({ type, options, isNot });
    }
  }
 
  
  filterArray.forEach(filter => {
    if (filter.type === 'status') {
      let filteredStatuses = this.statuses;

      if (filter.options.length > 0) {
        if (filter.isNot) {
          
          filteredStatuses = filteredStatuses.filter(status => !filter.options.includes(status.statusTitle));
        } else {
          
          filteredStatuses = filteredStatuses.filter(status => filter.options.includes(status.statusTitle));
        }
      }

      filtersToApply.push(filteredStatuses);
    } else if (filter.type === 'email') {
      let filteredUsers = this.users;

      if (filter.options.length > 0) {
        if (filter.isNot) {
          
          filteredUsers = filteredUsers.filter(user => !filter.options.includes(user.emailId));
        } else {
          
          filteredUsers = filteredUsers.filter(user => filter.options.includes(user.emailId));
        }
      }

      filtersToApply.push(filteredUsers);
    }
    else if(filter.type == 'priority'){
      let filteredTasks;
    
      filteredTasks = this.tasks.filter(task =>  filter.options.includes(task.priority.toLowerCase())
     
      )
      filtersToApply.push(filteredTasks);
    }

  });

    this.filterService.changeFilter({ selectedFilter: filterArray.map(filter => filter.type), filtersToApply });
  }
  

  clearFilter(): void {
    this.addedFilters.forEach(filter => {
      filter.selectedFilter = null;
      filter.isIsNot = null;
      filter.selectedOptions = [];
    });
  
    // Send a message to the FilterService to clear applied filters
    this.filterService.changeFilter({ selectedFilter: [], filtersToApply: [] });
    localStorage.removeItem('savedFilters');
  
  }

  addFilter(): void {
    this.addedFilters.push(new FilterDropdown()); // Add new filter dropdown instance
    this.saveFilters();
  }

  removeFilter(index: number): void {
    this.addedFilters.splice(index, 1);
    this.applyFilters();
  }

  logFilterValue(filter: any) {
    console.log(filter);
  }

  areFiltersValid(): boolean {
    // Check if at least one filter has been added and it has a selected filter type and options
    return this.addedFilters.length > 0 && this.addedFilters.every(filter =>
      filter.selectedFilter && filter.selectedOptions.length > 0
    );
  }

  private saveFilters(): void {
    localStorage.setItem('savedFilters', JSON.stringify(this.addedFilters));
  }

}
