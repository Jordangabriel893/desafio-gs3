import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menuItems: any[];
  currentRoute: string = '';
  isSidebarVisible: boolean = false;
  
  constructor(private router: Router) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.menuItems = [
      {
        label: 'Início',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  isLoginOrEmptyRoute(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/';
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    localStorage.removeItem('user');
    this.isSidebarVisible = false;
    this.router.navigate(['/login']);
  }

}
