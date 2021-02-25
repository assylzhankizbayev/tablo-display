import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user$ = new ReplaySubject(8);
  currentUserId = 0;
  totalUserAmount = 0;
  data = [1, 2, 3, 4, 5];

  constructor(private webSocket: WebSocketService) { }

  // get user() {
  //   return this.user$.asObservable().pipe(
  //     map(item => item)
  //   );
  // }

  ngOnInit(): void {
    this.webSocket.listen('connect').subscribe(() => console.log('Connection succeeded'));

    this.webSocket.listen('user-info').subscribe(data => {
      this.currentUserId = data.id;
      // console.log('Current user id', this.currentUserId);
    });

    this.webSocket.listen('registered-users-amount').subscribe(data => {
      this.totalUserAmount = data.amount;
      // console.log('Accept total users amount', this.totalUserAmount);
    });

    // this.user$ = this.webSocket.listen('user-info');
    this.webSocket.listen('user-info').subscribe(data => {
      // this.user = data.id;
      console.log('************save', data.id);

      this.user$.next(data.id)

      this.user$.subscribe(val => {
        console.log('replay', val);
      });
    });
  }
}

interface User {
  id: number;
  room: number;
}
