import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../models/user.model';
import { Profile } from '../../../models/profile.model';
import { ProfileService } from '../../../services/profile/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, OnChanges {
  @Input() display: boolean = false; 
  @Input() user: User | undefined; 
  @Output() closeDialog = new EventEmitter<void>();
  @Output() saveDialog = new EventEmitter<any>();

  selectedPerfil: number | undefined = undefined;
  emailUsuario: string | undefined ;
  perfisDefault:Profile[] = [];
  perfis = [];
  userOn: User | undefined;

  dialogStyle = {
    width: '40vw',
    height: 'auto'
  };
  private subscriptions: Subscription[] = [];
  constructor( private profileService:ProfileService ) { this.adjustDialogStyle(); }
  

  ngOnInit() {
    this.getProfiles();
    this.getPermissions();

    this.selectedPerfil = this.user?.permission?.id;
    this.emailUsuario = this.user?.email;
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {

    if(changes['user']){
      console.log(changes)
      this.user = changes['user'].currentValue;
      this.selectedPerfil = this.user?.permission?.id;
      this.emailUsuario = this.user?.email;
      this.getPermissions();
    }
  }

  onCancel() {
    this.closeDialog.emit();
  }

  onSave() {
    const getPefil: any = this.perfisDefault.find((perfil: any) => perfil.id == this.selectedPerfil);
    
    const data = {
      id: this.user?.id,
      email: this.emailUsuario,
      profile: getPefil
    };
    this.saveDialog.emit(data);
  }

  getProfiles(){
    this.subscriptions.push(this.profileService.getProfiles().subscribe((resp:any)=>{
    
        const perfis = resp;
        this.perfisDefault = perfis;
        this.perfis = perfis.map((item: any) => 
          Object.assign({}, item, { 
            label: item.role, 
            value: item.id 
          })
        );
      }, error => {
      }))
  }
  onDialogHide() {
    this.emailUsuario = ''; // Limpar o campo de email, se necessário
    this.selectedPerfil = undefined; // Limpar a seleção do perfil
    this.closeDialog.emit();
  }
  onShowDialog() {
    this.getProfiles();
    this.getPermissions();

    this.selectedPerfil = this.user?.permission?.id;
    this.emailUsuario = this.user?.email;
    
  }
  getPermissions() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userOn = user;
    }
  }

  adjustDialogStyle() {
    if (window.innerWidth <= 768) {
      this.dialogStyle = {
        width: '98vw', 
        height: 'auto', 
      };
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
