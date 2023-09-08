import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-gst-test',
  templateUrl: './gst-test.component.html',
  styleUrls: ['./gst-test.component.scss'],
})
export class GSTTestComponent implements OnInit {
  date: any
  selectedValue: number
  selectGST: any
  constructor(private Auth: AuthService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  getcomstore: any
  ngOnInit(): void {
    const currentDate = new Date()
    // this.date[0] = this.getFirstDateOfMonth(currentDate)
    // this.date[1] = currentDate
    this.loadData()
  }

  private getFirstDateOfMonth(date: Date): Date {
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
    return firstDate
  }

  onChange(result: any): void {
    console.log('onChange: ', moment(result).format('YYYY-MM-DD'), this.date)
  }

  loadData(): void {
    this.Auth.GetComStore(this.gstMapping[this.selectGST]).subscribe((data: any) => {
      this.getcomstore = data.stores
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

  isUploadEnabled(): boolean {
    return this.prdgrpdata && this.prdgrpdata.length > 0
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
    '4238': '33CDQPS7893Q1Z4',
  }
  totalamount: number = 0
  report: any[] = []
  prdgrpdata_values() {
    this.Auth.gettestdata(moment(this.date).format('YYYY-MM-DD'), this.selectedValue).subscribe(
      (data: any) => {
        this.report = data['report']
        console.log(this.report)
        this.totalamount = +this.report
          .map(x => x.TotalAmount)
          .reduce((a, b) => a + b, 0)
          .toFixed(0)
        this.report.forEach(element => {
          element.totalpercent = +(100 * (element.TotalAmount / this.totalamount)).toFixed(0)
          element.TaxPercentage = +element.TaxPercentage.toFixed(0)
          element.TotalAmount = +element.TotalAmount.toFixed(0)
        })
      },
    )
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
