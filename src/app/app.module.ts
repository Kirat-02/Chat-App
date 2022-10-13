import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { UserComponent } from './user/user.component';
import { GroupaddComponent } from './groupadd/groupadd.component';
import { ChanneladdComponent } from './channeladd/channeladd.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { SocketService } from './service/socket.service';
import { VideoComponent } from './video/video.component';
import { RoomComponent } from './room/room.component';
import {SocketIoModule} from "ngx-socket-io";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupComponent,
    ChannelComponent,
    UserComponent,
    GroupaddComponent,
    ChanneladdComponent,
    HeaderComponent,
    VideoComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SocketIoModule.forRoot({
      url: '/'
    })
  ],
  providers: [AuthService, AuthGuard, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
