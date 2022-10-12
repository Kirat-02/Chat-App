import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../service/app.service';

// Objects
import { Channel } from '../objects/channelobj';
import { Userobj } from '../objects/userobj';

@Component({
  selector: 'app-channeladd',
  templateUrl: './channeladd.component.html',
  styleUrls: ['./channeladd.component.css']
})

export class ChanneladdComponent implements OnInit {

  // Initiliase variables
  groupid: Number = Number(this.route.snapshot.params['groupid']);
  channelid: Number = Number(this.route.snapshot.params['channelid']);
  userrole = sessionStorage.getItem('userrole');
  userlist: Userobj[] = [];
  nonmembers: Userobj[] = [];
  channel: Channel = {'id': 0, members: [0]};
  newuserid: Number;

  constructor(private router:Router, private _location: Location, private route: ActivatedRoute, private service: AppService) { }

  // gets the channels details, members and non members
  ngOnInit() {
    this.service.loadChannelUsers(this.groupid, this.channelid).subscribe((data: any)=>{
      console.log(data)
      this.channel = data[0];
      this.userlist = data[1];
      this.nonmembers = data[2];
    }) 
  }

  // used to trigger a refresh to the page
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['group/'+this.groupid+'/channel/'+this.channelid+'/adduser']);
    });
  }

  // adds a member to channel
  addmember(){
    this.service.addChannelMember(this.newuserid, this.channelid).subscribe();
    window.location.reload();
  }

  // deletes a member from channel
  deletemember(memberid: Number){
    this.service.deleteChannelMember(memberid, this.channelid).subscribe();
    window.location.reload();
  }

  back(){
    this._location.back();
  }
}
