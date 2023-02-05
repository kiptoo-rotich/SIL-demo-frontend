import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }

  userList: any = []


  ngOnInit() {
    this.user_list()
  }

  user_list() {
    this.userService.userList()
      .subscribe(
        (response: any) => {
          this.userList.push(response);

        }
      )
  }

}
