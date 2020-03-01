import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cesar',
  templateUrl: './cesar.component.html',
  styleUrls: ['./cesar.component.scss']
})
export class CesarComponent {
  title: string = 'Cesar\'s encryption method'
  encryptSource: string
  decryptSource: string

  constructor() { }


}
