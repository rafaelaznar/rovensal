import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'https://api.ejemplo-pagina-web.com/'; 

  constructor(private http: HttpClient) {}

  sendForm(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/form`, data);
  }
}
