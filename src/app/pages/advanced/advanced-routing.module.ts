import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// layout
import { AdvancedTypographyComponent } from 'src/app/pages/advanced/typography/typography.component'
import { AdvancedMailTemplatesComponent } from 'src/app/pages/advanced/mail-templates/mail-templates.component'
import { AdvancedUtilitiesComponent } from 'src/app/pages/advanced/utilities/utilities.component'
import { AdvancedGridComponent } from 'src/app/pages/advanced/grid/grid.component'
import { AdvancedFormExamplesComponent } from 'src/app/pages/advanced/form-examples/form-examples.component'
import { AdvancedInvoiceComponent } from 'src/app/pages/advanced/invoice/invoice.component'
import { AdvancedPricingTablesComponent } from 'src/app/pages/advanced/pricing-tables/pricing-tables.component'
import { AdvancedColorsComponent } from 'src/app/pages/advanced/colors/colors.component'
import { StorewiseComponent } from 'src/app/pages/advanced/storewise/storewise/storewise.component'
import { ProductsComponent } from './Products/products/products.component'
import { EnquiryOrdersComponent } from './EnquiryOrders/enquiry-orders/enquiry-orders.component'
import { Biz1bookMainComponent } from './biz1book-main/biz1book-main/biz1book-main.component'
import { ProductGroupDataComponent } from './product-group-data/product-group-data.component'
import { PrdsalesrptComponent } from './prdsalesrpt/prdsalesrpt.component'
import { OrdsalesrptComponent } from './ordsalesrpt/ordsalesrpt.component'
import { GSTTestComponent } from './gst-test/gst-test.component'
import { CategorymapsComponent } from './categorymaps/categorymaps.component'
import { ProductComponent } from './product/product.component'
import { CategoryComponent } from './category/category.component'
import { MarketingInfoComponent } from './marketing-info/marketing-info.component'
import { ExpansionPlanComponent } from './expansion-plan/expansion-plan.component'
import { StaffTrainingComponent } from './staff-training/staff-training.component'
const routes: Routes = [
  {
    path: 'email-templates',
    component: AdvancedMailTemplatesComponent,
    data: { title: 'Advanced / Mail Templates' },
  },
  {
    path: 'typography',
    component: AdvancedTypographyComponent,
    data: { title: 'Advanced / Typography' },
  },
  {
    path: 'utilities',
    component: AdvancedUtilitiesComponent,
    data: { title: 'Advanced / Utilities' },
  },
  {
    path: 'grid',
    component: AdvancedGridComponent,
    data: { title: 'Advanced / Grid' },
  },
  {
    path: 'form-examples',
    component: AdvancedFormExamplesComponent,
    data: { title: 'Advanced / Form Examples' },
  },
  {
    path: 'invoice',
    component: AdvancedInvoiceComponent,
    data: { title: 'Advanced / Invoice' },
  },
  {
    path: 'pricing-tables',
    component: AdvancedPricingTablesComponent,
    data: { title: 'Advanced / Pricing Tables' },
  },
  {
    path: 'colors',
    component: AdvancedColorsComponent,
    data: { title: 'Advanced / Colors' },
  },
  {
    path: 'storewise',
    component: StorewiseComponent,
    data: { title: 'Advanced / storewise' },
  },
  {
    path: 'gstrpt',
    component: Biz1bookMainComponent,
    data: { title: 'GST Reports App' },
  },
  {
    path: 'product-group-data',
    component: ProductGroupDataComponent,
    data: { title: 'ProductGroup Data' },
  },
  {
    path: 'prdsalesrpt',
    component: PrdsalesrptComponent,
    data: { title: 'ProductWise Reports' },
  },
  {
    path: 'ordsalesrpt',
    component: OrdsalesrptComponent,
    data: { title: 'OrderWise Reports' },
  },
  {
    path: 'gsttest',
    component: GSTTestComponent,
    data: { title: 'GST Test' },
  },
  {
    path: 'cat-map',
    component: CategorymapsComponent,
    data: { title: 'GST Test' },
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { title: 'Product' },
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: { title: 'Category' },
  },
  {
    path: 'marketing',
    component: MarketingInfoComponent,
    data: { title: 'Marketing' },
  },
  {
    path: 'expplan',
    component: ExpansionPlanComponent,
    data: { title: 'Expansion Plan' },
  },
  {
    path: 'stafftraining',
    component: StaffTrainingComponent,
    data: { title: 'Staff Training' },
  },
  // {
  //   path: 'Products',
  //   component: ProductsComponent,
  //   data: { title: 'Advanced / Products' },
  // },
  // {
  //   path: 'EnquiryOrders',
  //   component: EnquiryOrdersComponent,
  //   data: { title: 'Advanced / EnquiryOrders' },
  // },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRouterModule {}
