import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/log`, transaction);
  }
}
