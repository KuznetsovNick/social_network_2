import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {SocketIoService} from "../../services/socket-io.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {Chat, Message} from "../../models/chat";
import {Chain} from "@angular/compiler";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less']
})
export class MessengerComponent implements OnDestroy{
  title:string = "Message"
  sub: Subscription
  write_to: number|null = null
  friends: User[]
  user: User
  ev: string
  chat: Chat
  sound: any

  constructor(private router: Router,
              private request: RequestsService,
              private socketService: SocketIoService,) {
    //@ts-ignore
    this.user =  JSON.parse(localStorage.getItem("user"))

    request.getSound().subscribe(sound => {
      this.sound = new Audio()
      this.sound.src = URL.createObjectURL(
        new Blob([new Uint8Array(sound).buffer], {type: 'sound/mp3'}))
    })

    request.getFriends(this.user.id).subscribe(friends => {
      this.friends = friends
    })
  }

  select_chat(id: number){
    let ev: string
    if(id > this.user.id){
      this.ev = `${this.user.id}-${id}`
    } else {
      this.ev = `${id}-${this.user.id}`
    }
    this.sub = this.socketService.listen_to_server(this.ev).subscribe((data) => {
      this.chat.messages.push(data)
      setTimeout(() => {
        let scroll_bar = document.getElementsByClassName("scroll_bar").item(0)
        //@ts-ignore
        scroll_bar.scrollTop = Math.ceil(scroll_bar.scrollHeight - scroll_bar.clientHeight);
      }, 0.1)
      if(data.name != this.user.name) {
        this.sound.play()
      }
    })
    this.request.getChat(this.ev).subscribe((chat: Chat) => {
      this.chat = chat
      this.write_to = id
      setTimeout(() => {
        let scroll_bar = document.getElementsByClassName("scroll_bar").item(0)
        //@ts-ignore
        scroll_bar.scrollTop = Math.ceil(scroll_bar.scrollHeight - scroll_bar.clientHeight);
      }, 0.1)
    })
  }

  send_message(){
    // @ts-ignore
    let msg: string = document.getElementById('inp').value
    let data: Message = {
      name: this.user.name,
      message: msg
    }
    //this.chat.messages.push(data)
    this.socketService.emit_to_server(this.ev, data)
    //@ts-ignore
    document.getElementById('inp').value = ""
  }

  close_messenger(){
    this.router.navigate(["menu"]).then(res => {})
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  protected readonly document = document;
  protected readonly JSON = JSON;
}
