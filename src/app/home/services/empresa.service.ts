import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/empresa'; // URL de tu API Node.js

  constructor(private http: HttpClient) { }

  // Método para obtener todas las áreas
  getAreas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/areas`;
    return this.http.get<any[]>(url,{ headers });
  }

  // Método para obtener todas las sucursales
  getSucursales(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/branches`;
    return this.http.get<any[]>(url,{ headers });
  }
  getAreasByBranch(branchId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(`${this.apiUrl}/branch/${branchId}`, { headers });
  }
  // Método para crear un nueva área
  crearArea(nombre: string, idSucursal: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/areas`;
    const body = { name: nombre, branch: idSucursal };
    return this.http.post<any>(url, body,{ headers });
  }

  // Método para actualizar un área existente
  actualizarArea(id: string, nombre: string, idSucursal: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/areas/${id}`;
    const body = { name: nombre, branch: idSucursal };
    return this.http.put<any>(url, body,{ headers });
  }

  // Método para eliminar un área existente
  eliminarArea(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/areas/${id}`;
    return this.http.delete<any>(url,{ headers });
  }

  // Método para crear una nueva sucursal
  crearSucursal(nombre: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/branches`;
    const body = { name: nombre };
    return this.http.post<any>(url, body,{ headers });
  }

  // Método para actualizar una sucursal existente
  actualizarSucursal(id: string, nombre: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/branches/${id}`;
    const body = { name: nombre };
    return this.http.put<any>(url, body,{ headers });
  }

  // Método para eliminar una sucursal existente
  eliminarSucursal(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/branches/${id}`;
    return this.http.delete<any>(url,{ headers });
  }
   // Método para obtener un área por ID
   getAreaById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/areas/${id}`;
    return this.http.get<any>(url, { headers });
  }

  // Método para obtener una sucursal por ID
  getBranchById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.apiUrl}/branches/${id}`;
    return this.http.get<any>(url, { headers });
  }

}
