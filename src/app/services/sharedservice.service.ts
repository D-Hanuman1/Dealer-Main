import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { seletctionModel } from 'app/models/selectionCommon.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  private seletctionModel:seletctionModel
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private messageSource_back = new BehaviorSubject('');
  currentMessage_back = this.messageSource_back.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  async GetSelectionDetails(Condition: string, DealerId: number,FilterId:number,FilterId2:number) {
    this.seletctionModel = {
      Condition: Condition,
      DealerId: DealerId,
      FilterId:FilterId,
      FilterId2:FilterId2
    }
    var body = JSON.stringify(this.seletctionModel);
    return await this.http.post(environment.apibaseUrl + "DropdownSelection/GetSelection", body, this.httpOptions).toPromise
      ().then(
        res => {
          return res;
        },
        msg => {
          return null;
        }
      );
  }
  sharingData(newData: any) {
    if (newData == null) {
      this.messageSource.isStopped = true;
    }
    else {
      this.messageSource.isStopped = false;
      this.messageSource.next(newData);
    }
  }

  sharingData_back(newData: any) {
    if (newData == null) {
      this.messageSource_back.isStopped = true;
    }
    else {
      this.messageSource_back.isStopped = false;
      this.messageSource_back.next(newData);
    }
  }


  public OnlyNumber(event) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46, 9,17];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }


  DefActiveDropdown = [{
    id: false,
    name: 'False'
  },
  {
    id: true,
    name: 'True'
  },
  {
    id: null,
    name: 'ALL'
  }]

  DefEmailDropdown = [{
    id: false,
    name: 'False'
  },
  {
    id: true,
    name: 'True'
  },
  {
    id: null,
    name: 'ALL'
  }]
}
