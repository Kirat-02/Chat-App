import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  username = sessionStorage.getItem('username');
  userrole = sessionStorage.getItem('userrole');

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigateByUrl("");
  }

}
