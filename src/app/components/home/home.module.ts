import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserService } from '../../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckboxModule } from 'primeng/checkbox';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { DialogModule } from 'primeng/dialog';
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ProfileService } from '../../services/profile/profile.service';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    HomeComponent,
    EditarPerfilComponent,
    AdicionarUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    TableModule, 
    ToastModule, 
    TagModule, 
    DropdownModule, 
    ButtonModule, 
    InputTextModule,
    FormsModule,
    DialogModule,
    CheckboxModule,
    CardModule,
  ],
  providers:[UserService, ProfileService, MessageService]
})
export class HomeModule { }
