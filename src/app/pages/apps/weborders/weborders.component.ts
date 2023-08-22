import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core'

declare function setHeightWidth(): any
declare const feather: any, $: any

@Component({
  selector: 'app-weborders',
  templateUrl: './weborders.component.html',
  styleUrls: ['./weborders.component.css'],
})
export class WebordersComponent implements OnInit {
  @ViewChild('receiptContent') receiptContent!: ElementRef
  companyid: number = 0
  companies: any = []
  stores: any = []
  startdate: string = ''
  enddate: string = ''
  mode: string = 'list'
  sections = {
    customer: {
      collapse: false,
    },
    order: {
      collapse: true,
    },
  }

  page_loading: boolean = false

  constructor() {}

  ngOnInit(): void {}

  printReceipt(): void {
    const receiptContent = this.receiptContent.nativeElement.innerHTML
    const popupWindow = window.open('', '_blank', 'width=270px,height=20px')
    if (popupWindow) {
      popupWindow.document.open()
      popupWindow.document.write(` 
        <html> 
          <head> 
            <!-- Add any required stylesheets or other head content --> 
          </head> 
          <body> 
            ${receiptContent} 
          </body> 
        </html> 
      `)
      popupWindow.document.close()
      popupWindow.print()
    } else {
      console.error('Failed to open the print window.')
    }
  }
}
