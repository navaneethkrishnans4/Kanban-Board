import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardControlHeaderComponent } from './board-control-header.component';

describe('BoardControlHeaderComponent', () => {
  let component: BoardControlHeaderComponent;
  let fixture: ComponentFixture<BoardControlHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardControlHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardControlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
