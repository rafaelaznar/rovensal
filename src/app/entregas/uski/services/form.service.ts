import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Form } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private baseUrl = 'https://api.ejemplo.com/';

  constructor(private http: HttpClient) {}

  sendForm(data: Form): Observable<Form> {
    return this.http.post<Form>(`${this.baseUrl}post-form`, data).pipe(
      catchError((err) => {
        console.error('Error API:', err);
        return throwError(() => err);
      })
    );
  }
}
