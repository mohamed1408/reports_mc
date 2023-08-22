import { Component, OnInit } from '@angular/core'
import { addDays, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n'
import { AuthService } from 'src/app/auth.service'
import { Ng2SearchPipe } from 'ng2-search-filter'
import moment from 'moment'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-storewise',
  templateUrl: './storewise.component.html',
  styleUrls: ['./storewise.component.scss'],
  providers: [Ng2SearchPipe],
})
export class StorewiseComponent implements OnInit {
  rangeSetting: RangeSetting | null = null
  rangeSettings: Array<RangeSetting> = []
  companydetails: any
  drawervisible = false
  numberValue: number = 0
  selectedColor: string
  value?: string
  selectedValue: string = ''
  options: string[] = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Last Month',
    'Custom Range',
  ]
  date = null // new Date();
  dateRange: Date[] = []

  constructor(
    private i18n: NzI18nService,
    private Auth: AuthService,
    private ng2filterpipe: Ng2SearchPipe,
    private message: NzMessageService,
  ) {
    this.rangeSettings = JSON.parse(localStorage.getItem('rangeSettings') || '[]')
    this.Auth.companyid.subscribe(companyid => {
      this.companyid = companyid
      this.getStores()
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result)
  }

  ngOnInit() {
    //this.getcompanies()
  }

  open(): void {
    this.drawervisible = true
  }

  drawerclose(): void {
    this.drawervisible = false
  }

  handleInputChange() {}

  handleClick(option: string): void {
    if (option === 'Today') {
      this.dateRange = [new Date(), new Date()]
      this.startdate = new Date().toISOString().split('T')[0]
      this.enddate = new Date().toISOString().split('T')[0]
    } else if (option === 'Yesterday') {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      this.dateRange = [yesterday, yesterday]
      this.startdate = yesterday.toISOString().split('T')[0]
      this.enddate = yesterday.toISOString().split('T')[0]
    } else if (option === 'Last 7 Days') {
      const last7DaysStart = new Date()
      last7DaysStart.setDate(last7DaysStart.getDate() - 6)
      this.dateRange = [last7DaysStart, new Date()]
      this.startdate = last7DaysStart.toISOString().split('T')[0]
      this.enddate = new Date().toISOString().split('T')[0]
    } else if (option === 'Last 30 Days') {
      const last30DaysStart = new Date()
      last30DaysStart.setDate(last30DaysStart.getDate() - 29)
      this.dateRange = [last30DaysStart, new Date()]
      this.startdate = last30DaysStart.toISOString().split('T')[0]
      this.enddate = new Date().toISOString().split('T')[0]
    } else if (option === 'This Month') {
      const thisMonthStart = startOfMonth(new Date())
      const thisMonthEnd = endOfMonth(new Date())
      this.dateRange = [thisMonthStart, thisMonthEnd]
      this.startdate = thisMonthStart.toISOString().split('T')[0]
      this.enddate = thisMonthEnd.toISOString().split('T')[0]
    } else if (option === 'Last Month') {
      const lastMonthStart = startOfMonth(subMonths(new Date(), 1))
      const lastMonthEnd = endOfMonth(subMonths(new Date(), 1))
      this.dateRange = [lastMonthStart, lastMonthEnd]
      this.startdate = lastMonthStart.toISOString().split('T')[0]
      this.enddate = lastMonthEnd.toISOString().split('T')[0]
    } else {
      this.dateRange = []
      this.startdate = null
      this.enddate = null
    }
  }

  customRange: Date[]

  handleCustomRange(): void {
    if (this.customRange.length === 2) {
      this.dateRange = this.customRange
      this.startdate = this.customRange[0].toISOString().split('T')[0]
      this.enddate = this.customRange[1].toISOString().split('T')[0]
    }
  }

  // getcompanies() {
  //   this.Auth.getcompanies().subscribe(data => {
  //     this.companydetails = data
  //     console.log(this.companydetails)
  //   })
  // }

  //HYPERTECH
  stores: any = []
  user: any
  companies: any = []
  companyid: number = 0
  storeid: number = 0
  startdate: string = ''
  enddate: string = ''
  storereport: any = []
  term: string = ''
  TotalBill: number = 0
  TotalPaidAmt: number = 0
  Tax: number = 0
  TotalDisc: number = 0
  TotalPOS: number = 0
  TotalSWIGGY: number = 0
  TotalZomato: number = 0
  sortSetting: any = {
    Name: ['name', 0],
    PaidAmount: ['paidAmount', 0],
    BillAmount: ['billAmount', 0],
    Pos: ['pos', 0],
    Swiggy: ['swiggy', 0],
    Zomato: ['zomato', 0],
    DiscAmount: ['discAmount', 0],
  }
  sort(field: string) {
    const { compare } = Intl.Collator('en-US')
    if ([-1, 0].includes(this.sortSetting[field][1])) {
      this.sortSetting[field][1] = 1
    } else {
      this.sortSetting[field][1] = -1
    }
    this.resetSettings(field)
    const type = typeof this.storereport[0][field]
    if (type == 'number')
      this.storereport = this.storereport.sort(
        (a: any, b: any) =>
          ((a[field] - b[field]) / Math.abs(a[field] - b[field])) * this.sortSetting[field][1],
      )
    else if (type == 'string')
      this.storereport = this.storereport.sort(
        (a: any, b: any) => a[field].localeCompare(b[field]) * this.sortSetting[field][1],
      )
  }

  resetSettings(field: string) {
    Object.keys(this.sortSetting).forEach(key => {
      if (key != field) {
        this.sortSetting[key][1] = 0
      }
    })
  }

  storeRpt() {
    document.getElementById('preloader').style.display = 'block'

    const companykey = this.Auth.selectedcompanies.value.join('_')
    if (this.startdate && this.enddate) {
      this.Auth.GetMultiStorewiseRpt(this.startdate, this.enddate, companykey).subscribe(
        (data: any) => {
          console.log(data)
          this.storereport = data['order']
          this.calculate()
          this.paint()

          document.getElementById('preloader').style.display = 'none'
        },
      )
    } else {
      this.message.error('Please select a valid date range.')
      document.getElementById('preloader').style.display = 'none'
    }
  }

  calculate() {
    this.TotalBill = 0
    this.TotalPaidAmt = 0
    this.Tax = 0
    this.TotalDisc = 0
    this.TotalPOS = 0
    this.TotalSWIGGY = 0
    this.TotalZomato = 0
    this.ng2filterpipe.transform(this.storereport, this.term).forEach((rpt: any) => {
      this.TotalBill += rpt.billAmount
      this.TotalPaidAmt += rpt.paidAmount
      this.Tax += rpt.tax
      this.TotalDisc += rpt.discAmount
      this.TotalPOS += rpt.pos
      this.TotalSWIGGY += rpt.swiggy
      this.TotalZomato += rpt.zomato
      rpt.PosPaid = +(rpt.paidAmount - rpt.swiggy - rpt.zomato).toFixed(0)
    })
    this.TotalBill = +this.TotalBill.toFixed(0)
    this.TotalPaidAmt = +this.TotalPaidAmt.toFixed(0)
    this.Tax = +this.Tax.toFixed(0)
    this.TotalDisc = +this.TotalDisc.toFixed(0)
    this.TotalPOS = +this.TotalPOS.toFixed(0)
    this.TotalSWIGGY = +this.TotalSWIGGY.toFixed(0)
    this.TotalZomato = +this.TotalZomato.toFixed(0)
  }

  getdashboard() {
    this.Auth.getdashboardbycompany(
      this.startdate,
      this.enddate,
      this.companyid,
      this.storeid,
    ).subscribe((data: any) => {
      console.log(data)
      this.storereport = data['TotalSales']
    })
  }

  paint() {
    this.storereport.forEach((rpt: any) => {
      if (
        this.rangeSettings.some(x => x.from <= rpt.paidAmount && (x.to >= rpt.paidAmount || !x.to))
      ) {
        rpt.setting = this.rangeSettings.filter(
          x => x.from <= rpt.paidAmount && (x.to >= rpt.paidAmount || !x.to),
        )[0]
      } else {
        rpt.setting = new RangeSetting('white')
      }
    })
  }

  lightOrDark(color) {
    let r, g, b, hsp
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

      r = color[1]
      g = color[2]
      b = color[3]
    } else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

      r = color >> 16
      g = (color >> 8) & 255
      b = color & 255
    }

    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light'
    } else {
      return 'dark'
    }
  }
  newSetting() {
    this.rangeSetting = new RangeSetting('#ff0000')
  }

  addSetting() {
    if (this.rangeSetting != null) {
      this.rangeSettings.forEach(set => {
        set.editmode = false
        if (!set.from) set.from = 0
        if (!set.to) set.to = 0
      })
      this.rangeSettings.push(this.rangeSetting)
    }
    localStorage.setItem('rangeSettings', JSON.stringify(this.rangeSettings))
    this.rangeSetting = null
    this.paint()
  }
  capitalize_json = json => {
    // console.log(json)
    let min_json = {}
    let type = this.gettype(json)
    // console.log(json, type)
    if (type != 'object' && type != 'array') {
      // console.log("given value is not object or array")
      return json
    }
    if (type == 'object') {
      Object.keys(json).forEach((key, i) => {
        if (typeof json[key] == 'object' && json[key] != null) {
          min_json[key[0].toUpperCase() + key.slice(1)] = JSON.parse(
            JSON.stringify(this.capitalize_json(json[key])),
          )
          // console.log(json[key], String.fromCharCode(charcode + i), min_json[String.fromCharCode(charcode + i)])
        } else {
          min_json[key[0].toUpperCase() + key.slice(1)] = json[key]
        }
      })
    } else if (type == 'array') {
      min_json = []
      json.forEach((el, i) => {
        min_json[i] = this.capitalize_json(json[i])
      })
    }
    return min_json
  }
  gettype = data => {
    if (typeof data == 'object') {
      return Array.isArray(data) ? 'array' : 'object'
    }
    return typeof data
  }

  getStores() {
    this.Auth.getstore(this.companyid).subscribe(data => {
      this.stores = data
    })
  }

  updateSettings() {
    this.rangeSettings.forEach(set => {
      set.editmode = false
      if (!set.from) set.from = 0
      if (!set.to) set.to = 0
    })
    localStorage.setItem('rangeSettings', JSON.stringify(this.rangeSettings))
    this.paint()
  }

  deleteSetting(i: number) {
    this.rangeSettings.splice(i, 1)
    localStorage.setItem('rangeSettings', JSON.stringify(this.rangeSettings))
    this.paint()
  }
}

class RangeSetting {
  color: string
  from: number
  to: number
  editmode: boolean

  constructor(color: string) {
    this.color = color //'#ff0000';
    this.from = 0
    this.to = 0
    this.editmode = false
  }
}
