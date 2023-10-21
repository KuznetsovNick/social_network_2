import {Component, EventEmitter, Input, Output} from "@angular/core";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";

@Component({
  selector: "app-entering",
  templateUrl: "entering.component.html"
})

export class EnteringComponent {
  user: User
  is_register:boolean = false
  constructor(private request: RequestsService, private router: Router) {
  }

  register(){
    let user: User = {
      //@ts-ignore
      name: document.getElementById("name").value,
      //@ts-ignore
      bd: document.getElementById("date").value,
      //@ts-ignore
      email: document.getElementById("email").value,
      id: -1,
      status: "",
      role: "",
      friends: [],
      img: false
    }

    this.request.addUser(user).subscribe((id) => {
      alert(`Your id is ${id.id}`)
      this.is_register = false
    })
  }


  login(){
    let input = <HTMLInputElement>document.getElementById("enter_id")
    if(input) {
      if(input.value) {
        let id: number = +input.value

        this.request.getUser(id).subscribe(user => {
          if(user) {
            this.user = user
            localStorage.setItem("user", JSON.stringify(user))
            this.router.navigate(["menu"]).then(res => {})
            return
          } else{
            alert("Invalid user")
          }
        })
      }else {
        alert("Invalid user")
      }
    }
  }
}
