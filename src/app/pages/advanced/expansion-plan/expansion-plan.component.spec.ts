import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExpansionPlanComponent } from './expansion-plan.component'

describe('ExpansionPlanComponent', () => {
  let component: ExpansionPlanComponent
  let fixture: ComponentFixture<ExpansionPlanComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPlanComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
