import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { constants } from 'app/constants';
import { Router } from '@angular/router';


export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { id: 1, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { id: 1, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { id: 1, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { id: 1, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { id: 1, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { id: 1, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { id: 1, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { id: 1, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { id: 1, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  personList: any = [];
  editRow: boolean = false;

  constructor(private personValidator: ValidatorService, private http: HttpClient, private router: Router) { }

  displayedColumns = ['id', 'firstName', 'lastName', 'phoneNumber', 'address', 'shopName', 'emailAddress', 'status', 'actionsColumn'];

  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: TableDataSource<Person>;

  initializeCustomers() {
    this.http.get(constants.baseURL + '/customer')
      .subscribe(
        res => {
          this.personList = [];
          if (res) {
            this.personList = res;
            //console.log(JSON.stringify(this.personList));
          }
          this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
          this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
        },
        err => {
        }
      );
  }

  ngOnInit() {
    console.log('arrayData.map is not a function');
    this.personList = [];
    this.initializeCustomers();
  }

  searchCustomer(value) {
    if (value) {
      console.log('searching...');
      this.http.get(constants.baseURL + '/customer/' + value, { observe: 'response' })
        .subscribe(
          res => {
            this.personList = [];
            if (res.status == 200 && res.body) {
              this.personList = res.body;
              console.log(JSON.stringify(this.personList));
            }
            this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
            this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
          },
          err => {
          }
        );
    }
    else{
      this.ngOnInit();
    }
  }



  updateData() {
    this.router.navigate(['/customers']);
  }

  editRowAction(status) {
    if (status) {
      this.editRow = false;
      return true;
    }
    this.editRow = true;
    return true;
  }


  editCustomer(customer) {
    this.http.post(constants.baseURL + '/customer', customer.currentData, { responseType: 'text' })
      .subscribe(
        res => {
        },
        err => {
          customer.startEdit();
        }
      );
  }

  deleteCustomer(customerId) {
    this.http.delete(constants.baseURL + '/customer/' + customerId, { responseType: 'text', observe: 'response' })
      .subscribe(
        res => {
          if (res.status === 200) {
            this.initializeCustomers();
            this.updateData();
          }
        },
        err => {
        }
      );
  }

  generateLicenseDetailsForCustomer(customerId) {
    this.http.put(constants.baseURL + '/customer/licenses/' + customerId, '', { responseType: 'text', observe: 'response' })
      .subscribe(
        res => {
          if (res.status === 200) {
            console.log('data updated successfully');
          }
        },
        err => {
          console.log("err" + JSON.stringify(err));
        }
      );
  }
}