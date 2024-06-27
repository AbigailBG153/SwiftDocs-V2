import { DocumentsComponent } from './modules/documents/documents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminComponent } from './modules/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'documents', component: DocumentsComponent },
      { path: 'admin', component : AdminComponent},
    ]
   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
