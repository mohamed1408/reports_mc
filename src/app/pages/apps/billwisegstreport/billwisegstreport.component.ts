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
  constructor(private Auth: AuthService) {}

  ngOnInit(): void {}

  gstno: string
  fromdate: any
  todate: any
  reportsvalue: any

  getbillwiserpt() {
    this.Auth.getbillwiserpt(this.gstno, this.fromdate, this.todate).subscribe((data: any) => {
      this.reportsvalue = data['report']
      console.log(data)
    })
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
    const today: string = moment().format('YYYY-MM-DD')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${today} billwiserpt.xlsx`)
  }
}
