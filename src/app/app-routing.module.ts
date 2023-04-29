import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './My-components/categories/categories.component';
import { DashboardComponent } from './My-components/dashboard/dashboard.component';
import { AllPostComponent } from './My-components/posts/all-post/all-post.component';
import { NewPostComponent } from './My-components/posts/new-post/new-post.component';
import { LoginComponent } from './My-components/auth/login/login.component';
import { AuthGuard } from './My-components/services/auth-guard/auth.guard';
import { SubscribersComponent } from './My-components/subscribers/subscribers.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'category',component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:'posts',component:AllPostComponent,canActivate:[AuthGuard]},
  {path:'posts/new',component:NewPostComponent,canActivate:[AuthGuard]},
  {path:'subscribers',component:SubscribersComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
