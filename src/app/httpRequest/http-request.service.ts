import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as url } from 'src/enviroment/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = url.apiUrl;
  
  constructor(private http: HttpClient) { }
  getRegistry(): Observable<any[]> {
    const url = this.baseUrl + 'get-compliance-report/';
    return this.http.get<any[]>(url);
  }

  dowload_outlook_attached(): Observable<any[]>{
    const url = this.baseUrl + 'download-outlook-attached/';
    return this.http.get<any[]>(url);
  }

  html_data_extraction(): Observable<any[]>{
    const url = this.baseUrl + 'html-data-extraction/';
    return this.http.get<any[]>(url);
  }
  get_hourly_compliace_report(): Observable<any[]>{
    const url = this.baseUrl + 'get-hourly-compliance-report/';
    return this.http.get<any[]>(url);
  }
}
