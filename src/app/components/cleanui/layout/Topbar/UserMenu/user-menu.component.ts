import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import { ConstantsService } from '../../../../../services/constants/constants.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { AuthService } from 'src/app/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 0
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''
  datasavetype: string = '1'
  user: any
  constructor(
    private store: Store<any>,
    private globals: ConstantsService,
    private notification: NzNotificationService,
    private Auth: AuthService,
    private router: Router,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
    // this.store.pipe(select(Reducers.getUser)).subscribe(state => {
    this.name = this.user?.name
    this.role = this.user?.role?.name
    this.email = globals.email
    this.datasavetype = localStorage.getItem('datasavetype')
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.setItem('logState', 'logged_out')
    this.store.dispatch(new UserActions.Logout())
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    // this.Auth.getdbdata(['loginfo']).subscribe(data => {
    //   this.loginfo = data['loginfo'][0]
    //   this.CompanyId = this.loginfo.CompanyId
    //   this.StoreId = this.loginfo.StoreId
    //   console.log(this.loginfo)
    //   // this.sync()
    // })
  }
  loginfo
  CompanyId: any
  StoreId: any
  lock() {
    localStorage.removeItem('user')
    this.router.navigateByUrl('/auth/pinscreen')
  }
  // sync() {
  //   this.Auth.getstoredata(this.CompanyId, this.StoreId, 1).subscribe(data1 => {
  //     console.log(data1)
  //     this.Auth.getstoredatadb(data1).subscribe(d => {
  //       this.router.navigateByUrl('/auth/pinscreen')
  //     })
  //   })
  // }
}
