import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NavbarComponent } from './navbar/navbar.component';
import { UserTaskContainerComponent } from './user-task-container/user-task-container.component';
import { BoardContainerComponent } from './board-container/board-container.component';
import { BoardControlHeaderComponent } from './board-control-header/board-control-header.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { EditTaskContainerComponent } from './edit-task-container/edit-task-container.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AssigneeDropdownDialogComponent } from './assignee-dropdown-dialog/assignee-dropdown-dialog.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { QuickAddTaskCardComponent } from './quick-add-task-card/quick-add-task-card.component';
import { DatepickerDialogComponent } from './datepicker-dialog/datepicker-dialog.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PriorityDropdownComponent } from './priority-dropdown/priority-dropdown.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TaskCardComponent,
    UserTaskContainerComponent,
    BoardContainerComponent,
    BoardControlHeaderComponent,
    FilterContainerComponent,
    AddTaskDialogComponent,
    EditTaskContainerComponent,
    AssigneeDropdownDialogComponent,
    LoginContainerComponent,
    QuickAddTaskCardComponent,
    DatepickerDialogComponent,
    RegisterUserComponent,
    PriorityDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    DragDropModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatAutocompleteModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
