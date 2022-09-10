import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Userobj } from '../objects/userobj';

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

  constructor(private router:Router, private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {}

  submit(){
    let user: Userobj = {username:this.username, userpassword: this.password};
    this.authService.login(user);
  } 
}
