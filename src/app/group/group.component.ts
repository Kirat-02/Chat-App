import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Groups } from '../objects/groupobj';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  myImgUrl:string='assets/uploads/test.png';

  username = sessionStorage.getItem('username');
  userrole = sessionStorage.getItem('userrole');
  userid = Number(sessionStorage.getItem('userid'));
  userimage = sessionStorage.getItem('userimage');

  id: Number = Number(this.route.snapshot.params['id']);
  groups: Groups[] = [];

  // variables
  newgroupname = '';
  newgroupid: number;
  message: string;

  // collapse bar for group and channel
  public GroupisCollapsed = true;
  public ChannelisCollapsed = true;

  constructor(private router:Router, private route: ActivatedRoute, private service: AppService) { }

  // get the ucrrent user data
  ngOnInit() {
    sessionStorage.setItem('loggedin', 'yes');
    let userid: Number = this.id ;
    this.service.getgroups().subscribe((data)=>{
      this.groups = data;
    })
  }

  // adds a new channel
  addChannel(groupid: Number){
    this.service.newChannel(groupid).subscribe({})
    window.location.reload()
  }

  // deletes a channel
  deleteChannel(groupid: Number, channelid: Number){
    this.service.deleteChannel(groupid, channelid).subscribe({})
    window.location.reload()
  }

  // load channel data
  loadchannel(channelid: Number){
    this.router.navigateByUrl("/channel/"+channelid);
  }

  // add user to channel
  channelAdduser(groupid: Number, channelid: Number){
    this.router.navigateByUrl("/group/"+groupid+"/channel/"+channelid+"/adduser");
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
  
  // logs the user out
  onLogout(){
    sessionStorage.clear();
    this.router.navigateByUrl("/login");               
  }
  // used to delete the group
  deleteGroup(id: Number){
    var group = {id: id}
    this.service.deletegroup(group).subscribe((data)=>{
      window.location.reload();
    })
  }

  // takes to userlist page
  loaduserlist(){
    this.router.navigateByUrl("/userlist");
  }

  // takes to group add user page
  groupAddUser(groupid: Number){
    this.router.navigateByUrl("/group/"+groupid+"/adduser");
  }

}
