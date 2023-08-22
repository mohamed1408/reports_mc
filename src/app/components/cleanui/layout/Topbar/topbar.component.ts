import { Component, OnInit } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  showStoreSelect: boolean = true
  storeid: number = 0
  companyid: number = 0
  stores: any = []
  erp_pages = [
    '/apps/batchentry',
    '/apps/vendors',
    '/apps/purchaseentry',
    '/apps/internaltransfer',
    '/apps/ReceiveOrders',
    '/apps/dispatch',
    '/apps/DispatchItem',
    '/apps/asset',
    '/apps/assettypes',
    '/apps/maintainencebilltypes',
    '/apps/location',
    '/apps/bankaccount',
    '/apps/credit',
    '/apps/purchasemaint',
    '/apps/billbyvendor',
  ]
  is_erp_page: boolean = false
  constructor(private auth: AuthService, public router: Router) {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.companyid = 3
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        console.log(event['url'])
        if (this.erp_pages.includes(event['url'])) this.is_erp_page = true
        else this.is_erp_page = false
      }
    })
  }
  ngOnInit(): void {
    this.getStores()
    this.auth.storeid.subscribe(x => {
      this.storeid = x
    })
  }

  setstoreid() {
    this.auth.storeid.next(this.storeid)
  }

  getStores() {
    this.auth.getstore(this.companyid).subscribe(data => {
      this.stores = data
    })
  }
}
