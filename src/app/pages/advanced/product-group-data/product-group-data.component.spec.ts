import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductGroupDataComponent } from './product-group-data.component'

describe('ProductGroupDataComponent', () => {
  let component: ProductGroupDataComponent
  let fixture: ComponentFixture<ProductGroupDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductGroupDataComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupDataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
