import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  createUser(data: any){
    return this.http.post(`${environment.baseUrl}register`,data)
  }

  loginUser(data: any){
    return this.http.post(`${environment.baseUrl}api/login`,data)
  }
}
