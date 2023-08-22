import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SaleexportComponent } from './saleexport.component'

describe('SaleexportComponent', () => {
  let component: SaleexportComponent
  let fixture: ComponentFixture<SaleexportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleexportComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleexportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
