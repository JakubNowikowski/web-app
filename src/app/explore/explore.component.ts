import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Follow } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "explore.component.html" })
export class ExploreComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  follow: Follow;
  clickedUsers: number[] = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  isClicked(userId: number): boolean {
    return this.clickedUsers.includes(userId);
  }

  ngOnInit() {
    this.userService
      .explore(this.currentUser.id)
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  followUser(userToFollowId: number): void {
    this.userService
      .follow(this.currentUser.id, userToFollowId)
      .pipe(first())
      .subscribe(
        data => {
          this.clickedUsers.push(userToFollowId);
        },
        error => {
          console.log(error);
        }
      );
  }
}
