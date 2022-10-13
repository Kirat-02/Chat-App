import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import { AppService } from '../service/app.service';

import { SocketService } from '../service/socket.service';


// Message interface
interface Message {
  userid: Number,
  username: Text,
  channelid: Number,
  message: Text;
  type: String,
  image: Text
}

// left message interface
interface leftMessages{
  name: String
  channelid: Number
}

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
  leftMessage: leftMessages[]=[];
  uploadedFiles: Array < File >;
  ioConnection: any;

  constructor(private route: ActivatedRoute, private _location: Location, private service: AppService, private socketService: SocketService) { }

  // initialise
  ngOnInit(){
    this.service.loadMessages(this.channelid)
      .subscribe((data: any)=>{
        if(data.message == 'No Messages exist'){
          this.initIoConnection();  
        } else {
          this.messages = data[0].messages.reverse();
          console.log(this.messages)
          this.initIoConnection();      
        }
      }
    ) 
  }

  // when user leaves the chat
  left(){
    window.setTimeout(() => {
      this.leftMessage = [];
    }, 4000);
  }

  // initialise connection
  initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((data: any) => {
        this.messages.unshift(data);
      });
    this.ioConnection = this.socketService.getLeftMessage()
      .subscribe((data: any) => {
        this.leftMessage = data;
        this.left();
      });
      
  }

  // used for uploading image
  sendImage(){
      let formData = new FormData();
      let date = this.channelid+'_'+this.userid+'_'+Date.now() 
      var channel = {channelid: this.channelid, userid: this.userid, username: this.username, message: this.message, type: 'image', image: date};
      const data = JSON.stringify(channel)
      formData.append('data', data);

      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("files", this.uploadedFiles[i], date);
      }
      this.service.addMessageImage(formData).subscribe((data)=>{}) 
      this.socketService.send(channel);
  }

  // used for video chat
  startVideo(){
    console.log('video')
  }

  // used to send new messages
  sendMessage(){
    if (this.uploadedFiles != undefined){

      // if file is given
      if(this.uploadedFiles.length != 0){
        this.sendImage();
        this.message="";
        this.uploadedFiles=[];
      } else {
      // if file is not given
        var data = {channelid: this.channelid, userid: this.userid, username: this.username, type: 'text', message: this.message};
        this.service.addMessage(data).subscribe()
        this.socketService.send(data);
        this.message="";
      }
    } else if(this.message != null){
      var data = {channelid: this.channelid, userid: this.userid, username: this.username, type: 'text', message: this.message};
      this.service.addMessage(data).subscribe()
      this.socketService.send(data);
      this.message="";
    } 
  }

  // used to upload image  
  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  // takes back to previous window
  back(){
    this.socketService.sendLeft([{name: this.username+" left", channelid: this.channelid}])
    this._location.back();    
  }
}
