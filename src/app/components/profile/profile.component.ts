import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  user: User
  constructor(private router: Router) {
    let user = localStorage.getItem("user")
    if(user){
      this.user = JSON.parse(user)
    }
    console.log(this.user)
  }

  close_profile(){
    this.router.navigate(["menu"]).then(res => {})
  }
}
