import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  username = sessionStorage.getItem('username');
  id: Number = Number(this.route.snapshot.params['id']);

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient, private _location: Location) { }

  ngOnInit(): void {
  }

  sendMessage(){
    console.log("Message Sent");
  }

  back(){
    this._location.back();
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigateByUrl("");
  }

}
