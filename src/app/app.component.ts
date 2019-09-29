// import { Component } from "@angular/core";

// @Component({
//   selector: "pm-root",
//   template: `
//     <nav class="navbar-expand nabar-light bg-light">
//       <ul class="nav nav-pills">
//         <li><a class="nav-link" [routerLink]="['/login']">Log in</a></li>
//         <li><a class="nav-link" [routerLink]="['/home']">Home</a></li>
//         <li><a class="nav-link" [routerLink]="['/products']">My profile</a></li>
//         <li><a class="nav-link" [routerLink]="['/products']">Log out</a></li>
//       </ul>
//     </nav>
//     <div class="container">
//       <router-outlet></router-outlet>
//     </div>
//   `
// })
// export class AppComponent {
//   pageTitle: string = "Acme Product Management";
// }

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { AuthenticationService } from "./_services";
import { User } from "./_models";

@Component({
  selector: "app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent {
  currentUser: User;
  public userName: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
