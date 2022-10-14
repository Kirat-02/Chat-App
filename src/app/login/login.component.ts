import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../service/app.service';
import { Userobj } from '../objects/userobj';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string="";
  password: string="";
  message: string;
  submitted= false;

  constructor(private router: Router, private userdata: AppService) { }

  ngOnInit(): void {}

  submit(){
    this.submitted = true;
    var data = this.userdata.login(this.username, this.password)
    if(data == undefined){
      this.message = 'Invalid Username or Password';
    }
  } 
}
