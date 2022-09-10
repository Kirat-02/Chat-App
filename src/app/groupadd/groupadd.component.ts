import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from '../backend';
import { Location } from '@angular/common';

// Objects 
import { Groups } from '../objects/groupobj';
import { Channel } from '../objects/channelobj';
import { User } from '../objects/userallobj';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Component({
  selector: 'app-groupadd',
  templateUrl: './groupadd.component.html',
  styleUrls: ['./groupadd.component.css']
})
export class GroupaddComponent implements OnInit {

  username = sessionStorage.getItem('username');
  userrole = sessionStorage.getItem('userrole');
  groupid: Number = Number(this.route.snapshot.params['groupid']);
  channel: Channel = {'channelid': 0, "members": [0] };
  group: Groups = {'groupid': 0, 'members': [0], 'admin': [0], 'assistant': [0], 'channels': [this.channel] };
  userlist: User[] = [];
  nonmembers: User[] = [];
  newuserid = '';
  newuserrole = 'normal';
  
  public isCollapsed = true;  

  constructor(private router:Router, private _location: Location, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.httpClient.get<[Groups[], User[], User[]]>(BACKEND_URL + '/group/'+this.groupid+'/members')
      .subscribe((data:any)=>{
        this.group = data[0];
        this.userlist = data[1];
        this.nonmembers = data[2];
      }
    ) 
  }

  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['group/'+this.groupid+'/adduser']);
    });
  }

  addmember(){
    if(this.newuserid != '' && this.newuserrole != ''){
      let newuser = {'userid': this.newuserid, 'userrole': this.newuserrole};
      this.httpClient.post(BACKEND_URL + '/group/'+this.groupid+'/addmember', newuser, httpOptions)
      .subscribe((data:any)=>{});
      this.refresh();  
    }
  }

  back(){
    this._location.back();
  }
}
