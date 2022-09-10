import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

import { User } from '../objects/userallobj';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newusername = '';
  newuserpassword = '';
  newuseremail = '';
  userlist: User[] = [];
  

  public isCollapsed = true;  

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient, private _location: Location) { }

  ngOnInit(){
    this.getUserlist();
  }


  getUserlist(){
    this.httpClient.get<[User]>(BACKEND_URL + '/userlist')
    .subscribe((data:any)=>{
      this.userlist = data;
      }
    )
  }

  addUser(){
    let userdetails = {username:this.newusername, email: this.newuseremail, password: this.newuserpassword};
    this.httpClient.post(BACKEND_URL + '/adduser', userdetails, httpOptions)
    .subscribe((data:any)=>{});
    this.refresh();
  }

  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/userlist']);
    });
  }

  deleteUser(name: Text){

    if (window.confirm("Do you reallt want to delete "+name+ "?")) {
      this.httpClient.delete(BACKEND_URL + '/deleteuser/'+ name)
    .subscribe((data:any)=> {});
    this.refresh();
    } 
  }

  back(){
    this._location.back();
  }

}
