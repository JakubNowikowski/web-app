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
          // this.alertService.success("Registration successful", true);
          // this.router.navigate(["/login"]);
        },
        error => {
          console.log(error);
          // this.loading = false;
        }
      );
  }
}
