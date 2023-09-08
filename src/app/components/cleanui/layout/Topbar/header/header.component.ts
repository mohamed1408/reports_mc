import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'cui-topbar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectGST: any

  constructor(private auth: AuthService, private router: Router) {
    this.auth.companies.subscribe(companies => {
      this.companies = companies
    })

    if (
      router.url == '../../../../../pages/advanced/storewise/storewise/storewise.component.html'
    ) {
      this.multicompanies = true
    } else {
      this.multicompanies = false
    }

    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] ==
          '../../../../../pages/advanced/storewise/storewise/storewise.component.html'
        ) {
          this.multicompanies = true
        } else {
          this.multicompanies = false
        }
      }
    })

    this.auth.companyid.subscribe(companyid => {
      this.companyid = companyid
    })

    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  ngOnInit(): void {
    this.getGSTNumber()
  }

  companies: any = []
  selected_companies: any[] = []
  multicompanies: boolean = false
  companyid: number = 0
  stores: any = []

  change(bool: boolean = true) {
    // console.log(bool);
    // this.selected_companies = this.companies
    //   .filter((x: any) => x.isselected)
    //   .map((x: any) => x.accountName)
    //   .join(', ')
    console.log(this.selected_companies)
    // this.auth.selectedcompanies.next(
    //   this.companies.filter((x: any) => x.isselected).map((x: any) => x.companyId),
    // )
  }

  // setCompanyId() {
  //   this.auth.companyid.next(this.companyid)
  //   console.log(this.selected_companies)
  //   // this.selected_companies = this.companies
  //   //   .filter((x: any) => x.isselected)
  //   //   .map((x: any) => x.accountName)
  //   //   .join(', ')
  //   // console.log(this.selected_companies)
  //   this.auth.selectedcompanies.next(this.selected_companies)
  // }

  selectAllOption: boolean = false

  setCompanyId() {
    if (this.selected_companies.includes('all')) {
      this.selected_companies = this.companies.map(company => company.companyId)
      this.selectAllOption = true
    } else {
      this.selectAllOption = false
    }

    this.auth.companyid.next(this.companyid)
    console.log(this.selected_companies)
    this.auth.selectedcompanies.next(this.selected_companies)
  }

  getStores() {
    this.auth.getstore(this.companyid).subscribe(data => {
      this.stores = data
    })
  }

  gst1: string
  gst2: string
  gst3: string
  gst4: string
  gst5: string
  gst6: string

  getGSTNumber(): string {
    if (this.selectGST == '2299') {
      return '33APUPK5773P1ZW'
    } else if (this.selectGST == '2810') {
      return '33AODPM8622B1ZC'
    } else if (this.selectGST == '1415') {
      return '33CZXPM4328M1ZM'
    } else if (this.selectGST == '2505') {
      return '33AMBPD3114B2Z5'
    } else if (this.selectGST == '1404') {
      return '33AAECF5895R1ZS'
    } else if (this.selectGST == '1425') {
      return '33ETSPM1889J1ZV'
    } else if (this.selectGST == '1999') {
      return '36BQSPM9610B1ZO'
    } else if (this.selectGST == '1967') {
      return '29BKEPV9455R1ZS'
    } else if (this.selectGST == '1979') {
      return '33IWIPS2183C1ZF'
    } else if (this.selectGST == '4238') {
      return '33CDQPS7893Q1Z4'
    } else {
      return 'ADMIN'
    }
  }
}
