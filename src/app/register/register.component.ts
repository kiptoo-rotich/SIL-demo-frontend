import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup!: FormGroup;

  constructor(private userService: UserService,private http: HttpClient){}
  ngOnInit() {
    this.formGroup=new FormGroup({
      first_name: new FormControl("",[Validators.required]),
      last_name: new FormControl("", Validators.required), 
      username: new FormControl("", Validators.required),     
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirm_password: new FormControl("", Validators.required)

    })
  }

  registerUser(){
    let first_name = this.formGroup.value.first_name
    let last_name = this.formGroup.value.last_name
    let username = this.formGroup.value.username
    let email = this.formGroup.value.email
    let password = this.formGroup.value.password
    let confirm_password = this.formGroup.value.confirm_password

    const data = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password
    };

    this.userService.createUser(data)
    .subscribe(
      (response:any)=>{
        if(response){
          console.log(response)
        }else{
          console.log("Something went wrong")
        }
      }
    )
  }
}
