import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  //  genders = ["Male","Female","Other"]

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNo', 'gender', 'date', 'address', 'Edit', 'Delete'];

  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phoneNo: any;
  gender: any;
  dob: any;
  valbutton = "Save";
  address: any;
  data: userModel[];

  usersave: userModel;

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  constructor(private service: RegistrationService, private snackBar: MatSnackBar) {
  }
  Repdata;
  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getAllUsers() {
    this.service.getUser(success => {
      this.valbutton = "Save";
      this.data = success.body;
      this.Repdata = success.body;
      this.dataSource = new MatTableDataSource(this.Repdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.openSnackBar(error.error.message, null);
    })
  }
  onSave(event) {
    let d = this.format(this.dob);
    event.date = d;
    this.usersave = event;

    if (this.valbutton == 'Save') {
      this.service.onSave(this.usersave, success => {
        this.valbutton = "Save";
        this.getAllUsers();
        this.openSnackBar("Sucessfully Added", null);
      }, error => {
        this.openSnackBar(error.error.message, null);
      });
    } else {
      this.update(this.usersave);
    }

  }

  delete(id) {
    this.service.delete(id, success => {
      this.getAllUsers();
      this.openSnackBar("Sucessfully Deleted", null);
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  edit(data) {

    this.valbutton = "Update";
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phoneNo = data.phoneNo;
    this.gender = data.gender;
    this.dob = data.dob;
    this.address = data.address;

  }
  update(data) {

    this.service.update(data, success => {
      this.openSnackBar("Succesfully Updated", null);
      this.getAllUsers();
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }
  format(date: Date) {

    let dt = date.toString();
    if (dt.length > 10) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return year + '-' + this._to2digit(month) + '-' + this._to2digit(day);
    } else {
      return date;
    }

  }
  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


export interface userModel {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  gender: string;
  dob: Date;
  address: string;
}
