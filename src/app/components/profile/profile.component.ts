import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  user: User
  img: ArrayBuffer
  constructor(private router: Router, private request: RequestsService) {
    let user = localStorage.getItem("user")
    if(user){
      this.user = JSON.parse(user)
    }
    request.getImage(this.user.id).subscribe(img => {
      this.img = img
      this.converting()
    })
  }

  close_profile(){
    this.router.navigate(["menu"]).then(res => {})
  }

  converting() {
    if(document.getElementById("img")) {
      // @ts-ignore
      document.getElementById("img").src = URL.createObjectURL(
        new Blob([new Uint8Array(this.img).buffer], {type: 'image/png'}))
    }
  }
}
