// services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers });
  }
  getUsuariosByArea(areaId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(`${this.apiUrl}/area/${areaId}`, { headers });
  }
  updateUser(userId: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');

    return this.http.put<any>(`${this.apiUrl}/${userId}`, userData, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers });
  }
  // Implementa métodos para crear, actualizar y eliminar usuarios según sea necesario
}
