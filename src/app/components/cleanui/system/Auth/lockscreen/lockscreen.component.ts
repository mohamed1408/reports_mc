import { Component } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth.service'
import { Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'

@Component({
  selector: 'cui-system-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LockscreenComponent {
  storeid = 0
  users = []
  pin = ''
  roleConfig = {
    '7': { role: 'ADMIN', defaultPage: '/apps/products' },
    '1': { role: 'POSADMIN', defaultPage: '/apps/products' },
    '3': { role: 'POSCASHIER', defaultPage: '/apps/products' },
    '6': { role: 'ERPADMIN', defaultPage: '/apps/internaltransfer' },
    '0': { role: '', defaultPage: '/auth/login' },
  }

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private auth: AuthService,
    private store: Store<any>,
  ) {
    // this.users = JSON.parse(localStorage.getItem('stores'))
  }
  CompanyId = 0
  UserId = 0
  ngOnInit(): void {
    localStorage.removeItem('user')
    const user = JSON.parse(localStorage.getItem('stores'))
    console.log(user)
    this.CompanyId = user[0].companyId
    console.log(this.CompanyId)
  }

  authorize: any
  // unlock() {
  //   this.auth.companies.subscribe(companies => {
  //     if (companies.length > 1) {
  //       this.auth.limited_user.next(false)
  //     }
  //   })
  //   this.auth.unlockscreen(this.pin, this.CompanyId).subscribe(data => {
  //     if (data['authorize']) {
  //       localStorage.setItem('user', JSON.stringify(data['user']))
  //       this.store.dispatch(
  //         new UserActions.LoadCurrentAccountSuccessful({
  //           id: data['user']['id'],
  //           name: data['user']['name'],
  //           role: this.roleConfig[data['user']['roleId'].toString()]['role'],
  //           email: '',
  //           avatar: '',
  //         }),
  //       )
  //       this.auth.getusercompanies(data['user']['id']).subscribe((data: any) => {
  //         this.auth.companies.next(data['userCompanies'])
  //         this.auth.companyid.next(this.CompanyId)
  //         console.log(this.CompanyId)
  //         console.log(data)
  //       })
  //       this.notification.success('Logged In!', 'Logged in successfully')
  //       this.router.navigateByUrl('/apps/saleexport')
  //     } else {
  //       this.notification.error('Pin Invalid', 'Check your PIN')
  //     }
  //   })
  // }
  allowedPins = ['2299', '2810', '1415', '2505', '1404', '1425', '1999', '1967', '1979', '4238']
  unlock() {
    this.auth.companies.subscribe(companies => {
      if (companies.length > 1) {
        this.auth.limited_user.next(false)
      }
    })

    if (this.allowedPins.includes(this.pin)) {
      localStorage.setItem('lockscreenPin', this.pin)
      this.notification.success('Logged In!', 'Logged in successfully')
      this.router.navigateByUrl('/apps/saleexport')
    } else {
      this.notification.error('Invalid PIN', 'Please enter a valid PIN')
    }
  }

  fillPin(number: string): void {
    this.pin += number
  }

  eraseLastClickedValue(): void {
    if (this.pin.length > 0) {
      this.pin = this.pin.slice(0, -1)
    }
  }
}
