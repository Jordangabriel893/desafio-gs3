import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MessageService, SelectItem } from 'primeng/api';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnDestroy {
  users!: any[];
  isDialogVisible: boolean = false;
  isDialogCreateUserVisible: boolean = false;
  isDialogEditUserVisible: boolean = false;
  statuses!: SelectItem[];
  data: User | undefined;
  canViewAllProfiles: boolean = false;
  canEditUserProfiles: boolean = false;
  canEditProfiles: boolean = false;
  canCreateProfiles:boolean = false;
  private subscriptions: Subscription[] = [];
  
  constructor(private userService: UserService, private profileService: ProfileService, private messageService: MessageService) {}

  ngOnInit() {
    this.getPermissions();
    this.getUsers();
    
  }

  openDialog(typeDialog: 'create' | 'edit' | 'editProfile', data?: User) {
    switch (typeDialog) {
      case 'create':
        this.isDialogCreateUserVisible = true;
        break;

      case 'edit':
        this.isDialogEditUserVisible = true;
        this.data = data;
        break;

      case 'editProfile':
        this.isDialogVisible = true;
        break;
    }

  }

  onDialogClose() {
    this.isDialogVisible = false;
    this.isDialogCreateUserVisible = false;
    this.isDialogEditUserVisible = false;
  }

  onDialogSave(data: any, typeDialog: 'create' | 'edit' | 'editProfile') {

    switch (typeDialog) {
      case 'create':
        this.createUser(data);
        break;

      case 'edit':
        this.editUser(data);
        break;

      case 'editProfile':
        this.editProfile(data);
        break;
    }
    this.isDialogCreateUserVisible = false;
    this.isDialogEditUserVisible = false;
    this.isDialogVisible = false;
  }

  getUsers(){
    this.subscriptions.push( this.userService.getUser().subscribe((data: any) => {
      this.users = data;
    }))
  }

  createUser(newUser: User){
    this.subscriptions.push(this.userService.createUser(newUser).subscribe((resp: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário criado com sucesso!',
      });
      this.getUsers();
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao submter os dados!',
      });
    })
  )
  }
  editUser(user: User){
    this.subscriptions.push(
    this.userService.editUser(user).subscribe((resp: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário atualizado com sucesso!',
      });
      this.getUsers();
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao submter os dados!',
      });
    }))
  }
  getPermissions() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.canViewAllProfiles = user.permission.canViewAllProfiles;
      this.canEditUserProfiles = user.permission.canEditUserProfiles;
      this.canEditProfiles = user.permission.canEditProfiles;
      this.canCreateProfiles = user.permission.canCreateProfiles;
    }
  }
  editProfile(data:any){
    this.subscriptions.push(this.profileService.editProfiles(data.perfil).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Perfil atualizado com sucesso!',
      });
    },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao submter os dados!',
        });
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
