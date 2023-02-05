import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  getToken = localStorage.getItem("Token");
  formGroup!: FormGroup;
  is_authenticated = false;
  user: gapi.auth2.GoogleUser

  constructor(private userService: UserService, private ref: ChangeDetectorRef, private http: HttpClient) { }
  ngOnInit():void {
    this.userService.observable().subscribe( user => {
      this.user = user
      this.ref.detectChanges()
    })
    this.formGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  // Call signIn function from userService
  signIn(){
    this.userService.signIn()
  }

  // Call signOut function from userService
  signOut(){
    this.userService.signOut()
  }

  loginUser() {
    // Get details from user login form
    let username = this.formGroup.value.username
    let password = this.formGroup.value.password

    // Create an object from the details
    const data = {
      username: username,
      password: password,
    };


    // Call loginUser function and pass in username and password
    this.userService.loginUser(data)
      .subscribe(
        (response: any) => {
          if (response.token) {
            this.is_authenticated = true;

            // Store token in localStorage
            localStorage.setItem("Token",response.token);

            // Set authorization header for user post request
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Token ${response.token}`
            })

            const requestOptions = { headers: headers };
            
            // Call userDetails function and pass in Authorization token
            this.userService.userDetails(requestOptions)
              .subscribe(
                (response: any) => {
                  console.log(response)
                }
              )
          } else {
            console.error("Check your credentials and try again")
          }
        }
      )
  }

}
