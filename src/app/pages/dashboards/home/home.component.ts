import  icPhone  from '@iconify/icons-ic/twotone-phone';
import { MatSelectChange } from '@angular/material/select';
import { aioTableLabels } from './../../../../static-data/aio-table-data';
import { Customer } from './../../apps/aio-table/interfaces/customer.model';
import { Component, OnInit } from "@angular/core";
import { Observable, of, ReplaySubject } from 'rxjs';
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: "BG452515",
    name: "10 min ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
];

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  walletNumber: number;
  walFee: number;
  amountReceived: number;
  status: string;
}

@Component({
  selector: "vex-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  labels = aioTableLabels;

  icPhone = icPhone
  
  

  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];




  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "Wallet number",
    "Pal Fee",
    "Amount received",
    "Status",
  ];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {
    
  }


  
}
