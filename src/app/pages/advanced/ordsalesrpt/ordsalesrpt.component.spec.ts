import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrdsalesrptComponent } from './ordsalesrpt.component'

describe('OrdsalesrptComponent', () => {
  let component: OrdsalesrptComponent
  let fixture: ComponentFixture<OrdsalesrptComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdsalesrptComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdsalesrptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
