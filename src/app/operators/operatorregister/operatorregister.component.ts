import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operatorregister',
  templateUrl: './operatorregister.component.html',
  styleUrls: ['./operatorregister.component.css']
})
export class OperatorregisterComponent implements OnInit {

  regPhase: number = 0;

  constructor() { }

  ngOnInit() {
    this.regPhase = 1;
  }

}
