import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedFile: File | null = null;
  formData : any[] = [];
  name : string = '';
  tipo : string = '';
  size : number =0;

  documents: any[] = [];
  users: any[] = [];
  selectedUser: string = '';
  sharedByMe: any[] = [];
  sharedWithMe: any[] = [];
  uploadby: string = '';
  constructor(private documentService: DocumentService, private userService: UserService) { }
 
  ngOnInit(): void {
    this.loadDocuments();
    this.loadUsers();
    this.loadSharedWithMe();
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.name = this.selectedFile.name;
    this.tipo = this.selectedFile.type;
    this.size = this.selectedFile.size;
    console.log(this.selectedFile);
    this.onUpload();
    this.loadDocuments();
    this.loadUsers();
    this.loadSharedWithMe();
  }

  onUpload(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      console.log('File content as ArrayBuffer:',reader);
      reader.readAsArrayBuffer(this.selectedFile);

      reader.onload = () => {
        const fileData = reader.result as ArrayBuffer; // Obtiene los datos binarios del archivo como ArrayBuffer
        console.log('File content',fileData);

        if (fileData) {
          const extension = this.tipo.split('/').pop();
          const formData = {
            filename: this.name ,
            tipo: this.tipo,
            size: this.size,
            fileData: this.arrayBufferToBase64(fileData)
          };

          this.documentService.uploadDocument(formData).subscribe(response => {
            console.log('Document uploaded successfully', response);
          }, error => {
            console.error('Error uploading document', error);
          });
        }
      };
    }
  }
  
  // Función para convertir ArrayBuffer a base64
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }
  close(event: Event): void {
    event.preventDefault();
    const modal: HTMLElement | null = document.querySelector('.modal-compartido');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  open(event: Event, tipo: string): void {
    event.preventDefault();
    const modal: HTMLElement | null = document.querySelector('.modal-compartido');
    if (modal) {
      modal.classList.add(tipo); // Agrega la clase según el tipo (crear o editar)
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  loadDocuments(): void {
    this.documentService.getUserDocuments().subscribe(
      (response: any[]) => {
        this.documents = response;
        this.documents.forEach(doc => {
          doc.showShareSelect = false; // Inicialmente ocultamos el select de compartir
          doc.selectedUser = ''; // Inicializamos el usuario seleccionado para compartir
          this.userService.getUserById(doc.uploadedBy).subscribe(
            (user: any) => {
              doc.nombre_user = user.username;
            },
            (error) => {
              console.error(`Error fetching user by ID ${doc.creadoPor}:`, error);
            }
          );
        });
      },
      error => {
        console.error('Error loading documents', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response;
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  viewDocument(documentId: string): void {
    this.documentService.getDataDocument(documentId).subscribe(
      (response: any) => {
        const blob = this.base64ToBlob(response.base64Data, response.mimeType);
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Error fetching document', error);
      }
    );
  }

  shareDocument(documentId: string, userIdToShareWith: string): void {
    this.documentService.shareDocument(documentId, userIdToShareWith).subscribe(
      (response: any) => {
        console.log('Document shared successfully', response);
        this.loadDocuments(); 
        
      },
      error => {
        console.error('Error sharing document', error);
      }
    );
  }

  toggleShareSelect(document: any): void {
    // Toggle para mostrar u ocultar el select de compartir
    document.showShareSelect = !document.showShareSelect;
  }

  private base64ToBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }


  loadSharedWithMe(): void {
    this.documentService.getDocumentsSharedWithUser().subscribe(
      (response: any[]) => {
        this.sharedWithMe = response;
        
        console.log('Documentos compartidos conmigo:', this.sharedWithMe);
      },
      error => {
        console.error('Error al cargar documentos compartidos conmigo', error);
      }
    );
  }

  
}
