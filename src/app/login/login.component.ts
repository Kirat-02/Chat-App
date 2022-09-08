import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {}

  submit(){
    
    let user = {username:this.username, pwd: this.password};

    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    
    .subscribe((data:any)=>{

      if (data.ok){

        sessionStorage.setItem('username', data.username.toString());
        sessionStorage.setItem('userrole', data.userrole.toString());
        this.router.navigateByUrl("/group");

      } else { 

        alert("email or password incorrect");}

      }
    )
  }
}
