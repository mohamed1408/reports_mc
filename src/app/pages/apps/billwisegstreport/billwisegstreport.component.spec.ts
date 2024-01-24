import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BillwisegstreportComponent } from './billwisegstreport.component'

describe('BillwisegstreportComponent', () => {
  let component: BillwisegstreportComponent
  let fixture: ComponentFixture<BillwisegstreportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillwisegstreportComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BillwisegstreportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
