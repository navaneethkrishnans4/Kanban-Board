import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrl: './board-container.component.css'
})
export class BoardContainerComponent {
  isFolderOpen: boolean = false;
  fitlerData : any = "NAvneeth";
  searchText : any = '';
 
 @Output() toggleExpansion: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onToggleExpansion(): void {
    console.log("onToggle Expansion : BoardContainer Called :",this.isFolderOpen);
    this.isFolderOpen = !this.isFolderOpen;
    this.toggleExpansion.emit();

  }
  onSearchTextChanged(searchText: string): void {
    console.log("Search Text Changed in Parent Component:", searchText);
    this.searchText=searchText;
    
    // Handle search text change logic
  }
 
}
