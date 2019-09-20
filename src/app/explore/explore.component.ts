import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Follow } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "explore.component.html" })
export class ExploreComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  follow: Follow;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.userService
      .getAllUsers()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  followUser(userToFollowId: number): void {
    this.userService
      .follow(this.currentUser.id, userToFollowId)
      .pipe(first())
      .subscribe( data => {
        // this.alertService.success("Registration successful", true);
        // this.router.navigate(["/login"]);
      },
      error => {
        console.log(error)
        // this.loading = false;
      });
  }

  unFollowUser(userToUnfollow: string) {
    this.userService
      .unfollow(this.currentUser.username, userToUnfollow)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success("Registration successful", true);
          // this.router.navigate(["/login"]);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        }
      );
  }
}
