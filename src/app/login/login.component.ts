import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};
const BACKEND_URL = 'https://s2179956.elf.ict.griffith.edu.au:3001';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  submit(){
    
    let user = {username:this.username, pwd: this.password};
    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(user));

      alert("postRes: " +JSON.stringify(data));

      if (data.ok){
        alert("correct");
        sessionStorage.setItem('username', data.userid.toString());
        sessionStorage.setItem('userrole', data.ok.toString());
        this.router.navigateByUrl("/account");
      }
      else { alert("email or password incorrect");}


    })
  }

}
