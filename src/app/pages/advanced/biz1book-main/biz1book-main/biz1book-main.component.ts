import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { saveAs } from 'file-saver'
import { timer } from 'rxjs'
import { finalize, switchMap } from 'rxjs/operators'
declare const XLSX: any
@Component({
  selector: 'app-biz1book-main',
  templateUrl: './biz1book-main.component.html',
  styleUrls: ['./biz1book-main.component.scss'],
})
export class Biz1bookMainComponent implements OnInit {
  date = null
  gstNo = '33APUPK5773P1ZW'
  cata = 'Others'
  storereport: any
  selectedValue: string = ''
  selectedValue2 = null
  selectedValue3 = null
  loading = false
  selectGST: any

  constructor(private Auth: AuthService) {
    var pincode = JSON.parse(localStorage.getItem('lockscreenPin'))
    this.selectGST = pincode
  }

  ngOnInit(): void {
    const currentDate = new Date()
    this.date = this.getFirstDateOfMonth(currentDate.toISOString().slice(0, 10))
  }

  onChange(result: string): void {
    this.date = this.getFirstDateOfMonth(result)
  }
  locgst: any
  locdate: any
  exportdate: any
  //getrept() {
  // timer(10000)
  // if (this.selectGST == '2299') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33APUPK5773P1ZW',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '2810') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33AODPM8622B1ZC',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1415') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33CZXPM4328M1ZM',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '2505') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33AMBPD3114B2Z5',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1404') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33AAECF5895R1ZS',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1425') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33ETSPM1889J1ZV',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '6521') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           this.selectedValue,
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1999') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '36BQSPM9610B1ZO',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1967') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '29BKEPV9455R1ZS',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // } else if (this.selectGST == '1979') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.loading = true
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           '33IWIPS2183C1ZF',
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(data => {
  //       console.log(data)
  //       this.storereport = data['table']
  //       console.log(this.storereport)
  //       this.storereport.forEach(row => {
  //         const dateParts = row.rptdate.split('T')[0].split('-')
  //         row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //       })
  //     })
  // }

  //HYPERECH

  // if (this.selectGST == '2299') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33APUPK5773P1ZW',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '2810') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33AODPM8622B1ZC',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1415') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33CZXPM4328M1ZM',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '2505') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33AMBPD3114B2Z5',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1404') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33AAECF5895R1ZS',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1425') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33ETSPM1889J1ZV',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '6521') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     this.selectedValue,
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1999') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '36BQSPM9610B1ZO',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1967') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '29BKEPV9455R1ZS',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // } else if (this.selectGST == '1979') {
  //   const nextMonth = this.getNextMonth(this.date)
  //   this.exportdate = nextMonth
  //   this.Auth.GetRptBiz1Pos(
  //     nextMonth,
  //     '33IWIPS2183C1ZF',
  //     this.selectedValue2,
  //     this.selectedValue3,
  //   ).subscribe(data => {
  //     console.log(data)
  //     this.storereport = data['table']
  //     console.log(this.storereport)
  //     this.storereport.forEach(row => {
  //       const dateParts = row.rptdate.split('T')[0].split('-')
  //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //     })
  //   })
  // }
  // if (localStorage.getItem('gst') === null && localStorage.getItem('seledate') === null) {
  //   timer(10000)
  //     .pipe(
  //       switchMap(() => {
  //         return this.Auth.GetRptBiz1Pos(
  //           nextMonth,
  //           this.selectedValue,
  //           this.selectedValue2,
  //           this.selectedValue3,
  //         )
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe(
  //       data => {
  //         console.log(data)
  //         this.storereport = data['table']
  //         console.log(this.storereport)

  //         this.storereport.forEach(row => {
  //           const dateParts = row.rptdate.split('T')[0].split('-')
  //           row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //         })
  //       },
  //       error => {
  //         console.error('Error fetching data:', error)
  //       },
  //     )
  //   localStorage.setItem('gst', this.selectedValue)
  //   localStorage.setItem('seledate', nextMonth)
  // } else {
  //   this.locgst = localStorage.getItem('gst')
  //   console.log(this.locgst)
  //   this.locdate = localStorage.getItem('seledate')
  //   console.log(this.locdate)
  //   if (nextMonth == this.locdate && this.selectedValue == this.locgst) {
  //     timer(10000)
  //       .pipe(
  //         switchMap(() => {
  //           return this.Auth.GetRptBiz1Pos(
  //             nextMonth,
  //             this.selectedValue,
  //             this.selectedValue2,
  //             this.selectedValue3,
  //           )
  //         }),
  //         finalize(() => (this.loading = false)),
  //       )
  //       .subscribe(
  //         data => {
  //           console.log(data)
  //           this.storereport = data['table']
  //           console.log(this.storereport)

  //           this.storereport.forEach(row => {
  //             const dateParts = row.rptdate.split('T')[0].split('-')
  //             row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  //           })
  //         },
  //         error => {
  //           console.error('Error fetching data:', error)
  //         },
  //       )
  //   } else {
  //     console.log('hii')
  //     timer(50)
  //   }
  // }

  // this.loading = true
  //}

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

  getrept() {
    const nextMonth = this.getNextMonth(this.date)
    this.exportdate = nextMonth
    //    this.loading = true

    this.gstMapping['6521'] = this.selectedValue

    // timer(10000)
    //   .pipe(
    //     switchMap(() => {
    //       return this.Auth.GetRptBiz1Pos(
    //         nextMonth,
    //         this.gstMapping[this.selectGST],
    //         this.selectedValue2,
    //         this.selectedValue3,
    //       )
    //     }),
    //     finalize(() => (this.loading = false)),
    //   )
    //   .subscribe(data => {
    //     console.log(data)
    //     this.storereport = data['table']
    //     console.log(this.storereport)
    //     this.storereport.forEach(row => {
    //       const dateParts = row.rptdate.split('T')[0].split('-')
    //       row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    //     })
    //   })

    this.Auth.GetRptBiz1Pos(
      nextMonth,
      this.gstMapping[this.selectGST],
      this.selectedValue2,
      this.selectedValue3,
    ).subscribe(data => {
      console.log(data)
      this.storereport = data['table']
      console.log(this.storereport)
      this.storereport.forEach(row => {
        const dateParts = row.rptdate.split('T')[0].split('-')
        row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      })
    })
  }

  fetchReportData() {
    const nextMonth = this.getNextMonth(this.date)
    this.Auth.GetRptBiz1Pos(
      nextMonth,
      this.selectedValue,
      this.selectedValue2,
      this.selectedValue3,
    ).subscribe(
      data => {
        console.log(data)
        this.storereport = data['table']
        console.log(this.storereport)

        this.storereport.forEach(row => {
          const dateParts = row.rptdate.split('T')[0].split('-')
          row.rptdate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        })

        this.loading = false
      },
      error => {
        this.loading = false
        console.error('Error fetching data:', error)
      },
    )
  }

  exportToCSV() {
    const selectedGSTValue = this.gstMapping[this.selectGST]
    let aoa = [
      [selectedGSTValue],
      [
        'Product',
        'Amt',
        'Tax %',
        'SGST',
        'CGST',
        'SGST Amt',
        'CGST Amt',
        'Tax Amount',
        'Total Amount',
      ],
    ]
    this.storereport.forEach(js => {
      aoa.push(Object.values(js).slice(1))
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
    this.storereport.forEach(row => {
      csvData += `${row.product}, ${row.amount}, ${row.taxpercent}, ${row.cgst},  ${row.sgst}, ${row.cgstAmt}, ${row.sgstAmt}, ${row.taxAmount}, ${row.totalAmount}\r\n`
    })
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' })
    const fileName = 'Exported - ' + this.locgst
    saveAs(blob, fileName + new Date().getTime())
  }

  onSelectedValueChange(): void {
    console.log(this.selectedValue2)
  }

  onSelectedValueChange2(): void {
    console.log(this.selectedValue3)
  }

  private getFirstDateOfMonth(dateString: string): string {
    const date = new Date(dateString)
    date.setDate(1)
    return date.toISOString().slice(0, 10)
  }

  private getNextMonth(dateString: string): string {
    const date = new Date(dateString)
    date.setMonth(date.getMonth())
    date.setDate(1)
    return date.toISOString().slice(0, 10)
  }

  isSubmitEnabled(): boolean {
    return this.date !== null && this.selectedValue3 !== null && this.selectedValue2 !== null
  }

  isExportEnabled(): boolean {
    return this.storereport && this.storereport.length > 0
  }
}
