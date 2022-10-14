import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<false>; 
  
  userid=sessionStorage.getItem('userid');

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  
  onLogout(){
    sessionStorage.clear();
    this.authService.logout();                  
  }
}