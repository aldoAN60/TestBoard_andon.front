import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as url } from 'src/enviroment/enviroment';
import { Observable } from 'rxjs';

/**
 * Servicio para realizar solicitudes HTTP a la API.
 * @remarks
 * Este servicio utiliza Angular HttpClient para realizar solicitudes HTTP.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = url.apiUrl;
  
  constructor(private http: HttpClient) { }

  /**
   * Obtiene el informe de cumplimiento desde la API.
   * @returns Un Observable con el informe de cumplimiento.
   */
  getRegistry(): Observable<any[]> {
    const url = this.baseUrl + 'get-compliance-report/';
    return this.http.get<any[]>(url);
  }

  /**
   * Descarga archivos adjuntos de Outlook a través de la API.
   * @returns Un Observable con los datos descargados.
   */
  dowload_outlook_attached(): Observable<any[]>{
    const url = this.baseUrl + 'download-outlook-attached/';
    return this.http.get<any[]>(url);
  }

  /**
   * Extrae datos HTML desde la API.
   * @returns Un Observable con los datos HTML extraídos.
   */
  html_data_extraction(): Observable<any[]>{
    const url = this.baseUrl + 'html-data-extraction/';
    return this.http.get<any[]>(url);
  }

  /**
   * Obtiene el informe de cumplimiento por hora desde la API.
   * @returns Un Observable con el informe de cumplimiento por hora.
   */
  get_hourly_compliace_report(): Observable<any[]>{
    const url = this.baseUrl + 'get-hourly-compliance-report/';
    return this.http.get<any[]>(url);
  }
}
