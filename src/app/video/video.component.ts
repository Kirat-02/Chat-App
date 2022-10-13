import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createRoom() {
    console.log('createRoom');
    this.router.navigate([`/${uuidv4()}`]);
  }

  

}
