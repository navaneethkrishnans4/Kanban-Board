import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskContainerComponent } from './edit-task-container.component';

describe('EditTaskContainerComponent', () => {
  let component: EditTaskContainerComponent;
  let fixture: ComponentFixture<EditTaskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTaskContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
