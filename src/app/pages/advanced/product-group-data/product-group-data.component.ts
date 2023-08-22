import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { startOfMonth, endOfMonth } from 'date-fns'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-product-group-data',
  templateUrl: './product-group-data.component.html',
  styleUrls: ['./product-group-data.component.scss'],
})
export class ProductGroupDataComponent implements OnInit {
  date: Date = null // Single selected month
  selectedValue: number
  selectGST: any
  dataLoaded: boolean = false // Track if data is loaded

  constructor(private Auth: AuthService, private nzMessageService: NzMessageService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  getcomstore: any

  ngOnInit(): void {
    this.setInitialMonth()
    this.prdgrpdata_values()
    this.loadData()
  }

  setInitialMonth(): void {
    this.date = startOfMonth(new Date())
  }

  onChange(result: Date): void {
    if (result) {
      this.date = result
    }
  }

  loadData(): void {
    this.Auth.GetComStore(this.gstMapping[this.selectGST]).subscribe((data: any) => {
      this.getcomstore = this.mergeDuplicates(data.report, 'Name1')
      console.log(data)
    })
  }

  mergeDuplicates(array: any[], propertyName: string): any[] {
    const uniqueValues = new Map()
    array.forEach(item => {
      const key = item[propertyName]
      if (!uniqueValues.has(key)) {
        uniqueValues.set(key, item)
      }
    })
    return Array.from(uniqueValues.values())
  }

  prdgrpdata: any

  gstMapping = {
    '2299': '33APUPK5773P1ZW',
    '2810': '33AODPM8622B1ZC',
    '1415': '33CZXPM4328M1ZM',
    '2505': '33AMBPD3114B2Z5',
    '1404': '33AAECF5895R1ZS',
    '1425': '33ETSPM1889J1ZV',
    '6521': '',
    '1999': '36BQSPM9610B1ZO',
    '1967': '29BKEPV9455R1ZS',
    '1979': '33IWIPS2183C1ZF',
  }

  selectedValue2: string = ''

  prdgrpdata_values() {
    const selectedMonth = this.date.getMonth()
    const currentMonth = new Date().getMonth()

    if (selectedMonth === currentMonth) {
      const fromDate = this.formatDate(startOfMonth(this.date))
      const toDate = this.formatDate(endOfMonth(this.date))
      this.gstMapping['6521'] = this.selectedValue2

      this.Auth.prdgrpdata(fromDate, toDate, this.selectedValue).subscribe((data: any) => {
        this.prdgrpdata = data.report
        this.dataLoaded = true
        console.log(this.prdgrpdata)
      })
    } else {
      this.dataLoaded = false
      this.prdgrpdata = []
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  isUploadEnabled(): boolean {
    return this.prdgrpdata && this.prdgrpdata.length > 0
  }

  warninig() {
    this.nzMessageService.error("Can't Upload.. Your Selected Month Not Completed")
  }
}
