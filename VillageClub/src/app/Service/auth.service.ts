import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5203/api/User/login';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    console.log('📡 Sending login request:', body);
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) { // ✅ ตรวจสอบว่าเป็น Client Side หรือไม่
      console.log("🔑 Saving Token:", token);
      localStorage.setItem('token', token);
      console.log("✅ Token saved successfully");
    } else {
      console.warn("⚠️ Cannot use localStorage on Server-Side");
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // ✅ Decode JWT
        console.log("🔍 Decoded Token Payload:", payload);

        // ✅ ค้นหาค่า Role จาก Claim Namespace
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (error) {
        console.error("❌ Error decoding token:", error);
        return null;
    }
}

}
