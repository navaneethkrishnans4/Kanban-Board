import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskContainerComponent } from './user-task-container.component';

describe('UserTaskContainerComponent', () => {
  let component: UserTaskContainerComponent;
  let fixture: ComponentFixture<UserTaskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTaskContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
