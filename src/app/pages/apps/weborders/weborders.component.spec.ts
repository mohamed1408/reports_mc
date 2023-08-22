import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WebordersComponent } from './weborders.component'

describe('WebordersComponent', () => {
  let component: WebordersComponent
  let fixture: ComponentFixture<WebordersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebordersComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WebordersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
