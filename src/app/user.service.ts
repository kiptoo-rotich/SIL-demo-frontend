import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  createUser(data: any){
    return this.http.post(`${environment.baseUrl}api/register`,data)
  }

  loginUser(data: any){
    return this.http.post(`${environment.baseUrl}api/login`,data)
  }

  userDetails(data: any){
    return this.http.get(`${environment.baseUrl}api/user`,data)
  }

  getAlbum(data: any){
    return this.http.get(`${environment.baseUrl}api/albums`,data)
  }

  postAlbum(data: any){
    return this.http.post(`${environment.baseUrl}api/albums`,data)
  }

  userList(){
    return this.http.get(`${environment.baseUrl}api/users_list`)
  }
}
