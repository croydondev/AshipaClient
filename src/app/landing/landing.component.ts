import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  public customers() {
    this._router.navigate(['/customer/login'])
  }  
  public operators() {
    alert("seen!");
    this._router.navigate(['/operator/login'])
  }

}
