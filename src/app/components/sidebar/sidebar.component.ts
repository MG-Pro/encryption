import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  links: object[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Cesar`s code',
      path: '/cesar'
    },
    {
      name: 'Vizhener`s code',
      path: '/vizhener'
    },
    {
      name: 'Steganography LSB',
      path: '/steganography'
    },
  ]
  constructor() { }

}
