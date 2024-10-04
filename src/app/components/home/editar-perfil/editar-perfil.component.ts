import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit, OnChanges, OnDestroy {
  @Input() display: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() saveDialog = new EventEmitter<any>();

  selectedPerfil: Profile | undefined ;
  valuePerfil: number | undefined;
  perfis = [];
  perfisDefault = [];

  dialogStyle = {
    width: '40vw',
    height: 'auto'
  };
  private subscriptions: Subscription[] = [];

  constructor( private profileService: ProfileService) {this.adjustDialogStyle(); }

  ngOnInit() {
    this.getProfiles();
    this.selectedPerfil = undefined;
    this.perfis = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.perfis = [];
      this.getProfiles();
      this.selectedPerfil = undefined
    }
  }


  onCancel() {
    this.selectedPerfil = undefined
    this.perfis = []

    this.closeDialog.emit();
  }


  onPerfilChange(event: any) {
    const perfilSelecionado = this.perfisDefault.find((perfil: any) => perfil.id == event.value);
    console.log('perfilSelecionado',perfilSelecionado);
    if(perfilSelecionado){
      this.selectedPerfil = perfilSelecionado;
    }
  }

  onSave() {
    const perfilSelecionado = this.perfisDefault.find((perfil: any) => perfil.id == this.valuePerfil);

    const data = {
      perfil: perfilSelecionado,
    };
    this.selectedPerfil = undefined
    this.perfis = []
    this.saveDialog.emit(data);
  }

  onDialogHide() {
    this.selectedPerfil = undefined
    this.perfis = []

    this.closeDialog.emit();
  }

  onShowDialog() {
    this.getProfiles();
    this.valuePerfil = undefined;
    
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
      })
    )
    
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

  get canEditUserProfiles(): boolean {
    return this.selectedPerfil?.canEditUserProfiles ?? false;
  }

  set canEditUserProfiles(value: boolean) {
    if (this.selectedPerfil) {
      this.selectedPerfil.canEditUserProfiles = value;
    }
  }

  get canEditProfiles(): boolean {
    return this.selectedPerfil?.canEditProfiles ?? false;
  }

  set canEditProfiles(value: boolean) {
    if (this.selectedPerfil) {
      this.selectedPerfil.canEditProfiles = value;
    }
  }

  get canViewAllProfiles(): boolean {
    return this.selectedPerfil?.canViewAllProfiles ?? false;
  }

  set canViewAllProfiles(value: boolean) {
    if (this.selectedPerfil) {
      this.selectedPerfil.canViewAllProfiles = value;
    }
  }
}
