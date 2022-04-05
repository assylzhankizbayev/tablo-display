import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  currentUserId = 0;
  users: number[] = [];
  usersListCount = 8;
  totalUserAmount = 0;
  today = new Date();

  constructor(private webSocket: WebSocketService) {}

  ngOnInit(): void {
    this.webSocket
      .listen('connect')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('Connection succeeded'));

    this.webSocket
      .listen('init')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ displayUsersListLength, displayUsersList, calIdx }) => {
        console.log('init', displayUsersListLength, displayUsersList);

        this.users = displayUsersList?.length ? displayUsersList.slice() : [];
        this.currentUserId = calIdx;

        if (displayUsersListLength) {
          this.usersListCount = displayUsersListLength;
        }
      });

    this.webSocket
      .listen('user-info')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currentUserId = data.id;

        if (this.users.length >= this.usersListCount) {
          this.users.pop();
        }

        this.users.unshift(data.id);

        console.log('Current user id', this.currentUserId);
      });

    this.webSocket
      .listen('registered-users-amount')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.totalUserAmount = data.amount;
      });

    timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.today = new Date();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
