import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Biz1bookMainComponent } from './biz1book-main.component'

describe('Biz1bookMainComponent', () => {
  let component: Biz1bookMainComponent
  let fixture: ComponentFixture<Biz1bookMainComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Biz1bookMainComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(Biz1bookMainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
