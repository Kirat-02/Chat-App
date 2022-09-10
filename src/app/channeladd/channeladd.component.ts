import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from '../backend';
import { Location } from '@angular/common';

// Objects
import { Channel } from '../objects/channelobj';
import { User } from '../objects/userallobj';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Component({
  selector: 'app-channeladd',
  templateUrl: './channeladd.component.html',
  styleUrls: ['./channeladd.component.css']
})
export class ChanneladdComponent implements OnInit {

  groupid: Number = Number(this.route.snapshot.params['groupid']);
  channelid: Number = Number(this.route.snapshot.params['channelid']);
  userrole = sessionStorage.getItem('userrole');
  userlist: User[] = [];
  nonmembers: User[] = [];
  channel: Channel = {'channelid': 0, members: [0]};
  newuserid = '';

  constructor(private router:Router, private _location: Location, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.httpClient.get<[Channel, User[], User[]]>(BACKEND_URL + '/group/'+this.groupid+'/channel/'+this.channelid+'/members')
    .subscribe((data:any)=>{
      this.channel = data[0];
      this.userlist = data[1];
      this.nonmembers = data[2];
    }
  ) 
  }

  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['group/'+this.groupid+'/channel/'+this.channelid+'/adduser']);
    });
  }

  addmember(){
    if(this.newuserid != ''){
      this.httpClient.post(BACKEND_URL + '/group/'+this.groupid+'/channel/'+this.channelid+'/addmember', {'userid': this.newuserid}, httpOptions)
      .subscribe((data:any)=>{});
      this.refresh(); 
    }
  }

  back(){
    this._location.back();
  }
}
