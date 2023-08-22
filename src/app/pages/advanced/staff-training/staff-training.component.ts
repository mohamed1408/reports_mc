import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-staff-training',
  templateUrl: './staff-training.component.html',
  styleUrls: ['./staff-training.component.scss'],
})
export class StaffTrainingComponent implements OnInit {
  selectGST: string
  companies: any[] = []
  companyid: number = 0
  categories: any[] = []
  menu: any = {}

  constructor(private auth: AuthService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  ngOnInit(): void {
    this.getproducts()
  }

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
    } else {
      return 'ADMIN'
    }
  }

  getproducts() {
    this.auth.GetStaffTraining().subscribe(cdata => {
      this.categories = cdata['report']
      this.collectionSize = this.categories.length
    })
  }

  page = 1
  pageSize = 5
  collectionSize = 0

  get prods() {
    return this.categories.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    )
  }
}
