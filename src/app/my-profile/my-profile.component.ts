import { Component, OnInit } from "@angular/core";
import { ModalService } from "../_modalWindow/modal.service";
import { Follow, User } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "my-profile.component.html" })
export class MyProfileComponent implements OnInit {
  bodyText: string;
  currentUser: User;
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
    this.getFollowings();
  }

  private getFollowings() {
    this.userService
      .getFollowingsPromise(this.currentUser.username)
      .then(result => {
        this.follows = result;
      })
      .catch(error => console.log(error));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
