import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { AppsRouterModule } from './apps-routing.module'
import { FormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { QuillModule } from 'ngx-quill'
import { SortablejsModule } from 'ngx-sortablejs'
import { NestableModule } from 'ngx-nestable'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'

// Apps
import { AppsMessagingComponent } from 'src/app/pages/apps/messaging/messaging.component'
import { AppsCalendarComponent } from 'src/app/pages/apps/calendar/calendar.component'
import { AppsProfileComponent } from 'src/app/pages/apps/profile/profile.component'
import { AppsGalleryComponent } from 'src/app/pages/apps/gallery/gallery.component'
import { AppsMailComponent } from 'src/app/pages/apps/mail/mail.component'
import { GithubExploreComponent } from 'src/app/pages/apps/github-explore/github-explore.component'
import { GithubDiscussComponent } from 'src/app/pages/apps/github-discuss/github-discuss.component'
import { JiraDashboardComponent } from 'src/app/pages/apps/jira-dashboard/jira-dashboard.component'
import { JiraAgileBoardComponent } from 'src/app/pages/apps/jira-agile-board/jira-agile-board.component'
import { TodoistListComponent } from 'src/app/pages/apps/todoist-list/todoist-list.component'
import { DigitaloceanDropletsComponent } from 'src/app/pages/apps/digitalocean-droplets/digitalocean-droplets.component'
import { DigitaloceanCreateComponent } from 'src/app/pages/apps/digitalocean-create/digitalocean-create.component'
import { GoogleAnalyticsComponent } from 'src/app/pages/apps/google-analytics/google-analytics.component'
import { HelpdeskDashboardComponent } from 'src/app/pages/apps/helpdesk-dashboard/helpdesk-dashboard.component'
import { WordpressPostComponent } from 'src/app/pages/apps/wordpress-post/wordpress-post.component'
import { WordpressPostsComponent } from 'src/app/pages/apps/wordpress-posts/wordpress-posts.component'
import { WordpressAddComponent } from 'src/app/pages/apps/wordpress-add/wordpress-add.component'
import { StorewiseComponent } from '../advanced/storewise/storewise/storewise.component'
import { OrderwisereportsComponent } from './orderwisereports/orderwisereports.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { ProductwisereportComponent } from './productwisereport/productwisereport.component'
import { SaleexportComponent } from './saleexport/saleexport.component'
import { MapcatComponent } from './mapcat/mapcat.component'
import { WebordersComponent } from './weborders/weborders.component'

const COMPONENTS = [
  OrderwisereportsComponent,
  ProductwisereportComponent,
  AppsMessagingComponent,
  AppsCalendarComponent,
  AppsProfileComponent,
  AppsGalleryComponent,
  AppsMailComponent,
  GithubExploreComponent,
  GithubDiscussComponent,
  JiraDashboardComponent,
  JiraAgileBoardComponent,
  TodoistListComponent,
  DigitaloceanDropletsComponent,
  DigitaloceanCreateComponent,
  GoogleAnalyticsComponent,
  HelpdeskDashboardComponent,
  WordpressPostComponent,
  WordpressPostsComponent,
  WordpressAddComponent,
  WebordersComponent,
]

@NgModule({
  imports: [
    SharedModule,
    AppsRouterModule,
    FormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
    QuillModule.forRoot(),
    SortablejsModule,
    NestableModule,
    Ng2SearchPipeModule,
  ],
  declarations: [...COMPONENTS, SaleexportComponent, MapcatComponent],
})
export class AppsModule {}
