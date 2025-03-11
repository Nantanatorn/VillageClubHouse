import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5203/api/User/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    console.log('📡 Sending login request:', body); //  Debug log
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  saveToken(token: string) {
    console.log("🔑 Saving Token:", token); // ✅ Debug เช็ค Token
    if (token) {
      localStorage.setItem('token', token);
      console.log("✅ Token saved successfully");
    } else {
      console.error("❌ No token received!");
    }
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); //  ลบ Token เมื่อ Logout
  }
}
