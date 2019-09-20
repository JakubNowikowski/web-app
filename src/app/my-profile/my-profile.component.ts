import { Component, OnInit } from "@angular/core";
import { ModalService } from "../_modalWindow/modal.service";
import { Follow, User } from "../_models";
import { UserService, AuthenticationService } from "../_services";
import { first } from "rxjs/operators";

@Component({ templateUrl: "my-profile.component.html" })
export class MyProfileComponent implements OnInit {
  bodyText: string;
  currentUser: User;
  following: User[];
  followers: User[];
  follows: Follow[] = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.bodyText = "This text can be updated in modal 1";
    this.getFollowers();
    this.getFollowing();
  }

  private getFollowers() {
    this.userService
      .getFollowers(this.currentUser.id)
      .pipe(first())
      .subscribe(follow => {
        this.followers = follow;
      });
  }

  private getFollowing() {
    this.userService
      .getFollowing(this.currentUser.id)
      .pipe(first())
      .subscribe(follow => {
        this.following = follow;
      });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
