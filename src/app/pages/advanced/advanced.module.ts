import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { AdvancedRouterModule } from './advanced-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { AntdUIKitExamplesModule } from '../ui-kits/antd/examples/antd-expamples.module'
import { BootstrapUIKitExamplesModule } from '../ui-kits/bootstrap/examples/bootstrap-expamples.module'

// layout
import { AdvancedTypographyComponent } from 'src/app/pages/advanced/typography/typography.component'
import { AdvancedMailTemplatesComponent } from 'src/app/pages/advanced/mail-templates/mail-templates.component'
import { AdvancedUtilitiesComponent } from 'src/app/pages/advanced/utilities/utilities.component'
import { AdvancedGridComponent } from 'src/app/pages/advanced/grid/grid.component'
import { AdvancedFormExamplesComponent } from 'src/app/pages/advanced/form-examples/form-examples.component'
import { AdvancedInvoiceComponent } from 'src/app/pages/advanced/invoice/invoice.component'
import { AdvancedPricingTablesComponent } from 'src/app/pages/advanced/pricing-tables/pricing-tables.component'
import { AdvancedColorsComponent } from 'src/app/pages/advanced/colors/colors.component'
import { StorewiseComponent } from './storewise/storewise/storewise.component'
import { ProductsComponent } from './Products/products/products.component'
import { EnquiryOrdersComponent } from './EnquiryOrders/enquiry-orders/enquiry-orders.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
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

const COMPONENTS = [
  AdvancedMailTemplatesComponent,
  AdvancedTypographyComponent,
  AdvancedUtilitiesComponent,
  AdvancedGridComponent,
  AdvancedFormExamplesComponent,
  AdvancedInvoiceComponent,
  AdvancedPricingTablesComponent,
  AdvancedColorsComponent,
]

@NgModule({
  imports: [
    SharedModule,
    AdvancedRouterModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsComponentsModule,
    Ng2SearchPipeModule,
    NgbModule,
    CommonModule,
    BootstrapUIKitExamplesModule,
    AntdUIKitExamplesModule,
  ],
  declarations: [
    ...COMPONENTS,
    StorewiseComponent,
    ProductsComponent,
    EnquiryOrdersComponent,
    Biz1bookMainComponent,
    ProductGroupDataComponent,
    PrdsalesrptComponent,
    OrdsalesrptComponent,
    GSTTestComponent,
    CategorymapsComponent,
    ProductComponent,
    CategoryComponent,
    MarketingInfoComponent,
    ExpansionPlanComponent,
    StaffTrainingComponent,
  ],
})
export class AdvancedModule {}
