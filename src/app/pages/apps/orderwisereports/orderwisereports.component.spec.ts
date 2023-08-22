import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderwisereportsComponent } from './orderwisereports.component';

describe('OrderwisereportsComponent', () => {
  let component: OrderwisereportsComponent;
  let fixture: ComponentFixture<OrderwisereportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderwisereportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderwisereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
