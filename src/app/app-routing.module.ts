import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';

import { UserComponent } from './user/user.component';

const routes: Routes = [{path:'', component: LoginComponent}, {path:'user/:id', component: GroupComponent}, {path:'channel/:id', component: ChannelComponent}, {path:'userlist', component: UserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
