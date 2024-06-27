import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de tu API Node.js

  constructor(private http: HttpClient) {
    // Al inicializar el servicio, verificar si hay un ID de usuario en localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    }
  }

  private userId: string = '';

  register(username: string, password: string, area: string, branch: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { username, password, area, branch };
    return this.http.post(url, body);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { username, password };
    return this.http.post(url, body).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.userId = this.parseUserIdFromToken(response.token);
          localStorage.setItem('userId', this.userId);
        }
        return response;
      })
    );
  }

  private parseUserIdFromToken(token: string): string {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.id;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getUserId(): string {
    return this.userId;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Limpiar el ID del usuario al cerrar sesión
    this.userId = ''; // También limpiar la variable interna del servicio
  }

  getProtected(): Observable<any> {
    const url = `${this.apiUrl}/protected`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(url, { headers });
  }
}
