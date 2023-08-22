import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryOrdersComponent } from './enquiry-orders.component';

describe('EnquiryOrdersComponent', () => {
  let component: EnquiryOrdersComponent;
  let fixture: ComponentFixture<EnquiryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
