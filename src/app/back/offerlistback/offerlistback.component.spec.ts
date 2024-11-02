import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferlistbackComponent } from './offerlistback.component';

describe('OfferlistbackComponent', () => {
  let component: OfferlistbackComponent;
  let fixture: ComponentFixture<OfferlistbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferlistbackComponent]
    });
    fixture = TestBed.createComponent(OfferlistbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
