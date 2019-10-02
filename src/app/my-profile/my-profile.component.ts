import { Component, OnInit } from "@angular/core";
import { ModalService } from "../_modalWindow/modal.service";
import { Follow, User, Post } from "../_models";
import { UserService, AuthenticationService, PostsService } from "../_services";
import { first } from "rxjs/operators";

@Component({ templateUrl: "my-profile.component.html" })
export class MyProfileComponent implements OnInit {
  bodyText: string;
  currentUser: User;
  following: User[] = [   {firstName:"",token:"",password:"",lastName:"",id:1,username:"133413413"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User2"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User3"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User4"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User1"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User2"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User3"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User4"}];
  followers: User[]=[   {firstName:"",token:"",password:"",lastName:"",id:1,username:"133413413"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User2"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User3"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User4"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User1"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User2"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User3"},
  {firstName:"",token:"",password:"",lastName:"",id:1,username:"User4"}];
  follows: Follow[] = [];
  clickedUsers: number[] = [];
  posts: Post[] = [];

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.getPosts();
    this.getFollowers();
    this.getFollowing();
  }

  isClicked(userId: number): boolean {
    return this.clickedUsers.includes(userId);
  }

  private getPosts() {
    this.postsService
      .getPosts(this.currentUser.id)
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  deletePost(postId: number) {
    this.postsService
      .delete(this.currentUser.id, postId)
      .pipe(first())
      .subscribe(
        data => {
          this.getPosts();
        },
        error => {
          console.log(error);
        }
      );
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

  unFollowUser(userToUnfollow: number) {
    this.userService
      .unfollow(this.currentUser.id, userToUnfollow)
      .pipe(first())
      .subscribe(
        data => {
          this.clickedUsers.push(userToUnfollow);
        },
        error => {
          console.log(error);
        }
      );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
