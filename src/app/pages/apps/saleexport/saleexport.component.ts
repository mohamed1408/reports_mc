import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { startOfMonth, endOfMonth } from 'date-fns'
import { NzMessageService } from 'ng-zorro-antd/message'
import { saveAs } from 'file-saver'
declare const XLSX: any

@Component({
  selector: 'app-saleexport',
  templateUrl: './saleexport.component.html',
  styleUrls: ['./saleexport.component.scss'],
})
export class SaleexportComponent implements OnInit {
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
      this.getcomstore = data.report
      console.log(data)
    })
  }

  // mergeDuplicates(array: any[], propertyName: string): any[] {
  //   const uniqueValues = new Map()
  //   array.forEach(item => {
  //     const key = item[propertyName]
  //     if (!uniqueValues.has(key)) {
  //       uniqueValues.set(key, item)
  //     }
  //   })
  //   return Array.from(uniqueValues.values())
  // }

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

      this.exportdate = fromDate + ' ' + 'to' + ' ' + toDate
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

  exportdate: any
  locgst: any
  exportToCSV() {
    const selectedGSTValue = this.gstMapping[this.selectGST]
    let aoa = [
      [selectedGSTValue],
      [
        'Product Group',
        'Amount',
        'CGst',
        'CGst Amount',
        'SGst',
        'SGst Amount',
        'Tax',
        'Tax Amount',
        'Total Amount',
      ],
    ]
    this.prdgrpdata.forEach(js => {
      aoa.push([
        js['Product'],
        js['Amt'],
        js['CGST'],
        js['CGSTAmt'],
        js['SGST'],
        js['SGSTAmt'],
        js['Tax'],
        js['TaxAmount'],
        js['TotalAmount'],
      ])
    })
    // console.log(aoa)
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
}
