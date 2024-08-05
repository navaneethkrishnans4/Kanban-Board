import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quick-add-task-card',
  templateUrl: './quick-add-task-card.component.html',
  styleUrl: './quick-add-task-card.component.css'
})
export class QuickAddTaskCardComponent {
  newTaskTitle: string = '';
  newTaskPriority: string = '';

  @Output() taskAdded: EventEmitter<{ title: string, priority: string }> = new EventEmitter();
  @Output() cardClosed: EventEmitter<void> = new EventEmitter<void>();
  addTask() {
    // Emit the new task details
    this.taskAdded.emit({ title: this.newTaskTitle, priority: this.newTaskPriority });
    // Reset the input fields
    this.newTaskTitle = '';
    this.newTaskPriority = '';
  }
  closeCard(): void {
    // Emit an event to notify the parent component that the card is being closed
    this.cardClosed.emit();
  }
}
