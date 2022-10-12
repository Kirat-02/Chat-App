import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

import { AppService } from '../service/app.service';

// Objects 
import { Groups } from '../objects/groupobj';
import { Channel } from '../objects/channelobj';
import { User } from '../objects/userallobj';
import { Userobj } from '../objects/userobj';



@Component({
  selector: 'app-groupadd',
  templateUrl: './groupadd.component.html',
  styleUrls: ['./groupadd.component.css']
})
export class GroupaddComponent implements OnInit {

  username = sessionStorage.getItem('username');
  userrole = sessionStorage.getItem('userrole');

  groupid: Number = Number(this.route.snapshot.params['groupid']);
  channel: Channel = {'id': 0, "members": [0] };
  group: Groups;
  userlist: Userobj[];
  nonmembers: Userobj[] = [];
  newuserid = '';
  newuserrole = 'normal';
  
  public groupAddisCollapsed = true;  

  constructor(private router:Router, private _location: Location, private service: AppService, private route: ActivatedRoute) { }

  // gets the group details, members and non members
  ngOnInit() {
    this.service.getGroupMembers(this.groupid).subscribe(data=>{
      this.group = data.group[0];
      this.userlist = data.members;
      this.nonmembers = data.nonmembers;
    })
  }

  // triggers a refresh of the page
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['group/'+this.groupid+'/adduser']);
    });
  }

  // used to add new member to group
  addmember(){
    var userid = this.newuserid;
    var data = {groupid: this.groupid, userid: parseInt(userid)}
    this.service.addUserGroup(data).subscribe()
    this.refresh()
  }

  // removes a user from group
  deleteUser(userid: Number){
    var data = {groupid: this.groupid, userid: userid}
    this.service.deleteUserGroup(data).subscribe()
    this.refresh()
  }

  // used to upgrade user to Group Assistant
  upgradeAssistant(userid: Number){
    var data = {groupid: this.groupid, userid: userid}
    this.service.upgradeAssistant(data).subscribe()
    this.refresh()
  }

  // used to upgrade group assistant to group admin
  upgradeAdmin(userid: Number){
    var data = {groupid: this.groupid, userid: userid}
    this.service.upgradeAdmin(data).subscribe()
    this.refresh()
  }

  // takes back to previous page
  back(){
    this._location.back();
  }
}
