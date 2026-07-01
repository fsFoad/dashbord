import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private _currentDate: number;
  private _currentTime: string;

  constructor() {
    this.currentDate = 13990207;
    this._currentTime = '15:38:20';
  }

  printDiv(divID) {
    printDiv(divID);
  }


  get currentDate(): number {
    return this._currentDate;
  }

  get currentTime(): string {
    return this._currentTime;
  }

  set currentDate(value: number) {
    this._currentDate = value;
  }
}

function printDiv(divID) {
  debugger
  //Get the HTML of div
  const divElements = document.getElementById(divID).innerHTML;

  //Get the HTML of whole page
    const oldPage = document.body.innerHTML;
  //Reset the page's HTML with div's HTML only


    const WinPrint = window.open('', '', 'left=100,top=0,width=1200,height=12000,toolbar=0,scrollbars=0,status=0');
/*  document.body.innerHTML =
      '<html><head></head><body>' +
      divElements + '</body></html>';*/
  WinPrint.document.body.innerHTML =
      '<html><head></head><body>' +
      divElements + '</body></html>';
  /*    WinPrint.document.write(
        '<html><head></head><body>' +
        divElements + '</body></html>');*/
    WinPrint.document.close();
    WinPrint.focus();
  setTimeout(() => {
    WinPrint.print();
    WinPrint.close();
    //Restore orignal HTML
    // document.body.innerHTML = oldPage;
  },500)
  //Print Page
  //window.print();
  //Restore orignal HTML
  document.body.innerHTML = oldPage;
  // location.reload();
}
