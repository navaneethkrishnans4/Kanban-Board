import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityDropdownComponent } from './priority-dropdown.component';

describe('PriorityDropdownComponent', () => {
  let component: PriorityDropdownComponent;
  let fixture: ComponentFixture<PriorityDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriorityDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
