import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

interface User{
  userid: Number;
  username: Text;
  useremail: Text,
  userrole: Text,
  groups: [Number]
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newusername = '';
  newuserpassword = '';
  newuseremail = '';

  username = sessionStorage.getItem('username');
  userlist: User[] = [];

  public isCollapsed = true;  

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient, private _location: Location) { }

  ngOnInit(){
    this.httpClient.get<[User]>(BACKEND_URL + '/userlist')
    
    .subscribe((data:any)=>
      {

        this.userlist = data;

      }
    )
  }

  addUser(){
    let userdetails = {username:this.newusername, email: this.newuseremail, password: this.newuserpassword};
    this.httpClient.post(BACKEND_URL + '/adduser', userdetails, httpOptions)
    .subscribe((data:any)=>{});
    window.location.reload();
  }

  deleteUser(name: Text){
    this.httpClient.delete(BACKEND_URL + '/deleteuser/'+ name)
    .subscribe((data:any)=> {});
    window.location.reload();
  }

  back(){
    this._location.back();
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigateByUrl("");
  }
}