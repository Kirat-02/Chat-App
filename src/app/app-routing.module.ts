import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { ChanneladdComponent } from './channeladd/channeladd.component';
import { GroupaddComponent } from './groupadd/groupadd.component';
import { UserComponent } from './user/user.component';
import { VideoComponent } from './video/video.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'user/:id', component: GroupComponent }, 
  { path: 'channel/:channelid', component: ChannelComponent }, 
  { path: 'userlist', component: UserComponent }, 
  { path: 'group/:groupid/channel/:channelid/adduser', component: ChanneladdComponent }, 
  { path: 'group/:groupid/adduser', component: GroupaddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
