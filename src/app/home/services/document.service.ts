import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';
  userId :string = this.authService.getUserId();
    
  constructor(private http: HttpClient,private authService:AuthService) { }

  uploadDocument(formData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
  }

  getUserDocuments(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    console.log('user',this.userId);
    return this.http.get(`${this.apiUrl}/mydocuments`, { headers });
  }

  updateDocument(documentId: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.put(`${this.apiUrl}/${documentId}`, updatedData, { headers });
  }

  deleteDocument(documentId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.delete(`${this.apiUrl}/${documentId}`, { headers });
  }
  getByIdDocument(documentId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(`${this.apiUrl}/${documentId}`, { headers });
  }

  getDataDocument(documentId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(`${this.apiUrl}/data/${documentId}`, { headers , responseType: 'json' });
  }
  searchDocumentsByName(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const params = new HttpParams().set('name', name);
    return this.http.get(`${this.apiUrl}/searchByName`, { headers, params });
  }

  searchDocumentsByType(type: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const params = new HttpParams().set('type', type);
    return this.http.get(`${this.apiUrl}/searchByType`, { headers, params });
  }

  searchDocumentsByDate(date: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.apiUrl}/searchByDate`, { headers, params });
  }

  getDocumentsSharedByUser(): Observable<any[]> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any[]>(`${this.apiUrl}/shared-by-user`,{ headers});
  }

  getDocumentsSharedWithUser(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any[]>(`${this.apiUrl}/sharedByWithMe/${this.userId}`,{ headers});
  }

  shareDocument(documentId: string, userIdToShareWith: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.post<any>(`${this.apiUrl}/share`, { documentId, userIdToShareWith },{ headers });
  }

  unshareDocument(documentId: string, userIdToRemove: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.post<any>(`${this.apiUrl}/unshare`, { documentId, userIdToRemove },{ headers });
  }


}
