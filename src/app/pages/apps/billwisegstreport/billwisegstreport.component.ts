import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { startOfMonth, endOfMonth } from 'date-fns'
import * as XLSX from 'xlsx'
import * as moment from 'moment'

@Component({
  selector: 'app-billwisegstreport',
  templateUrl: './billwisegstreport.component.html',
  styleUrls: ['./billwisegstreport.component.scss'],
})
export class BillwisegstreportComponent implements OnInit {
  constructor(private Auth: AuthService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  ngOnInit(): void {}

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

  selectGST: any
  gstno: string
  fromdate: any
  todate: any
  reportsvalue: any

  getbillwiserpt() {
    this.Auth.getbillwiserpt(this.gstMapping[this.selectGST], this.fromdate, this.todate).subscribe(
      (data: any) => {
        this.reportsvalue = data['report']
        console.log(data)
      },
    )
  }

  selectedMonth: Date

  onChange(): void {
    if (this.selectedMonth instanceof Date && !isNaN(this.selectedMonth.getTime())) {
      const year = this.selectedMonth.getFullYear()
      const month = this.selectedMonth.getMonth()

      const startDate = new Date(year, month, 1)
      const formattedStartDate = this.formatDate(startDate)

      const endDate = new Date(year, month + 1, 0)
      const formattedEndDate = this.formatDate(endDate)

      this.fromdate = formattedStartDate
      this.todate = formattedEndDate
      console.log('Start Date:', this.fromdate)
      console.log('End Date:', this.todate)
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date
      .getDate()
      .toString()
      .padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  selectedRows: any[] = []
  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef

  ExportTOExcel() {
    console.log('clicked')
    const gstno = this.gstMapping[this.selectGST]
    const datesa = moment(this.fromdate).format('MMM YYYY')
    const today: string = moment().format('YYYY-MM-DD')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${gstno} - ${datesa} - billwiserpt.xlsx`)
  }
}
