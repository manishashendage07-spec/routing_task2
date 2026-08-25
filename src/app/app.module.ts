import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductsComponent } from './components/product/products/products.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './components/get-confirm/get-confirm.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { FairsComponent } from './components/fairs/fairs.component';
import { FairsDetailsComponent } from './components/fairs/fairs-details/fairs-details.component';
import { FairsCardComponent } from './components/fairs/fairs-card/fairs-card.component';
import { AuthComponent } from './components/auth/auth.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    ProductFormComponent,
    GetConfirmComponent,
    UserFormComponent,
    UserDetailsComponent,
    FairsComponent,
    FairsDetailsComponent,
    FairsCardComponent,
    AuthComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    UserComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }