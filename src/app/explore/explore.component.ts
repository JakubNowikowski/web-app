import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Follow } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "explore.component.html" })
export class ExploreComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  follow: Follow;
  followers: Follow[] = [];
  followings: Follow[] = [];

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

    this.getFollowers();
    this.getFollowings();
  }

  private getFollowers() {
    this.userService
      .getFollowers(this.currentUser.username)
      .pipe(first())
      .subscribe(follow => {
        this.followers = follow;
      });
  }

  private getFollowings() {
    this.userService
      .getFollowings(this.currentUser.username)
      .pipe(first())
      .subscribe(follow => {
        this.followings = follow;
      });
  }

  followUser(userToFollow: string): void {
    this.follow = {
      follower: this.currentUser.username,
      following: userToFollow
    };
    this.userService
      .follow(this.follow)
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
