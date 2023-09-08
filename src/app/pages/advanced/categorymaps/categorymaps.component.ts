import { Component, OnInit, ViewChild } from '@angular/core'
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { Observable, Subject, merge } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-categorymaps',
  templateUrl: './categorymaps.component.html',
  styleUrls: ['./categorymaps.component.scss'],
})
export class CategorymapsComponent implements OnInit {
  selectGST: string
  companies: any[] = []
  companyid: number = 0
  products: any[] = []
  categories: any[] = []
  menu: any = {}
  // categoryid: number

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
    } else if (this.selectGST == '4238') {
      return '33CDQPS7893Q1Z4'
    } else {
      return 'ADMIN'
    }
  }

  getproducts() {
    this.auth.GetComStore(this.getGSTNumber()).subscribe(cdata => {
      this.companies = cdata['report']
      this.companyid = this.companies[0].CompanyId
      this.auth.getgstproducts(this.getGSTNumber()).subscribe(data => {
        // console.log(data)
        this.menu = data
        this.setprodcat()
      })
    })
  }
  changedids = []
  setprodcat() {
    this.products = this.menu['products'].filter(x => x.CompanyId == this.companyid)
    this.categories = this.menu['categories'].filter(x => x.CompanyId == this.companyid)
    this.products.forEach(x => {
      x.Category = this.categories.filter(y => y.Id == x.CategoryId)[0].Description
    })
    this.collectionSize = this.products.length
  }

  refershlist() {
    this.changedids = this.products.filter(x => x.dirty).map(x => x.Id)
  }
  //autocomplete

  model: any

  @ViewChild('instance', { static: true }) instance: NgbTypeahead
  focus$ = new Subject<string>()
  click$ = new Subject<string>()

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged())
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()))
    const inputFocus$ = this.focus$

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.categories
          : this.categories.filter(
              v => v.Description.toLowerCase().indexOf(term.toLowerCase()) > -1,
            )
        ).slice(0, 10),
      ),
    )
  }

  page = 1
  pageSize = 25
  collectionSize = 0

  get prods() {
    return this.products.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    )
  }

  savemaps() {
    const maps = this.products.filter(x => x.dirty).map(x => [x.Id, x.CategoryId])
    console.log(maps)
    this.auth.SaveCatMap(maps).subscribe(data => {
      console.log(data)
      this.getproducts()
    })
  }
}
