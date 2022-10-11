import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Userobj } from '../objects/userobj';
import { Groups } from '../objects/groupobj';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // used to authenticate user
  login(username: String, password: String){
    var user = {"username": username, "password": password}
    return this.http.post<any>('http://localhost:3000/api/login', user);
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
  adduser(user: Userobj){
    return this.http.post<any>('http://localhost:3000/api/adduser', user);
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
  newChannel(id: Number){
    return this.http.post<any>('http://localhost:3000/api/newchannel/', id);
  }



}
