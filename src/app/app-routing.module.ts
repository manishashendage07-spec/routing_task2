
import { NgModule } from '@angular/core';
import { CanDeactivateFn, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductsComponent } from './components/product/products/products.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { FairsComponent } from './components/fairs/fairs.component';
import { FairsDetailsComponent } from './components/fairs/fairs-details/fairs-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './service/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRoleGuard } from './service/userRole.guard';
import { NewUsersResolver } from './service/new-users.resolver.service';
import { ProductComponent } from './components/product/product.component';
import { NewProductsResolver } from './service/new-products.resolver.service';
import { CanDeactivateGuard } from './service/can-deactive.guard';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',//BASE_URL/HOME
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['buyer', 'Admin', 'superAdmin']
    }
  },

  {
    path: 'user',//BASE_URL/USERS
    component: UserComponent,
    title: 'Users',
    canActivate: [AuthGuard, UserRoleGuard],
    resolve: {
      user: NewUsersResolver
    },
    data: {
      userRole: ['Admin', 'superAdmin']
    },
    children: [
      {
        path: 'addusers',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':uid',
        component: UserDetailsComponent
      },
      {
        path: ':uid/edit',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: 'product',//BASE_URL/PRODUCT
    component: ProductComponent,
    title: 'Product',
    resolve: {
      // products:ProductResolver
      products: NewProductsResolver
    },
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['buyer', 'Admin', 'superAdmin']
    },
    children: [
      {
        path: 'addProduct',//BASE_URL/PRODUCT/addProduct
        component: ProductFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':pid',//BASE_URL/PRODUCT/123
        resolve: {
          // products:ProductResolver
          products: NewProductsResolver
        },
        component: ProductsComponent
      },
      {
        path: ':pid/edit',//BASE_URL/PRODUCT
        component: ProductFormComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: 'fairs',//BASE_URL/FAIRS
    component: FairsComponent,
    title: 'Fairs',
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['superAdmin']
    },
    children: [
      {
        path: ':id',
        component: FairsDetailsComponent
      }
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      msg: `page not found using static data !!!`
    }
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }