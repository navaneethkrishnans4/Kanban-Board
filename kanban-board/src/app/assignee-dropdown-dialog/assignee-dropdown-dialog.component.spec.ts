import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeDropdownDialogComponent } from './assignee-dropdown-dialog.component';

describe('AssigneeDropdownDialogComponent', () => {
  let component: AssigneeDropdownDialogComponent;
  let fixture: ComponentFixture<AssigneeDropdownDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssigneeDropdownDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssigneeDropdownDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
