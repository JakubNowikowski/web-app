import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { AuthGuard } from "./_helpers";
import { ProductListComponent } from "./products/product-list.component";
import { MyProfileComponent } from "./my-profile";
import { ExploreComponent } from "./explore/explore.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "explore", component: ExploreComponent },
  { path: "profile", component: MyProfileComponent },
  { path: "edit", component: EditComponent },
  { path: "products", component: ProductListComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
