import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../objects/channelobj';
import { Groups } from '../objects/groupobj';
import { BACKEND_URL } from '../backend';

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

  public GroupisCollapsed = true;
  public ChannelisCollapsed = true;

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    
    sessionStorage.setItem('loggedin', 'yes');
    let userid: Number = this.id ;

    this.httpClient.get<Groups[]>(BACKEND_URL + '/groups/'+ userid)
    
      .subscribe((data:any)=>{

        this.groups = data;

      }
    )
  }

  addChannel(groupid: Number){
    console.log(groupid);
  }

  addGroup(){
    console.log("Group Added");
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
