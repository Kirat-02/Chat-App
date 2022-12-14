import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Userobj } from '../objects/userobj';
import { Groups } from '../objects/groupobj';
import { Channel } from '../objects/channelobj';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  user: Userobj;
  message: string;


  constructor(private http: HttpClient, private router: Router) { }

  // used to authenticate user
  login(username: String, password: String){
    var user = {"username": username, "password": password}
    this.http.post<any>('http://localhost:3000/api/login', user)
    .subscribe((data)=>{
      this.user = data;
      if(data.length == 0){
        this.message='Invalid Username or Password';
      } else {
        sessionStorage.setItem('userid', data[0].id);
        sessionStorage.setItem('username', data[0].name.toString());
        sessionStorage.setItem('userrole', data[0].role.toString());
        this.loggedIn.next(true);
        localStorage.setItem("auth", JSON.stringify(true));
        if(data[0].image != undefined){
          sessionStorage.setItem('userimage', data[0].image.toString());
        }
        this.router.navigateByUrl("/user/"+data[0].id);
      }
      return data;
    })
  }

  // List all groups of member
  getgroups(){
    return this.http.get<Groups[]>('http://localhost:3000/api/getgroups');
  }

  // list of all Users
  getuserlist(){
    return this.http.get<Userobj[]>('http://localhost:3000/api/getuserlist');
  }

  // adds a new user 
  adduser(data: any){
    return this.http.post<any>('http://localhost:3000/api/adduser', data);
  }

  // updates user to super role
  updateuser(user: any){
    return this.http.post<any>('http://localhost:3000/api/updateuser', user);
  }

  // deletes the user
  deleteuser(user: any){
    return this.http.post<any>('http://localhost:3000/api/deleteuser', user);
  }

  // add a new group
  addgroup(group: any){
    return this.http.post<any>('http://localhost:3000/api/addgroup', group);
  }

  // deletes the group
  deletegroup(group: any){
    return this.http.post<any>('http://localhost:3000/api/deletegroup', group);
  }

  // gets the current members of a group
  getGroupMembers(id: Number){
    return this.http.get<any>('http://localhost:3000/api/groupMembers/'+id);
  }

  // adds a new user to group
  addUserGroup(data: any){
    return this.http.post<any>('http://localhost:3000/api/addusergroup/', data);
  }

  // removes user from group
  deleteUserGroup(data: any){
    return this.http.post<any>('http://localhost:3000/api/deleteusergroup/', data);
  }

  // upgrades user to group assistant
  upgradeAssistant(data: any){
    return this.http.post<any>('http://localhost:3000/api/groupAssistant/', data);
  }

  // upgrades user to group admin
  upgradeAdmin(data: any){
    return this.http.post<any>('http://localhost:3000/api/groupAdmin/', data);
  }

  // create a new channel
  newChannel(groupid: Number){
    var data = {id: groupid}
    return this.http.post<any>('http://localhost:3000/api/newchannel/', data);
  }

  // deletes a channel
  deleteChannel(groupid: Number, channelid: Number){
    var data = {groupid: groupid, channelid: channelid}
    return this.http.post<any>('http://localhost:3000/api/deletechannel/', data);
  }

  // load channel current users
  loadChannelUsers(groupid: Number, channelid: Number){
    return this.http.get<[Channel, Userobj[], Userobj[]]>('http://localhost:3000/api/group/'+groupid+'/channelusers/'+channelid);
  }

  // add member to the channel
  addChannelMember(memberid: Number, channelid: Number){
    var data =  {memberid: memberid, channelid: channelid}
    return this.http.post<any>('http://localhost:3000/api/addchannelmember/', data);
  }

  // deletes the member from channel
  deleteChannelMember(memberid: Number, channelid: Number){
    var data =  {memberid: memberid, channelid: channelid}
    return this.http.post<any>('http://localhost:3000/api/deletechannelmember/', data);
  }

  // load channel data
  loadChannel(channelid: Number){
    return this.http.get<any>('http://localhost:3000/api/loadchannel/'+channelid);
  }

  // get the current messages in channel
  loadMessages(channelid: Number){
    return this.http.get<any>('http://localhost:3000/api/getmessages/'+channelid);
  }

  // add new message to the channel
  addMessage(data: any){
    return this.http.post<any>('http://localhost:3000/api/addmessage', data);
  }
 
  // used to add image to channel
  addMessageImage(data: any){
    return this.http.post<any>('http://localhost:3000/api/addmessageimage', data);
  }
}