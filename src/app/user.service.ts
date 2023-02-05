import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Create a member of gapi.auth2.GoogleAuth object
  private auth2: gapi.auth2.GoogleAuth;
  // Create an instance of ReplaySubjects
  private subject:any = new ReplaySubject<gapi.auth2.GoogleUser>(1)


  constructor(private http:HttpClient) { 
    // load auth2 library with load function
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init(
        {
          client_id: '991744039395-6anecpemmpqrm1qe42tgqn8rfilb1jkv.apps.googleusercontent.com'
        }
      )
    })
   }

   // Create a public signIn function which returns a promise
   public signIn(){
        this.auth2.signIn()
        .then( user =>{
          this.subject.next(user);
        })
        .catch(()=>{
          this.subject.next(null)
        })
    }

    // Signout function will also return a promise
    public signOut(){
      this.auth2.signOut()
      .then(()=>{
        this.subject.next(null)
      })
    }

    // Define a method to let the component subscribe to the state
    //The return type of the funtion is observable of type gapi.auth2.GoogleUser
    public observable() : Observable<gapi.auth2.GoogleUser>{
      return this.subject.asObservable()
    }


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
