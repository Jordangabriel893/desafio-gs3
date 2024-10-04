import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProfileService } from './../../../services/profile/profile.service';
import { User } from '../../../models/user.model';
import { Profile } from '../../../models/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.scss']
})
export class AdicionarUsuarioComponent implements OnInit, OnDestroy {
  @Input() display: boolean = false; 
  @Output() closeDialog = new EventEmitter<void>();
  @Output() saveDialog = new EventEmitter<any>();

  selectedPerfil: number | null = null;
  emailUsuario: string = "";
  perfisDefault:Profile[] = [];
  perfis = [];
  dialogStyle = {
    width: '40vw',
    height: 'auto'
  };
  private subscriptions: Subscription[] = [];
  constructor( private profileService:ProfileService ) { this.adjustDialogStyle();}

  ngOnInit() {
    this.getProfiles();
  }

  onCancel() {
    this.closeDialog.emit();
  }

  onSave() {
    const gerPefil: any = this.perfisDefault.find((perfil: any) => perfil.id == this.selectedPerfil);
    
    const data = {
      email: this.emailUsuario,
      profile: gerPefil
    };
    this.emailUsuario = "";
    this.selectedPerfil = 0;
    this.saveDialog.emit(data);
  }

  getProfiles(){
    this.subscriptions.push(
      this.profileService.getProfiles().subscribe((resp:any)=>{

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

  adjustDialogStyle() {
    if (window.innerWidth <= 768) {
      this.dialogStyle = {
        width: '98vw', 
        height: 'auto', 
      };
    }
  }

  onDialogHide() {
    this.closeDialog.emit();
  }
  onShowDialog() {
    this.getProfiles();
  

    this.selectedPerfil = null;
    this.emailUsuario = "";
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
