import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })

export class dbSourceService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    async PostService(obj:any) {
        Date.prototype.toJSON = function () {
            return moment(this).format("YYYY-MM-DD");
        }
        var body = JSON.stringify(obj);
        return await this.http.post(environment.apibaseUrl + "Source/PostSource", body, this.httpOptions).toPromise
            ().then(
                res => {
                    return res;
                },
                msg => {
                    return null;
                }
            );
    }
    async GetService(obj: any) {
        Date.prototype.toJSON = function () {
            return moment(this).format("YYYY-MM-DD");
        }
        var body = JSON.stringify(obj);
        return await this.http.post(environment.apibaseUrl + "Source/GetSource", body, this.httpOptions).toPromise
            ().then(
                res => {
                    return res;
                },
                msg => {
                    return null;
                }
            );
    }
}