import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../../models/user.model'


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    const user = this.getUserLogged();
    return this.http.post<User>('https://gs3.com/user/list', user);
  }

  createUser(user:User) {
    return this.http.post<User>('https://gs3.com/user', user);
  }

  editUser(user:User){
    return this.http.put<User>(`https://gs3.com/user/${user.id}`, user);
  }
  
  getUserLogged(){
    const userJson = localStorage.getItem('user');
    let user;
    if (userJson) {
      user = JSON.parse(userJson);
    }
    return user
  }
}