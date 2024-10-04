import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfiles() {
    return this.http.get<Profile>('https://gs3.com/profiles')
  }

  editProfiles(profile:Profile){
    return this.http.put<Profile>(`https://gs3.com/profiles/${profile.id}`, profile)
  }
}
