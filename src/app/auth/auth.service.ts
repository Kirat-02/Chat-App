import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Userobj } from '../objects/userobj';
import { BACKEND_URL } from '../backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  login(user: Userobj){
    
    if (user.username !== '' && user.userpassword !== '' ) { 

      this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    
      .subscribe((data:any)=>{

        if (data.ok){

          sessionStorage.setItem('userid', data.userid);
          sessionStorage.setItem('username', data.username.toString());
          sessionStorage.setItem('userrole', data.userrole.toString());
          this.loggedIn.next(true);
          localStorage.setItem("auth", JSON.stringify(true));
          this.router.navigateByUrl("/user/"+data.userid);

        } else { 

          alert("email or password incorrect");}

        }
      ) 
    }
  }

  logout() {           
    window.sessionStorage.clear();               
    this.loggedIn.next(false);
    localStorage.getItem("auth");
    this.router.navigate(['/login']);
  }

  loaduserlist(){
    this.router.navigateByUrl("/userlist");
  }

}