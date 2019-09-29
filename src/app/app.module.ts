import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
// import { fakeBackendProvider } from "./_helpers";

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
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { ExploreComponent } from "./explore/explore.component";
import { ModalModule } from "./_modalWindow/modal.module";
import { EditComponent } from "./edit/edit.component";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule
} from "@angular/material";

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
    MatIconModule
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
    MyProfileComponent,
    ExploreComponent,
    EditComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
