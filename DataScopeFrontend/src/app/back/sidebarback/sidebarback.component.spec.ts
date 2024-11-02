import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarbackComponent } from './sidebarback.component';

describe('SidebarbackComponent', () => {
  let component: SidebarbackComponent;
  let fixture: ComponentFixture<SidebarbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarbackComponent]
    });
    fixture = TestBed.createComponent(SidebarbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
