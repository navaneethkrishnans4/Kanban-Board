import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddTaskCardComponent } from './quick-add-task-card.component';

describe('QuickAddTaskCardComponent', () => {
  let component: QuickAddTaskCardComponent;
  let fixture: ComponentFixture<QuickAddTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickAddTaskCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickAddTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
