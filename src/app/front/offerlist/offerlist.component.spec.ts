import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferlistComponent } from './offerlist.component';

describe('OfferlistComponent', () => {
  let component: OfferlistComponent;
  let fixture: ComponentFixture<OfferlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferlistComponent]
    });
    fixture = TestBed.createComponent(OfferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
