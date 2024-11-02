import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsbackComponent } from './statsback.component';

describe('StatsbackComponent', () => {
  let component: StatsbackComponent;
  let fixture: ComponentFixture<StatsbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsbackComponent]
    });
    fixture = TestBed.createComponent(StatsbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
