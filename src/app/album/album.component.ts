import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {

  formGroup!: FormGroup;
  albums: any = []
  numberOfAlbums = ""

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute){}
  token = localStorage.getItem("Token")
  // Initialize the component
  ngOnInit() {
    this.getAlbums()

  }

  getAlbums(){
    this.userService.getAlbum({params: {user_id: this.route.snapshot.paramMap.get('id')}})
    .subscribe(
      (response: any) => {
        this.albums.push(response)
        this.numberOfAlbums=this.albums[0].length
        console.log(response)
      }
    )
  }

}
