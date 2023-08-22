import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategorymapsComponent } from './categorymaps.component'

describe('CategorymapsComponent', () => {
  let component: CategorymapsComponent
  let fixture: ComponentFixture<CategorymapsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorymapsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorymapsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
