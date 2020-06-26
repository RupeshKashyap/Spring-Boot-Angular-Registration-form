import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl = '//localhost:8080/registration';
  constructor(private http: HttpClient) { }


  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  onSave(data, successCallBack, errorCallBack) {
    let url = this.baseUrl;
    this.doPostWithResponse(url, data,
      response => { successCallBack(response) },
      error => { errorCallBack(error) });
  }

  getUser(successCallBack, errorCallBack) {
    let url = this.baseUrl;

    this.doGetWithResponse(url,
      response => { successCallBack(response) },
      error => { errorCallBack(error) });
  }

  delete(id, successCallBack, errorCallBack) {
    let url = this.baseUrl + "/" + id;
    this.doDelete(url,
      response => { successCallBack(response) },
      error => { errorCallBack(error) });
  }

  update(data, successCallBack, errorCallBack) {
    let url = this.baseUrl;
    this.doPutWithResponse(url, data,
      response => { successCallBack(response) },
      error => { errorCallBack(error) });
  }




  //Get with response  
  doGetWithResponse(url, successCallBack, errorCallBack) {
    this.http.get(url, { headers: this.headers, observe: 'response' }).subscribe(response => {
      successCallBack(response);
    }, error => {
      errorCallBack(error);
    });
  }


  //Post with response
  doPostWithResponse(url, data, successCallBack, errorCallBack) {
    this.http.post(url, JSON.stringify(data), { headers: this.headers, observe: 'response' }).subscribe(response => {
      successCallBack(response);
    }, error => {
      errorCallBack(error);
    });

  }

  //Delete with response
  doDelete(url, successCallBack, errorCallBack) {
    this.http.delete(url, { headers: this.headers, observe: 'response' }).subscribe(response => {
      successCallBack(response);
    }, error => {
      errorCallBack(error);
    });

  }

  //Put with response
  doPutWithResponse(url, data, successCallBack, errorCallBack) {
    this.http.put(url, JSON.stringify(data), { headers: this.headers, observe: 'response' }).subscribe(response => {
      successCallBack(response);
    }, error => {
      errorCallBack(error);
    });

  }

}
