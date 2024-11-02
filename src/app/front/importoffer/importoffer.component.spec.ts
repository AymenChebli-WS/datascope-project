import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportofferComponent } from './importoffer.component';

describe('ImportofferComponent', () => {
  let component: ImportofferComponent;
  let fixture: ComponentFixture<ImportofferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportofferComponent]
    });
    fixture = TestBed.createComponent(ImportofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
