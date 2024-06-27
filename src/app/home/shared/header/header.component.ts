import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    userId: string | null = '';
    user: any = {}; // Objeto para almacenar la información del usuario
    userInitial: string = '';
    isEditMode: boolean = false; // Variable para controlar el modo de edición
    originalUser: any = {}; // Para almacenar la información original del usuario
  
    constructor(
      private userService: UserService, 
      private authService: AuthService, 
  
    ) { }
    ngAfterViewInit(): void {
      const sideBar: HTMLElement | null = document.querySelector('.sidebar');
      const searchBtn: HTMLButtonElement | null = document.querySelector('.content nav form .form-input button');
      const searchBtnIcon: HTMLElement | null = document.querySelector('.content nav form .form-input button .bx');
      const searchForm: HTMLElement | null = document.querySelector('.content nav form');
      const contentBody: HTMLElement | null = document.querySelector('.content');

      searchBtn?.addEventListener('click', function (e) {
          if (window.innerWidth < 576) {
              e.preventDefault();
              searchForm?.classList.toggle('show');
              if (searchForm?.classList.contains('show')) {
                  searchBtnIcon?.classList.replace('bx-search', 'bx-x');
              } else {
                  searchBtnIcon?.classList.replace('bx-x', 'bx-search');
              }
          }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 576) {
            searchBtnIcon?.classList.replace('bx-x', 'bx-search');
            searchForm?.classList.remove('show');
        }
      });

      const toggler: HTMLInputElement | null = document.getElementById('theme-toggle') as HTMLInputElement;

      toggler?.addEventListener('change', function () {
          if (this.checked) {
              document.body.classList.add('dark');
          } else {
              document.body.classList.remove('dark');
          }
      });
    }
    ngOnInit(): void {
      this.userId = this.authService.getUserId();
  
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(
          (response) => {
            this.user = response; // Asigna la respuesta del servicio al objeto de usuario
            this.userInitial = this.getUserInitial(this.user.username); // Obtiene la inicial del nombre para la imagen
            this.originalUser = { ...this.user }; // Guarda la información original del usuario
          },
          (error) => {
            console.error('Error al cargar información del usuario:', error);
          }
        );
      }
    }

    open(event : Event): void {
        event.preventDefault();
        this.userId = this.authService.getUserId(); 
        console.log('id:'+ this.userId);
        const modal: HTMLElement | null = document.querySelector('.modal');
        if (modal) {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      }

    
      // Método para obtener la inicial del nombre
      getUserInitial(name: string): string {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
      }
    
      // Método para alternar el modo de edición
      toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
      }
    
      // Método para guardar los cambios
      saveChanges(): void {
        if (this.userId) {
          this.userService.updateUser(this.userId , this.user).subscribe(
            (response) => {
              this.user = response;
              this.userInitial = this.getUserInitial(this.user.username); // Asegura que la inicial se actualice
              this.originalUser = { ...this.user }; // Actualiza la información original
              this.isEditMode = false;
              this.refreshperfil();
            },
            (error) => {
              console.error('Error al actualizar la información del usuario:', error);
            }
          );
        }
       
      }
    
      // Método para cancelar los cambios
      cancelChanges(): void {
        this.user = { ...this.originalUser }; // Restaura la información original del usuario
        this.isEditMode = false;
        this.refreshperfil();
      }
    
      close(event: Event): void {
        event.preventDefault();
        const modal: HTMLElement | null = document.querySelector('.modal');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      }
    
      private refreshperfil(): void {
        if (this.userId) {
          this.userService.getUserById(this.userId).subscribe(
            (response) => {
              this.user = response; // Asigna la respuesta del servicio al objeto de usuario
              this.userInitial = this.getUserInitial(this.user.username); // Obtiene la inicial del nombre para la imagen
            },
            (error) => {
              console.error('Error al cargar información del usuario:', error);
            }
          );
        }
      }
}
