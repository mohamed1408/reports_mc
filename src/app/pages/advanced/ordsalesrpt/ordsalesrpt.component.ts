import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { saveAs } from 'file-saver'
declare const XLSX: any
@Component({
  selector: 'app-ordsalesrpt',
  templateUrl: './ordsalesrpt.component.html',
  styleUrls: ['./ordsalesrpt.component.scss'],
})
export class OrdsalesrptComponent implements OnInit {
  date: [Date, Date] = [null, null]
  selectedValue: number
  selectGST: any
  constructor(private Auth: AuthService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  getcomstore: any
  ngOnInit(): void {
    const currentDate = new Date()
    this.date[0] = this.getFirstDateOfMonth(currentDate)
    this.date[1] = currentDate
    this.loadDataAndCurrentDate()
  }

  private getFirstDateOfMonth(date: Date): Date {
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
    return firstDate
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result)
  }

  private loadDataAndCurrentDate(): void {
    this.Auth.GetComStore(this.gstMapping[this.selectGST]).subscribe((data: any) => {
      this.getcomstore = data.report
      if (this.getcomstore && this.getcomstore.length > 0) {
        this.selectedValue = this.getcomstore[0].CompanyId // Set a default value if available
        this.loadData()
        this.currentdate()
      }
    })
  }

  currentdate() {
    this.selectedValue = this.getcomstore[0]?.CompanyId
    const fromDate = this.formatDate(this.date[0])
    this.Auth.ordwisesalerpt(
      fromDate,
      fromDate,
      this.gstMapping[this.selectGST],
      this.selectedValue,
    ).subscribe((data: any) => {
      this.prdgrpdata = data.report
      console.log(this.prdgrpdata)
      this.collectionSize = this.prdgrpdata.length
    })
    this.exportdate = fromDate + ' ' + 'to' + ' ' + fromDate
    document.getElementsByClassName('pagination').item(0)['style']['flex-wrap'] = 'wrap'
  }

  loadData(): void {
    this.Auth.GetComStore(this.gstMapping[this.selectGST]).subscribe((data: any) => {
      this.getcomstore = data.report
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

  prdgrpdata_values() {
    const fromDate = this.formatDate(this.date[0])
    const toDate = this.formatDate(this.date[1])

    this.Auth.ordwisesalerpt(
      fromDate,
      toDate,
      this.gstMapping[this.selectGST],
      this.selectedValue,
    ).subscribe((data: any) => {
      this.prdgrpdata = data.report
      console.log(this.prdgrpdata)
      this.collectionSize = this.prdgrpdata.length
    })
    this.exportdate = fromDate + ' ' + 'to' + ' ' + toDate
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  exportdate: any
  locgst: any
  exportToCSV() {
    const selectedGSTValue = this.gstMapping[this.selectGST]
    let aoa = [[selectedGSTValue], ['Order id', 'Amount', 'CGST', 'SGST', 'Total Amount']]
    this.prdgrpdata.forEach(js => {
      aoa.push([js['ob'], js['amount'], js['Tax1'], js['Tax2'], js['BillAmount']])
    })
    console.log(aoa)
    // return
    let worksheet = XLSX.utils.aoa_to_sheet(aoa)
    Object.keys(worksheet).forEach(i => {
      // console.log(i,worksheet[i]);
      if (typeof worksheet[i] != 'object') return
      let cell = XLSX.utils.decode_cell(i)

      worksheet[i].s = {
        // styling for all cells
        font: {
          name: 'arial',
          sz: 10,
        },
      }

      if (cell.r == 0) {
        worksheet[i].s.fill = { fgColor: { rgb: 'd8e5f8' } }
        worksheet[i].s.font.bold = true
      }

      if (cell.r == 1) {
        worksheet[i].s.font.bold = true
        worksheet[i].s.border = {
          top: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
        }
      }
    })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, worksheet, 'data')
    XLSX.writeFile(wb, selectedGSTValue + '-' + this.exportdate + '.xlsx')
    return

    let csvData = 'Product,Amount,Tax%,SGST,CGST,SGST Amt,CGST Amt,Tax Amount,Total Amount\r\n'
    this.prdgrpdata.forEach(row => {
      csvData += `${row.product}, ${row.amount}, ${row.taxpercent}, ${row.cgst},  ${row.sgst}, ${row.cgstAmt}, ${row.sgstAmt}, ${row.taxAmount}, ${row.totalAmount}\r\n`
    })
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' })
    const fileName = 'Exported - ' + this.locgst
    saveAs(blob, fileName + new Date().getTime())
  }

  page = 1
  pageSize = 25
  collectionSize = 0

  get prods() {
    return this.prdgrpdata.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    )
  }
}
