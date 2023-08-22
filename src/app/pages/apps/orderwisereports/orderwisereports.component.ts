import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { getISOWeek } from 'date-fns'
import { AuthService } from 'src/app/auth.service'
import * as moment from 'moment'
import { endOfMonth, subDays, subMonths, startOfMonth } from 'date-fns'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-orderwisereports',
  templateUrl: './orderwisereports.component.html',
  styleUrls: ['./orderwisereports.component.scss'],
})
export class OrderwisereportsComponent implements OnInit {
  @ViewChild('itemsModal', { static: false }) private itemsModal: ElementRef | any

  date = null
  inputValue?: string
  options: string[] = []
  value?: string
  selected_storeid: any[]

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.Auth.limited_user.subscribe(lu => {
      this.limited_user = lu
    })
    this.StoreId = 0

    //DAte Picker
  }

  ngOnInit(): void {
    this.Auth.companyid.subscribe(companyid => {
      this.CompanyId = companyid
      this.GetStore()
    })
    var date = new Date()
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
  }

  // onChange(result: Date[]): void {
  //   console.log('onChange: ', result)
  // }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek))
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.options = value ? [value, value + value, value + value + value] : []
  }

  //Table -- Start

  listOfColumn = [
    {
      title: 'Id',
      compare: (a: DataItem, b: DataItem) => a.id.localeCompare(b.id),
      priority: false,
    },
    {
      title: 'Date',
      compare: (a: DataItem, b: DataItem) => a.date.localeCompare(b.date),
      priority: 3,
    },
    {
      title: 'Store',
      compare: (a: DataItem, b: DataItem) => a.store.localeCompare(b.store),
      priority: 2,
    },
    {
      title: 'Tax',
      compare: (a: DataItem, b: DataItem) => a.tax - b.tax,
      priority: 1,
    },
    {
      title: 'Discount',
      compare: (a: DataItem, b: DataItem) => a.disc - b.disc,
      priority: false,
    },
    {
      title: 'Bill Amount',
      compare: (a: DataItem, b: DataItem) => a.bill - b.bill,
      priority: 3,
    },
    {
      title: 'Paid Amount',
      compare: (a: DataItem, b: DataItem) => a.paid - b.paid,
      priority: 2,
    },
    {
      title: 'Customer Details',
      compare: (a: DataItem, b: DataItem) => a.customer.localeCompare(b.customer),
      priority: 1,
    },
  ]
  //Table --End

  //Date PICKER
  ranges = {
    Today: [new Date(), new Date()],
    Yesterday: [subDays(new Date(), 1), subDays(new Date(), 1)],
    'Last 7 days': [subDays(new Date(), 7), new Date()],
    'Last 30 days': [subDays(new Date(), 30), new Date()],
    'This Month': [startOfMonth(new Date()), endOfMonth(new Date())],
    'Last Month': [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
    //'Custom Range': [null, null], // Placeholder for a custom range selection
  }

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1])
    this.startdate = result[0]?.toISOString().split('T')[0]
    this.enddate = result[1]?.toISOString().split('T')[0]
  }

  //COPY
  orderwiserpt: any
  show: boolean = true
  CompanyId: number = 0
  StoreId: number
  startdate: any
  enddate: any
  stores: any
  key = 'Name'
  storeId: any
  all: string = 'All'
  selected: any
  alwaysShowCalendars: boolean
  TotalSales = 0
  TotalPayments = 0
  term: string = ''
  p: any
  showloading = true
  errorMsg: string = ''
  status!: number
  cgst: any
  sgst: any
  receipt: any = { items: [], invoiceno: '' }
  subtotal: any
  total: any
  charge: any
  ordcharges: any
  discount!: number
  sourceId = 0
  sortfield: any
  x!: number
  y!: number
  pricetot = 0
  limited_user: boolean = true

  Submit() {
    document.getElementById('preloader').style.display = 'block'

    if (this.startdate.hasOwnProperty('month')) {
      this.startdate.month = this.startdate.month - 1
      this.enddate.month = this.enddate.month - 1
    }

    var frmdate = moment(this.startdate).format('YYYY-MM-DD')
    var todate = moment(this.enddate).format('YYYY-MM-DD')

    this.Auth.GetSalesRpt1(
      this.storeId,
      this.startdate,
      this.enddate,
      this.CompanyId,
      this.sourceId,
    ).subscribe((data: any) => {
      this.orderwiserpt = data
      console.log(this.orderwiserpt)
      this.TotalPayments = 0
      this.TotalSales = 0

      for (let i = 0; i < this.orderwiserpt.order.length; i++) {
        console.log(this.orderwiserpt.order[i].itemJson)
        this.orderwiserpt.order[i].orderedDate = moment(
          this.orderwiserpt.order[i].orderedDate,
        ).format('LLL')
        this.orderwiserpt.order[i].itemnames = JSON.parse(this.orderwiserpt.order[i].itemJson)
          .map((x: any) => x.showname || x.title)
          .join(', ')
        this.orderwiserpt.order[i].cus_details = this.getcustomerDetails(
          this.orderwiserpt.order[i].orderType,
          JSON.parse(this.orderwiserpt.order[i].orderJson),
        )
        this.TotalPayments = this.TotalPayments + this.orderwiserpt.order[i].paidAmount
        this.TotalSales = this.TotalSales + this.orderwiserpt.order[i].billAmount
      }

      this.TotalSales = +this.TotalSales.toFixed(2)
      this.TotalPayments = +this.TotalPayments.toFixed(2)
      var response: any = data
      console.log(this.orderwiserpt.order)

      if (response.status == 0) {
        this.status = 0
        this.errorMsg = response.msg
        console.log('HYPERTECH' + this.errorMsg)
      }

      document.getElementById('preloader').style.display = 'none'
    })
  }

  selectEvent(e: { id: any }) {
    this.storeId = e.id
  }

  transactionDetails: string[] = []
  isVisible = false

  itemdetails(
    itemJson: string,
    chargeJson: string,
    sourceId: number,
    invoiceNo: string,
    orderJson: string,
    transactionDetails: string,
  ) {
    console.log(JSON.parse(orderJson))
    this.receipt = []
    this.sgst = 0
    this.cgst = 0
    this.subtotal = 0
    this.transactionDetails = transactionDetails.split(', ')
    if (itemJson) {
      if (sourceId != 1) {
        this.onlineOrderDetails(itemJson, chargeJson, sourceId, invoiceNo)
        return
      }
      var itemarray = JSON.parse(itemJson)
      console.log(itemarray)
      this.receipt.invoiceNo = invoiceNo
      this.receipt.items = []
      itemarray.forEach((item: { Tax1: any; Tax2: any; TotalAmount: any }) => {
        // item.OptionGroup.forEach(optgrp => {
        //   optgrp.Option.forEach(opt => {
        //     item.Price = item.Price + opt.Price
        //     item.Product = item.Product + '/' + opt.Name
        //   });
        // });
        // item.Price = item.Price * item.Quantity - item.DiscAmount
        this.receipt.items.push(item)
        this.cgst = this.cgst + item.Tax1
        this.sgst = this.sgst + item.Tax2
        // console.log(this.subtotal)
        this.subtotal = this.subtotal + item.TotalAmount
        // });
      })
      this.total = this.subtotal + this.sgst + this.cgst
      console.log(chargeJson)
      var chargejson = JSON.parse(chargeJson)
      if (chargeJson)
        chargejson.forEach((charge: { chargeJson: any }) => {
          this.total = this.total + charge.chargeJson
        })
    }

    // this.openDetailpopup(modal);
    this.modalService.open(this.itemsModal, {
      centered: true,
      size: 'lg',
      backdropClass: 'z-index-1',
    })
  }

  onlineOrderDetails(
    // modal: any,
    itemjson: string,
    ChargeJson: string,
    sourceId: any,
    invoiceno: string,
  ) {
    var itemarray = JSON.parse(itemjson)
    console.log(itemarray)
    this.receipt.invoiceno = invoiceno
    this.receipt.items = []
    itemarray.forEach(
      (item: {
        Price: number
        total: number
        discount: number
        Product: string
        title: any
        Quantity: any
        quantity: any
        options_to_add: any[]
        Tax1: any
        taxes: { value: any }[]
        Tax2: any
      }) => {
        item.Price = item.total - item.discount
        item.Product = item.title
        item.Quantity = item.quantity
        item.options_to_add.forEach((opt: { title: string }) => {
          item.Product = item.Product + '/' + opt.title
        })
        this.receipt.items.push(item)
        item.Tax1 = item.taxes[0] ? item.taxes[0].value : 0
        item.Tax2 = item.taxes[1] ? item.taxes[1].value : 0
        this.cgst = this.cgst + item.Tax1
        this.sgst = this.sgst + item.Tax2
        this.subtotal = this.subtotal + item.Price
      },
    )
    this.total = this.subtotal + this.sgst + this.cgst
    console.log(chargejson)
    if (ChargeJson) {
      var chargejson = JSON.parse(ChargeJson)
      chargejson.forEach((charge: { ChargeValue: any }) => {
        this.total = this.total + charge.ChargeValue
      })
    }

    this.modalService.open(this.itemsModal, {
      centered: true,
      size: 'lg',
      backdropClass: 'z-index-1',
    })
  }

  filter1(Id: any) {
    var orderitem = this.orderwiserpt.order1.filter((x: { OrderId: any }) => x.OrderId == Id)
    console.log(orderitem)
    this.receipt = []
    this.sgst = 0
    this.cgst = 0
    this.subtotal = 0
    this.pricetot = 0
    this.discount = this.orderwiserpt.Order.filter((x: { Id: any }) => x.Id == Id)[0].DiscAmount
    orderitem.forEach(
      (element: { Price: number; Quantity: number; Tax1: number; Tax2: number }) => {
        this.pricetot = element.Price * element.Quantity
        this.cgst = this.cgst + (element.Tax1 * this.pricetot) / 100
        this.sgst = this.sgst + (element.Tax2 * this.pricetot) / 100
        this.subtotal = this.pricetot + this.subtotal
        this.receipt.push(element)
        this.total = this.subtotal + this.sgst + this.cgst
        console.log(this.receipt)
        var orderitem1 = this.orderwiserpt.order3.filter((x: { OrderId: any }) => x.OrderId == Id)
        this.ordcharges = orderitem1
        console.log(orderitem1)
        this.ordcharges.forEach((element: { ChargeAmount: any }) => {
          this.total = this.total + element.ChargeAmount
        })
        this.total = (this.total - this.discount).toFixed(0)
      },
    )
  }

  getcustomerDetails(ordertypeid: number, obj: any) {
    let cus_details = { name: '', phone: '' }
    try {
      if (ordertypeid <= 5) {
        cus_details = {
          name: obj.CustomerDetails.Name,
          phone: obj.CustomerDetails.PhoneNo,
        }
      } else if (ordertypeid == 6) {
        cus_details = { name: obj.customer.name, phone: obj.customer.phone }
      } else if (ordertypeid == 7) {
        cus_details = { name: obj.Name, phone: obj.Phone }
      }
    } catch (error) {
      console.log(error)
      console.log(obj)
    }
    return cus_details
  }

  All() {
    var frmdate = moment().format('YYYY-MM-DD  00:00:00')
    var todate = moment().format('YYYY-MM-DD  23:59:59')
    this.Auth.GetSalesRpt1(this.storeId, frmdate, todate, this.CompanyId, this.sourceId).subscribe(
      (data: any) => {
        this.orderwiserpt = data
        console.log(this.orderwiserpt)
        this.TotalPayments = 0
        this.TotalSales = 0
        for (let i = 0; i < this.orderwiserpt.order.length; i++) {
          if (!this.orderwiserpt.order[i].itemJson) {
            console.log(this.orderwiserpt.order[i].invoiceNo, this.orderwiserpt.order[i].itemJson)
          }
          this.orderwiserpt.order[i].orderedDate = moment(
            this.orderwiserpt.order[i].orderedDate,
          ).format('LLL')
          this.orderwiserpt.order[i].itemnames = JSON.parse(this.orderwiserpt.order[i].itemJson)
            .map((x: any) => x.showname || x.title)
            .join(', ')

          if (this.limited_user) {
            this.orderwiserpt.order[i].paidAmount = 0
            this.orderwiserpt.order[i].billAmount = 0
            this.orderwiserpt.order[i].discAmount = 0
            this.orderwiserpt.order[i].totalTax = 0
          }
          this.orderwiserpt.order[i].cus_details = this.getcustomerDetails(
            this.orderwiserpt.order[i].orderType,
            JSON.parse(this.orderwiserpt.order[i].orderJson),
          )
          console.log(this.orderwiserpt.order[i].invoiceNo, this.orderwiserpt.order[i].cus_details)
          this.TotalPayments = this.TotalPayments + this.orderwiserpt.order[i].paidAmount
          this.TotalSales = this.TotalSales + this.orderwiserpt.order[i].billAmount
        }
        this.TotalSales = +this.TotalSales.toFixed(2)
        this.TotalPayments = +this.TotalPayments.toFixed(2)
        console.log(this.orderwiserpt.order)
        this.showloading = false
      },
    )
  }

  strMatch(string: string | any, substring: any) {
    return string.toLowerCase().includes(substring)
  }

  filter(order: { [x: string]: { toString: () => any } }) {
    const term = this.term.toLowerCase()
    if (term == '') return true
    var ismatching = false
    Object.keys(order).forEach(key => {
      if (typeof order[key] == 'string')
        this.strMatch(order[key], term) ? (ismatching = true) : null
      if (typeof order[key] == 'number')
        this.strMatch(order[key].toString(), term) ? (ismatching = true) : null
    })
    return ismatching
  }

  calculate() {
    this.TotalSales = 0
    this.TotalPayments = 0
    this.orderwiserpt.order
      .filter((x: any) => this.filter(x))
      .forEach((order: { billAmount: number; paidAmount: number }) => {
        this.TotalSales += order.billAmount
        this.TotalPayments += order.paidAmount
      })
  }

  storeOptions: { label: string; value: string }[] = []
  selectedValue: string

  GetStore() {
    this.Auth.getstore(this.CompanyId).subscribe((data: any) => {
      this.stores = data
      console.log(this.stores)
      var obj = {
        id: 0,
        name: 'All',
        parentStoreId: null,
        parentStore: null,
        isMainStore: false,
      }
      this.stores.push(obj)
      var response: any = data
      //this.All()

      if (response.status == 0) {
        this.status = 0
        this.errorMsg = response.msg
        console.log('HyperTech' + this.errorMsg)
      }

      this.storeOptions = this.stores.map((store: any) => ({
        label: store.name,
        value: store.id,
      }))
    })
  }

  sortsettings(field: any) {
    if (this.sortfield == field) {
      this.x = this.x * -1
      this.y = this.y * -1
    } else {
      this.sortfield = field
      this.x = -1
      this.y = 1
    }
  }

  compareFunc(a: any, b: any) {
    let avalue, bvalue, dataType
    avalue = a[this.sortfield]
    bvalue = b[this.sortfield]
    dataType = typeof avalue
    if (dataType == 'string' && !isNaN(Date.parse(avalue)) && isNaN(+avalue)) {
      avalue = new Date(avalue).getTime()
      bvalue = new Date(bvalue).getTime()
    }
    if (avalue < bvalue) return this.x
    else if (avalue > bvalue) return this.y
    else return 0
  }

  get sortData() {
    if (this.orderwiserpt) {
      return this.orderwiserpt.order.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          return this.compareFunc(a, b)
        },
      )
    } else {
      return []
    }
  }

  focusAutocomplete() {
    var xPathResult = document.evaluate(
      '//*[@id="maindiv"]/app-root/app-order-wise-sales-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input',
      document,
      null,
      undefined,
      null,
    )
    var element: any = null
    if (xPathResult) {
      element = xPathResult.iterateNext()
    }
    element?.focus()
  }
}

interface DataItem {
  id: string
  date: string
  store: string
  tax: number
  disc: number
  bill: number
  paid: number
  customer: string
}
