import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../objects/channelobj';
import { Groups } from '../objects/groupobj';
import { BACKEND_URL } from '../backend';

import { AppService } from '../service/app.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  username = sessionStorage.getItem('username');
  userrole = sessionStorage.getItem('userrole');

  id: Number = Number(this.route.snapshot.params['id']);
  groups: Groups[] = [];

  newgroupname = '';
  newgroupid: number;

  message: string;

  public GroupisCollapsed = true;
  public ChannelisCollapsed = true;

  constructor(private router:Router, private route: ActivatedRoute, private service: AppService) { }

  ngOnInit() {
    sessionStorage.setItem('loggedin', 'yes');
    let userid: Number = this.id ;
    this.service.getgroups().subscribe((data)=>{
      this.groups = data;
    })
  }

  addChannel(groupid: Number){
    this.service.newChannel(groupid).subscribe({})
    window.location.reload()
  }

  // Used to add a new Group
  addGroup(){
    var group = {id: this.newgroupid, name: this.newgroupname}
    this.service.addgroup(group).subscribe((data) =>{
      if(data.err != null){
        this.message = data.err;
      } else {
        window.location.reload();
      }
    })
  }

  // used to delete the group
  deleteGroup(id: Number){
    var group = {id: id}
    this.service.deletegroup(group).subscribe((data)=>{
      window.location.reload();
    })
  }

  loaduserlist(){
    this.router.navigateByUrl("/userlist");
  }

  loadchannel(channelid: Number){
    this.router.navigateByUrl("/channel/"+channelid);
  }

  groupAddUser(groupid: Number){
    this.router.navigateByUrl("/group/"+groupid+"/adduser");
  }

  channelAdduser(groupid: Number, channelid: Number){
    this.router.navigateByUrl("/group/"+groupid+"/channel/"+channelid+"/adduser");
  }

}
