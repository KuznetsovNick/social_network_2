import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {News} from "../models/news";
import {Chat} from "../models/chat";

@Injectable({
  providedIn: "root"
})

export class RequestsService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:8443/update")
  }
  getUser(id: number): Observable<User> {
    return this.http.post<User>("https://localhost:8443/get_user", {id: id})
  }

  getFriends(id: number): Observable<User[]> {
    return this.http.post<User[]>("https://localhost:8443/get_friends", {id: id})
  }

  getNews(id: number): Observable<News[]> {
    return this.http.post<News[]>("https://localhost:8443/send_news", {id: id})
  }

  // getImage(id: number): Observable<File> {
  //   return this.http.post<File>("https://localhost:8443/send_image", {id: id})
  // }

  getImage(id: number){
    let url = "https://localhost:8443/send_image"
    return this.http.post(url, {id: id},{responseType: 'arraybuffer'})
  };

  getChat(chanel: string){
    return this.http.post<Chat>("https://localhost:8443/send_chat", {chanel: chanel})
  };

  addUser(user: User):Observable<any>{
    return this.http.post("https://localhost:8443/add_user", user)
  };

  deleteImg(id: number):Observable<any>{
    return this.http.post("https://localhost:8443/delete_img", {id: id})
  }
}
