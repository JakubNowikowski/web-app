import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./_components/home";
import { LoginComponent } from "./_components/login";
import { RegisterComponent } from "./_components/register";
import { AlertComponent } from "./_components/alert";
import { MyProfileComponent } from "./_components/my-profile/my-profile.component";
import { ExploreComponent } from "./_components/explore/explore.component";
import { ModalModule } from "./_components/modalWindow/modal.module";
import { EditComponent } from "./_components/edit/edit.component";
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    appRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MyProfileComponent,
    ExploreComponent,
    EditComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
