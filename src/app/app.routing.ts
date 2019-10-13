import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./_components/home";
import { LoginComponent } from "./_components/login";
import { RegisterComponent } from "./_components/register";
// import { AuthGuard } from "./_helpers";
import { MyProfileComponent } from "./_components/my-profile";
import { ExploreComponent } from "./_components/explore/explore.component";
import { EditComponent } from "./_components/edit/edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "explore", component: ExploreComponent },
  { path: "profile", component: MyProfileComponent },
  { path: "edit", component: EditComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
