import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  currentUser: User = new User();
  private serverUrl = 'http://localhost:8080/socket'
  private title = 'Chat';
  private stompClient;
      
  constructor(private router: Router,private auth: AuthService){
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let login;
    this.auth.current_user.subscribe(
      current_user => {
        this.currentUser = current_user;
       login = this.currentUser.login;
      });
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe(that.router.url, (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+login+': '+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send"+this.router.url, {}, message);
    $('#input').val('');
}
}
