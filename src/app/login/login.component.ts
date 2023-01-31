import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;

  constructor(private userService: UserService,private http: HttpClient){}
  ngOnInit() {
    this.formGroup=new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  loginUser(){
    let username = this.formGroup.value.username
    let password = this.formGroup.value.password

    const data = {
      username: username,
      password: password,
    };

    this.userService.loginUser(data)
    .subscribe(
      (response:any)=>{
        if(response.token){
          console.log(response)
        }else{
          console.error('oops', Error)
        }
      }
    )
  }

}
