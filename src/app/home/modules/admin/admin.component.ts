import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService } from '../../../auth/service/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  areas: any[] = [];
  sucursales: any[] = [];
  users: any[] = [];
  usuariosPorArea: any[] = [];
  areasPorSucursal: any[] = [];
  nuevaAreaNombre: string = '';
  selectedSucursalId: string = '';
  nuevoNombreSucursal: string = '';
  nuevoUsuarioUsername: string = '';
  nuevoUsuarioPassword: string = '';
  selectedAreaId: string = '';
  selectedBranchId: string = '';

  constructor(private empresaService: EmpresaService,private authService:AuthService , private userService:UserService) { }

  ngOnInit(): void {
    this.loadAreas();
    this.loadSucursales();
    this.loadUsers();
  }

  loadAreas(): void {
    this.empresaService.getAreas().subscribe(
      response => this.areas = response,
      error => console.error('Error al cargar áreas', error)
    );
  }

  loadSucursales(): void {
    this.empresaService.getSucursales().subscribe(
      response => this.sucursales = response,
      error => console.error('Error al cargar sucursales', error)
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response;
        console.log(this.users);
      },
      error => {
        console.error('Error loading users', error);
      }
    );
   
  }
  getAreaName(id:string) {
    console.log(id);
    
  }
  getBranchName(id : string){
    this.empresaService.getAreaById(id).subscribe(
      (response : any) => {
        console.log(response.name[0]);
        
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }


  loadUsuariosPorArea(areaId: string): void {
    this.userService.getUsuariosByArea(areaId).subscribe(
      response => this.usuariosPorArea = response,
      error => console.error('Error al cargar usuarios por área', error)
    );
  }

  loadAreasPorSucursal(branchId: string): void {
    this.empresaService.getAreasByBranch(branchId).subscribe(
      response => this.areasPorSucursal = response,
      error => console.error('Error al cargar áreas por sucursal', error)
    );
  }

  crearArea(): void {
    this.empresaService.crearArea(this.nuevaAreaNombre, this.selectedSucursalId).subscribe(
      response => {
        this.areas.push(response);
        this.nuevaAreaNombre = '';
        this.selectedSucursalId = '';
      },
      error => console.error('Error al crear área', error)
    );
  }

  actualizarArea(id: string, nuevoNombre: string): void {
    this.empresaService.actualizarArea(id, nuevoNombre, this.selectedSucursalId).subscribe(
      response => {
        const index = this.areas.findIndex(area => area._id === id);
        if (index !== -1) this.areas[index] = response;
      },
      error => console.error('Error al actualizar área', error)
    );
  }

  eliminarArea(id: string): void {
    this.empresaService.eliminarArea(id).subscribe(
      response => this.areas = this.areas.filter(area => area._id !== id),
      error => console.error('Error al eliminar área', error)
    );
  }

  crearSucursal(): void {
    this.empresaService.crearSucursal(this.nuevoNombreSucursal).subscribe(
      response => {
        this.sucursales.push(response);
        this.nuevoNombreSucursal = '';
      },
      error => console.error('Error al crear sucursal', error)
    );
  }

  actualizarSucursal(id: string, nuevoNombre: string): void {
    this.empresaService.actualizarSucursal(id, nuevoNombre).subscribe(
      response => {
        const index = this.sucursales.findIndex(sucursal => sucursal._id === id);
        if (index !== -1) this.sucursales[index] = response;
      },
      error => console.error('Error al actualizar sucursal', error)
    );
  }

  eliminarSucursal(id: string): void {
    this.empresaService.eliminarSucursal(id).subscribe(
      response => this.sucursales = this.sucursales.filter(sucursal => sucursal._id !== id),
      error => console.error('Error al eliminar sucursal', error)
    );
  }

  registrarUsuario(): void {
    this.authService.register(this.nuevoUsuarioUsername, this.nuevoUsuarioPassword, this.selectedAreaId, this.selectedBranchId).subscribe(
      response => {
        this.nuevoUsuarioUsername = '';
        this.nuevoUsuarioPassword = '';
        this.selectedAreaId = '';
        this.selectedBranchId = '';
        alert('Usuario registrado con éxito');
        this.loadUsers(); // Refresh the user list after registration
      },
      error => console.error('Error al registrar usuario', error)
    );
  }
}
