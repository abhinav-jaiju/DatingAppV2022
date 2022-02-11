import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  //navigate -- routes
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'user',component:UserComponent},
  {path:'userlist',component:UserListComponent},
  {path:'customer',component:CustomerComponent, canActivate:[AuthGuard], data:{role:'2'}},
  {path:'report',component:ReportComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
