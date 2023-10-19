import {Component, EventEmitter, Input, Output} from "@angular/core";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {ShareService} from "../../services/share.service";

@Component({
  selector: "app-entering",
  templateUrl: "entering.component.html"
})

export class EnteringComponent {
  user: User
  constructor(private request: RequestsService, private router: Router) {
  }



  login(){
    let input = <HTMLInputElement>document.getElementById("enter_id")
    if(input) {
      let id:number = +input.value
      this.request.getUser(id).subscribe(user => {
        this.user = user
        localStorage.setItem("user", JSON.stringify(user))
      })
    }
  }
}
