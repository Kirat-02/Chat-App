import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

interface Channel {
  channelid: Number;
  members: [Number];
}

interface Groups {
  groupid: Number;
  channels: [Channel];
}

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

  loadchannel(id: Number){
    this.router.navigateByUrl("/channel/"+id);
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigateByUrl("");
  }

  groupAddUser(id: Number){
    this.router.navigateByUrl("/group/"+id+"/adduser");
  }

  channelAdduser(id: Number){
    this.router.navigateByUrl("/channel/"+id+"/adduser");
  }

}
