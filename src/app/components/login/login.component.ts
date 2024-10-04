import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../services/auth/auth.service';
import { Auth } from '../../models/auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';
  remember: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private router: Router,  private messageService: MessageService, private authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.email && this.password) {

      const auth: Auth = {
        email: this.email,
        password: this.password
      }
      this.authService.login(auth).subscribe((resp:any)=>{

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!',
        });

        localStorage.setItem('user', JSON.stringify(resp.user));
        this.router.navigate(['/home']);
      },
       error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao submter os dados!',
        });
      })
      
    } else {
      console.log('aq')
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao submter os dados!',
      });
    }
  }
}
