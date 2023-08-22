import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GSTTestComponent } from './gst-test.component'

describe('GSTTestComponent', () => {
  let component: GSTTestComponent
  let fixture: ComponentFixture<GSTTestComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GSTTestComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTTestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
