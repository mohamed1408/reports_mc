import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { BehaviorSubject, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = 'https://localhost:44373/api/'
  base_url2 = 'https://biz1mc.azurewebsites.net/api/'
  base_url1 = 'https://apbiz1retail.azurewebsites.net/api/'
  base_url3 = 'https://retailpos.azurewebsites.net/api/'

  constructor(private http: HttpClient) {}

  public storeid: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  public showdropdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  public companies: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([])

  public user: BehaviorSubject<any> = new BehaviorSubject<any>({})

  public selectedcompanies: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([])

  public companyid: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  public limited_user: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  toFormData(formValue) {
    const formData = new FormData()

    for (const key of Object.keys(formValue)) {
      const value = formValue[key]
      formData.append(key, value)
    }
    return formData
  }

  getusers(pin, companyid) {
    return this.http.get(this.base_url1 + `Login/getstoreusers?pin=${pin}&companyId=${companyid}`)
  }

  getstore(CompanyId) {
    return this.http.get(this.base_url1 + 'Store/Get?CompanyId=' + CompanyId)
  }

  unlockscreen(Pin, CompanyId) {
    return this.http.get(this.base_url1 + 'Login/pinlogin?pin=' + Pin + '&companyid=' + CompanyId)
  }

  registration(payload) {
    return this.http.post(this.base_url1 + 'Login/Register', payload)
  }

  getcompanies() {
    return this.http.get(this.base_url1 + 'Mc/Getcompanies')
  }

  getusercompanies(userid: number) {
    return this.http.get(this.base_url1 + `Mc/GetUserCompanies?userid=${userid}`)
  }

  GetMultiStorewiseRpt(frmdate: string, todate: string, companykey: string) {
    return this.http.get(
      this.base_url1 +
        'Mc/GetMultiCompanyStoreRpt?frmdate=' +
        frmdate +
        '&todate=' +
        todate +
        '&companykey=' +
        companykey,
    )
  }

  getdashboardbycompany(fromdate: string, totdate: string, companyid: number, storeid: number) {
    return this.http.get(
      this.base_url1 +
        `Mc/Post?fromDate=${fromdate}&toDate=${totdate}&compId=${companyid}&storeId=${storeid}`,
    )
  }

  GetSalesRpt1(
    Id: number,
    frmdate: string,
    todate: string,
    compId: number,
    sourceId: number,
    cancelOrder: number = 0,
  ) {
    return this.http.get(
      this.base_url1 +
        'Mc/OrdWiseSalesRpt?frmdate=' +
        frmdate +
        '&todate=' +
        todate +
        '&Id=' +
        Id +
        '&compId=' +
        compId +
        '&sourceId=' +
        sourceId +
        '&cancelOrder=' +
        cancelOrder,
    )
  }

  GetSalesRpt6(
    categoryId: string,
    frmdate: string,
    todate: string,
    CompanyId: number,
    sourceId: number,
    productId: string,
    tagId: number,
  ) {
    return this.http.get(
      this.base_url1 +
        'Mc/GetStoreRpt?frmdate=' +
        frmdate +
        '&todate=' +
        todate +
        '&categoryId=' +
        categoryId +
        '&companyId=' +
        CompanyId +
        '&sourceId=' +
        sourceId +
        '&productId=' +
        productId +
        '&tagId=' +
        tagId,
    )
  }

  getcat(CompanyId: number) {
    return this.http.get(this.base_url1 + 'Mc/Index?CompanyId=' + CompanyId)
  }

  // getTag(CompanyId: number) {
  //   return this.http.get(
  //     this.base_url + 'TagMapping/GetTag?compId=' + CompanyId
  //   );
  // }

  GetOptions(companyid: number) {
    return this.http.get(this.base_url1 + 'Mc/GetOptions?companyid=' + companyid)
  }

  GetproductRpt(
    storeId: number,
    frmdate: string,
    todate: string,
    compId: number,
    categoryId: number,
    sourceId: number,
  ) {
    return this.http.get(
      this.base_url1 +
        'Mc/ProdcutWiseRpt?frmdate=' +
        frmdate +
        '&todate=' +
        todate +
        '&storeId=' +
        storeId +
        '&compId=' +
        compId +
        '&categoryId=' +
        categoryId +
        '&sourceId=' +
        sourceId,
    )
  }

  GetRptBiz1Pos(date: string, gstno: string, category: string, tax: string) {
    return this.http.get(
      this.base_url3 +
        'Login/GetReport?date=' +
        date +
        '&gstno=' +
        gstno +
        '&category=' +
        category +
        '&tax=' +
        tax,
    )
  }

  GetBiz1PosData(date, companyId) {
    return this.http.get(
      this.base_url1 + 'PaymentType/GetBizPosData?date=' + date + '&companyId=' + companyId,
    )
  }

  GetBizPosCompanies() {
    return this.http.get(this.base_url1 + 'PaymentType/GetBiz1PosCompanies')
  }

  SaveBiz1PosData(payload) {
    return this.http.post(this.base_url1 + 'PaymentType/SavePOSdata', payload)
  }

  prdgrpdata(date: string, todate: string, companyid: number) {
    return this.http.get(
      this.base_url2 +
        'Home/ProdGrpData?date=' +
        date +
        '&todate=' +
        todate +
        '&companyid=' +
        companyid,
    )
  }

  prdwisesalerpt(fromdate: string, todate: string, gst: string, companyid: number) {
    return this.http.get(
      this.base_url2 +
        'Home/ProductWiseSalesRpt?fromdate=' +
        fromdate +
        '&todate=' +
        todate +
        '&gst=' +
        gst +
        '&companyid=' +
        companyid,
    )
  }

  ordwisesalerpt(fromdate: string, todate: string, gst: string, companyid: number) {
    return this.http.get(
      this.base_url2 +
        'Home/OrdWiseSalesRpt?fromdate=' +
        fromdate +
        '&todate=' +
        todate +
        '&gst=' +
        gst +
        '&companyid=' +
        companyid,
    )
  }

  GetComStore(GstNo: string) {
    return this.http.get(this.base_url2 + 'Home/GetComStore?GstNo=' + GstNo)
  }

  gettestdata(date: string, StoreId: number) {
    return this.http.get(this.base_url2 + 'Home/GetTestP?date=' + date + '&StoreId=' + StoreId)
  }

  getgstproducts(gstno: string) {
    return this.http.get(this.base_url2 + 'Menu/gstproducts?gstno=' + gstno)
  }

  GetExpansionPlan() {
    return this.http.get(this.base_url2 + 'Home/GetExpansionPlan')
  }

  GetMarektingInfo() {
    return this.http.get(this.base_url2 + 'Home/GetMarektingInfo')
  }

  GetStaffTraining() {
    return this.http.get(this.base_url2 + 'Home/GetStaffTraining')
  }

  SaveCatMap(map) {
    return this.http.post(this.base_url2 + 'Home/SaveCatMaps', map)
  }

  // getSaleProducts(companyid: number) {
  //   return this.http.get(this.base_url + 'Sale/GetSaleProducts?companyid=' + companyid)
  // }
}
