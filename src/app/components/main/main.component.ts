import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user$!: Observable<any>;
  user: any;
  currentUserId = 0;
  totalUserAmount = 0;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit(): void {
    this.webSocket.listen('connect').subscribe( () => console.log('Connection succeeded') );

    this.webSocket.listen('user-info').subscribe( data => {
      this.currentUserId = data.id;
      console.log('Current user id', this.currentUserId);
    });

    this.webSocket.listen('registered-users-amount').subscribe( data => {
      this.totalUserAmount = data.amount;
      console.log('Accept total users amount', this.totalUserAmount);
    });

    // this.user$ = this.webSocket.listen('user-info');
    this.webSocket.listen('user-info').subscribe( data => {
      this.user = data.id;
    });
  }

}
