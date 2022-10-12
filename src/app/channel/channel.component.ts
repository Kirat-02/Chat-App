import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import { AppService } from '../service/app.service';

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

  // list of varibales used in this file
  username = sessionStorage.getItem('username');
  userid = Number(sessionStorage.getItem('userid'));
  channelid: Number = Number(this.route.snapshot.params['channelid']);
  messages: Message[]= [];
  message = '';

  constructor(private route: ActivatedRoute, private _location: Location, private service: AppService) { }

  ngOnInit(){
    this.service.loadMessages(this.channelid)
      .subscribe((data:any)=>{
        if(data.length != 0){
          this.messages = data[0].messages;
        }
      }
    ) 
  }

  sendMessage(){
    if(this.message != null){
      var data = {channelid: this.channelid, userid: this.userid, messgae: this.message};
      this.service.addMessage(data).subscribe(
      )
    }
  }

  back(){
    this._location.back();
  }
}
