// import { BrowserModule } from "@angular/platform-browser";
// import { NgModule } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";
// import { RouterModule } from "@angular/router";
// import { ReactiveFormsModule } from '@angular/forms';

// import { AppComponent } from "./app.component";
// import { ProductListComponent } from "./products/product-list.component";
// import { ConvertToSpaces } from "./shared/convert-to-spaces.pipe";
// import { StarComponent } from "./shared/star.component";
// import { ProductDetailComponent } from "./products/product-detail.component";
// import { HomeComponent } from "./home/home.component";
// import { LoginComponent } from "./login/login.component";

// @NgModule({
//   declarations: [
//     AppComponent,
//     ProductListComponent,
//     ConvertToSpaces,
//     StarComponent,
//     ProductDetailComponent,
//     HomeComponent,
//     LoginComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     RouterModule.forRoot([
//       { path: "products", component: ProductListComponent },
//       { path: "products/:id", component: ProductDetailComponent },
//       { path: "login", component: LoginComponent },
//       { path: "home", component: HomeComponent },
//       { path: "", redirectTo: "login", pathMatch: "full" },
//       { path: "**", redirectTo: "loign", pathMatch: "full" }
//     ])
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";

import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { AlertComponent } from "./_components";
import { ProductListComponent } from "./products/product-list.component";
import { ConvertToSpaces } from "./shared/convert-to-spaces.pipe";
import { StarComponent } from "./shared/star.component";
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProductListComponent,
    ConvertToSpaces,
    StarComponent,
    MyProfileComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
