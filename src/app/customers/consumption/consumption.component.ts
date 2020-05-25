import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Usersession } from '../../models/usernameexists';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {

  type = 'line';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };  
  usersession: Usersession = new Usersession();
  usersaddress: string;

  constructor(private _registrationService: RegistrationService) { }

  ngOnInit() {
    this.usersaddress = localStorage.getItem("usersaddress");
  }

}
