import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PrdsalesrptComponent } from './prdsalesrpt.component'

describe('PrdsalesrptComponent', () => {
  let component: PrdsalesrptComponent
  let fixture: ComponentFixture<PrdsalesrptComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrdsalesrptComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdsalesrptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
