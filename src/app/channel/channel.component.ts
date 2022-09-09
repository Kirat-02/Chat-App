import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

interface Message {
  userid: Number,
  message: Text;
}

interface Messages{
  channelid: Number, 
  messages: [Message]
}

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  username = sessionStorage.getItem('username');
  userid = Number(sessionStorage.getItem('userid'));
  channelid: Number = Number(this.route.snapshot.params['id']);
  messages: Message[]= [];
  message = '';

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient, private _location: Location) { }

  ngOnInit(){
    this.httpClient.get<Messages[]>(BACKEND_URL + '/channels/'+this.channelid)
      .subscribe((data:any)=>{
       this.messages = data.messages;
      }
    ) 
  }

  sendMessage(){
    if(this.message != null){
      let newmessage = {userid:this.userid, message: this.message};
      this.httpClient.post(BACKEND_URL + '/channels/'+this.channelid+'/newmessage', newmessage, httpOptions)
        .subscribe((data:any)=>{
        }
      ) 
    }
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

  back(){
    this._location.back();
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigateByUrl("");
  }
}
