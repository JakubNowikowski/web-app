import { Component, ChangeDetectionStrategy } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Post, Follow } from "../_models";
import { UserService, AuthenticationService, PostsService } from "../_services";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./home.component.html"
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
  isEmpty = false;

  _inputContent: string;
  get inputContent(): string {
    return this._inputContent;
  }
  set inputContent(value: string) {
    this._inputContent = value;
    this.isEmpty = this.inputContent ? false : true;
  }

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
    this.getPosts();
  }

  private getPosts() {
    this.postsService
      .getFollowedPosts(this.currentUser.id)
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  addPost(): void {
    if (!this.inputContent) {
      this.isEmpty = true;
    } else {
      this.postsService
        .addPost(this.currentUser.id, this.inputContent)
        .pipe(first())
        .subscribe(
          data => {
            this.getPosts();
          },
          error => {
            console.log(error);
          }
        );
      this.inputContent = null;
      this.isEmpty = false;
    }
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
}
