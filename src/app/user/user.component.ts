import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';

import { AppService } from '../service/app.service';
import { Userobj } from '../objects/userobj';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userrole = sessionStorage.getItem('userrole');
  newusername = '';
  newuserpassword = '';
  newuseremail = '';
  newuserrole = '';
  errormsg: string = "";
  newuserid: number = null;
  userlist: Userobj[] = [];

  public isCollapsed = true;  

  constructor(private service: AppService, private router:Router, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(){
    this.getUserlist();
  }


  getUserlist(){
    this.service.getuserlist().subscribe((data)=>{
      this.userlist = data;
    }) 
  }

  addUser = () => {
    let user: Userobj = {id: this.newuserid, name: this.newusername, email: this.newuseremail, password: this.newuserpassword, role: this.newuserrole, groups: []}
    this.service.adduser(user).subscribe((data)=>{
      if(data.err != null){
        this.errormsg = data.err;
      } else {
        this.refresh();
      }
    }) 
  }

  updateUser = (id:number) => {
    let user = {id: id}
    this.service.updateuser(user).subscribe((data)=>{
      this.refresh();
    }) 
  }

  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/userlist']);
    });
  }

  
  deleteUser(id:number){

    if (window.confirm("Do you reallt want to delete this user ?")) {
      let user = {id: id}
      this.service.deleteuser(user).subscribe((data)=>{
        this.refresh();
      }) 
      this.refresh();
    } 
  }

  back(){
    this._location.back();
  }

}
