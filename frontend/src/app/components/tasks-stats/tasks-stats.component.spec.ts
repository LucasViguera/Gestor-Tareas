import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStatsComponent } from './tasks-stats.component';

describe('TasksStatsComponent', () => {
  let component: TasksStatsComponent;
  let fixture: ComponentFixture<TasksStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
