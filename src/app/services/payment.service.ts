import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../types/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private endpoint = 'https://localhost:7259/api/Payments';

  constructor(private http: HttpClient) { }

  getCards(): Observable<any[]> {
    let id=Number(sessionStorage.getItem('UserId'));
    
    return this.http.get<any[]>(`${this.endpoint}/${id}`)
      // .pipe(
      //   catchError(this.handleError)
      // );
  }

  delete(id:number){
    return this.http.delete(`https://localhost:7259/api/Payments/${id}`);
  }

  saveCard(form: any): Observable<any> {
    return this.http.post<any>('https://localhost:7259/api/Payments', form);
  }

  editCard(form:any){
    return this.http.put<any>(`https://localhost:7259/api/Payments`, form);
  }

}
