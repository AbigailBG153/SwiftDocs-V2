import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AdminComponent } from './modules/admin/admin.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { BodyComponent } from './shared/body/body.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    DocumentsComponent,
    BodyComponent,
    HeaderComponent,
    SidebarComponent,
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
  ]
})
export class HomeModule { }
