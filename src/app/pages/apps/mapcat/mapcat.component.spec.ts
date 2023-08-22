import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MapcatComponent } from './mapcat.component'

describe('MapcatComponent', () => {
  let component: MapcatComponent
  let fixture: ComponentFixture<MapcatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapcatComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapcatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
