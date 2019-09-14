import { Component, ChangeDetectionStrategy } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Post, Follow } from "../_models";
import { UserService, AuthenticationService, PostsService } from "../_services";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./home.component.html"
  // changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent {
  public pageTitle = "Home";
  currentUser: User;
  currentPost: Post;
  users: User[] = [];
  posts: Post[] = [];
  post: Post;
  newPost: Post;
  isRequesting: string;
  follows: Follow[] = [];
  followings: string[] = [];

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );

    this.postsService.currentPost.subscribe(x => (this.currentPost = x));
  }

  ngOnInit() {
    this.getAllUsers();

    this.getFollowings(); // must update immediately

    this.getPosts();

    console.log("here");
    console.log(this.follows);
    // this.followings.forEach(element => {
    //   console.log(element);
    // });
    // this.getPosts(this.follows);
  }

  private getAllUsers() {
    this.userService
      .getAllUsers()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  private getFollowings() {
    this.userService
      .getFollowingsPromise(this.currentUser.username)
      .then(result => {
        this.follows = result;
      })
      .catch(error => console.log(error));
  }

  // private getFollowings(): Follow[] {
  //   this.userService
  //     .getFollowingsPromise(this.currentUser.username)
  //     .then(follow => {
  //       this.follows = follow;
  //     });
  //   return this.follows;
  // }

  private getUserNames(followsArr: Follow[]): string[] {
    let result: string[] = [];
    followsArr.forEach(follow => {
      result.push(follow.following);
    });

    return result;
  }

  private getPosts() {
    this.postsService
      .getPosts(this.currentUser.username)
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  _inputContent: string;
  get inputContent(): string {
    return this._inputContent;
  }
  set inputContent(value: string) {
    this._inputContent = value;
  }

  addPost(): void {
    this.followings = this.follows.map(function(follow) {
      return follow.following;
    });
    this.post = {
      username: this.currentUser.username,
      content: this.inputContent
    };

    this.postsService
      .addPost(this.post)
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

    this.postsService.currentPost.subscribe(x => (this.currentPost = x));

    // TO DO after linking to real data base
    this.newPost = {
      username: this.currentUser.username,
      content: this.inputContent
    };

    this.posts.unshift(this.newPost);

    this.inputContent = "";
  }

  deleteAllPosts(): void {
    console.log(this.follows);

    // this.postsService
    //   .deleteAll()
    //   .pipe(first())
    //   .subscribe();

    // // TO DO after linking to real data base
    // this.posts.length = 0;
  }
}
