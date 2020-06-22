import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';
import { Usersession } from '../../models/usernameexists';
import { Coreresponse, CoreRequest, CoreInterval, GenerationRequest } from '../../models/coreresponse';
import * as CanvasJS from '../../../assets/canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {


  currents: CoreInterval[] = [];
  ambienttemps: number[];
  globalsolaravgs: number[];
  pvtemps: number[];
  voltages: number[];
  loads: number[] = [];

  corerequest: CoreRequest = new CoreRequest();  
  generationrequest: GenerationRequest = new GenerationRequest();

   model1: NgbDateStruct;
   model2: NgbDateStruct;
  active = 'top';

  //chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false    
  usersaddress: string;

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {
   this.usersaddress = localStorage.getItem("usersaddress");  
   this.loadGenerationProfile("2007-12-31");
  }

  private loadGenerationProfile(startdate: string)
  {
    this.generationrequest.startdate = startdate;
    this.generationrequest.sessionID = localStorage.getItem("sessionid");
    this.generationrequest.username = localStorage.getItem("username");  
    this._registrationService.getgenerationprofile(this.generationrequest).subscribe(cr =>
     {
        console.log(cr);
        let dataPoints1 = [];
        dataPoints1.push({ y: parseFloat(cr.body.pvoutput) , name: "PV Output" });
        dataPoints1.push({ y: parseFloat(cr.body.batteryoutput), name: "Battery Output" });
        dataPoints1.push({ y: parseFloat(cr.body.generatoroutput), name: "Generation Output" });

        console.log(dataPoints1);

        //alert(cr.body.batteryoutput + "\n" + cr.body.generatoroutput + "\n" + cr.body.pvoutput);

        let chart2 = new CanvasJS.Chart("chartContainer3", {
         theme: "light2",
         animationEnabled: true,
         exportEnabled: true,
         title:{
           text: "Generation Profile"
         },
         data: [{
           type: "pie",
           showInLegend: true,
           toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
           indexLabel: "{name} - #percent%",
           dataPoints: dataPoints1
         }]
       });
         
       chart2.render();         

     });          
  }  

  private loaderTemplate()
  {
   this.corerequest.startdate = "2007-01-11";
   this.corerequest.enddate = "2007-01-29";
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");  
   this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });      
   this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });       
   this._registrationService.getweeklydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });     
   this._registrationService.getmonthlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });  
   this._registrationService.getyearlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });  

   let chart2 = new CanvasJS.Chart("chartContainer3", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Generation Profile"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "PV Output" },
          { y: 120, name: "Battery Input" },
          { y: 300, name: "Battery Output" },
          { y: 800, name: "Generation Output" }
        ]
      }]
    });
      
    chart2.render();      
  }




  public onDateSelect(event: any)
  {
     alert(event);
     console.log(event);
  }  


  public onStartDateSelect(event: any)
  {
     alert("start date: - " + event);
     console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     this.loadGenerationProfile(event.year + "-" + event.month + "-" + event.day);
  }  
  public onEndDateSelect(event: any)
  {
     alert("end date: - " + event);
     console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
  }    


  public return() {
   this._router.navigate(['customer/main']);
 }      

}
