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
  user: Userobj;
  message: string;

  constructor(private router: Router, private userdata: AppService) { }

  ngOnInit(): void {}

  submit(){
    this.userdata.login(this.username, this.password).subscribe((data)=>{
      this.user = data;
      if(data.length == 0){
        this.message='Invalid Username or Password';
      } else {
        sessionStorage.setItem('userid', data[0].id);
        sessionStorage.setItem('username', data[0].name.toString());
        sessionStorage.setItem('userrole', data[0].role.toString());
        if(data[0].image != undefined){
          sessionStorage.setItem('userimage', data[0].image.toString());
        }
        this.router.navigateByUrl("/user/"+data[0].id);
      }
    })
  } 
}
