import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(auth:Auth){
    return this.http.post(`https://gs3.com/auth`, auth);
  }
}
