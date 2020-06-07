import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';
import { Usersession } from '../../models/usernameexists';
import { Coreresponse, CoreRequest, CoreInterval } from '../../models/coreresponse';
import * as CanvasJS from '../../../assets/canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {


   currents: CoreInterval[] = [];
   ambienttemps: number[];
   globalsolaravgs: number[];
   pvtemps: number[];
   voltages: number[];
   loads: number[] = [];
 
   corerequest: CoreRequest = new CoreRequest();    

   model1: NgbDateStruct;
   model2: NgbDateStruct;
  active = 'top';

  //chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  usersession: Usersession = new Usersession();
  usersaddress: string;    

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {
   this.usersaddress = localStorage.getItem("usersaddress");

   this.corerequest.startdate = "2007-01-11";
   this.corerequest.enddate = "2007-01-29";
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");  
   this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    }); 

    this.loadPVProperties(this.corerequest.startdate, this.corerequest.enddate);
/*         
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

   var chart6 = new CanvasJS.Chart("chartContainer5", {
      animationEnabled: true,
      theme: "light2",
      title: {
         text: "PV Properties"
      },
      axisX: {
         valueFormatString: "H"
      },
      axisY: {
         title: "Kwh"
      },
      toolTip: {
         shared: true
      },
      legend: {
         cursor: "pointer",
         itemclick: toggleDataSeries6
      },
      data: [
      {
         type: "column",
         name: "Global Solar (Kwh/m2)",
         showInLegend: true,
         xValueFormatString: "MMMM YYYY",
         yValueFormatString: "$#,##0",
         dataPoints: [
            { x: new Date(2016, 0, 1, 1, 0), y: 20000 },
            { x: new Date(2016, 0, 1, 2, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 3, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 4, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 5, 0), y: 25000 },
            { x: new Date(2016, 0, 1, 6, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 7, 0), y: 70000 },
            { x: new Date(2016, 0, 1, 8, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 9, 0), y: 50000 },
            { x: new Date(2016, 0, 1, 10, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 11, 0), y: 35000 },
            { x: new Date(2016, 0, 1, 12, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 13, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 14, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
            { x: new Date(2016, 0, 1, 16, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 17, 0), y: 35000 },
            { x: new Date(2016, 0, 1, 18, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 19, 0), y: 30000},
            { x: new Date(2016, 0, 1, 20, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 21, 0), y: 40000 },
            { x: new Date(2016, 0, 1, 22, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
            { x: new Date(2016, 0, 1, 24, 0), y: 30000 },
         ]
      }, 
      {
         type: "line",
         name: "Ambient Temp",
         showInLegend: true,
         yValueFormatString: "$#,##0",
         dataPoints: [
            { x: new Date(2016, 0, 1, 1, 0), y: 40000 },
            { x: new Date(2016, 0, 1, 2, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 3, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 4, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 5, 0), y: 45000 },
            { x: new Date(2016, 0, 1, 6, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 7, 0), y: 45000 },
            { x: new Date(2016, 0, 1, 8, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 9, 0), y: 47000 },
            { x: new Date(2016, 0, 1, 10, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 11, 0), y: 43000 },
            { x: new Date(2016, 0, 1, 12, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 13, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 14, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
            { x: new Date(2016, 0, 1, 16, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 17, 0), y: 41000 },
            { x: new Date(2016, 0, 1, 18, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 19, 0), y: 45000 },
            { x: new Date(2016, 0, 1, 20, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 21, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 22, 0), y: 42000 },
            { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
            { x: new Date(2016, 0, 1, 24, 0), y: 42000 }
         ]
      },
      {
         type: "area",
         name: "PV Temp",
         markerBorderColor: "white",
         markerBorderThickness: 2,
         showInLegend: true,
         yValueFormatString: "$#,##0",
         dataPoints: [
            { x: new Date(2016, 0, 1, 1, 0), y: 5000 },
            { x: new Date(2016, 0, 1, 2, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 3, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 4, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 5, 0), y: 6000},
            { x: new Date(2016, 0, 1, 6, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 7, 0), y: 30000 },
            { x: new Date(2016, 0, 1, 8, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 9, 0), y: 20000 },
            { x: new Date(2016, 0, 1, 10, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 11, 0), y: 15000 },
            { x: new Date(2016, 0, 1, 12, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 13, 0), y: 13000 },
            { x: new Date(2016, 0, 1, 14, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 15, 0), y: 20000 },
            { x: new Date(2016, 0, 1, 16, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 17, 0), y: 15000 },
            { x: new Date(2016, 0, 1, 18, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 19, 0), y:  10000},
            { x: new Date(2016, 0, 1, 20, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 21, 0), y: 19000 },
            { x: new Date(2016, 0, 1, 22, 0), y: 7000 },
            { x: new Date(2016, 0, 1, 23, 0), y: 22000 },
            { x: new Date(2016, 0, 1, 24, 0), y: 7000 },
         ]
      }]
   });
   chart6.render();
   
   function addSymbols(e) {
      var suffixes = ["", "K", "M", "B"];
      var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
   
      if(order > suffixes.length - 1)                	
         order = suffixes.length - 1;
   
      var suffix = suffixes[order];      
      return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
   }
   
   function toggleDataSeries6(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
         e.dataSeries.visible = false;
      } else {
         e.dataSeries.visible = true;
      }
      e.chart.render();
   }   
*/

  }

  public onDateSelect(event: any)
  {
     alert(event);
     console.log(event);
     this.corerequest.startdate = "2007-01-11";
     this.corerequest.enddate = "2007-01-29";
     this.corerequest.sessionID = localStorage.getItem("sessionid");
     this.corerequest.username = localStorage.getItem("username");  
     this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
      {
         console.log(cr);
      });      
  } 
  
  
  private loadTemplate(startdate: string, enddate: string)
  {
    this.corerequest.startdate = "2007-01-11";
    this.corerequest.enddate = "2007-01-29";
    this.corerequest.sessionID = localStorage.getItem("sessionid");
    this.corerequest.username = localStorage.getItem("username");  
    this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
     {
        console.log(cr);
        var chart6 = new CanvasJS.Chart("chartContainer5", {
          animationEnabled: true,
          theme: "light2",
          title: {
             text: "PV Properties"
          },
          axisX: {
             valueFormatString: "H"
          },
          axisY: {
             title: "Kwh"
          },
          toolTip: {
             shared: true
          },
          legend: {
             cursor: "pointer",
             itemclick: toggleDataSeries6
          },
          data: [
          {
             type: "column",
             name: "Global Solar (Kwh/m2)",
             showInLegend: true,
             xValueFormatString: "MMMM YYYY",
             yValueFormatString: "$#,##0",
             dataPoints: [
                { x: new Date(2016, 0, 1, 1, 0), y: 20000 },
                { x: new Date(2016, 0, 1, 2, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 3, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 4, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 5, 0), y: 25000 },
                { x: new Date(2016, 0, 1, 6, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 7, 0), y: 70000 },
                { x: new Date(2016, 0, 1, 8, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 9, 0), y: 50000 },
                { x: new Date(2016, 0, 1, 10, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 11, 0), y: 35000 },
                { x: new Date(2016, 0, 1, 12, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 13, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 14, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
                { x: new Date(2016, 0, 1, 16, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 17, 0), y: 35000 },
                { x: new Date(2016, 0, 1, 18, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 19, 0), y: 30000},
                { x: new Date(2016, 0, 1, 20, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 21, 0), y: 40000 },
                { x: new Date(2016, 0, 1, 22, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
                { x: new Date(2016, 0, 1, 24, 0), y: 30000 },
             ]
          }, 
          {
             type: "line",
             name: "Ambient Temp",
             showInLegend: true,
             yValueFormatString: "$#,##0",
             dataPoints: [
                { x: new Date(2016, 0, 1, 1, 0), y: 40000 },
                { x: new Date(2016, 0, 1, 2, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 3, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 4, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 5, 0), y: 45000 },
                { x: new Date(2016, 0, 1, 6, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 7, 0), y: 45000 },
                { x: new Date(2016, 0, 1, 8, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 9, 0), y: 47000 },
                { x: new Date(2016, 0, 1, 10, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 11, 0), y: 43000 },
                { x: new Date(2016, 0, 1, 12, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 13, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 14, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
                { x: new Date(2016, 0, 1, 16, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 17, 0), y: 41000 },
                { x: new Date(2016, 0, 1, 18, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 19, 0), y: 45000 },
                { x: new Date(2016, 0, 1, 20, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 21, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 22, 0), y: 42000 },
                { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
                { x: new Date(2016, 0, 1, 24, 0), y: 42000 }
             ]
          },
          {
             type: "area",
             name: "PV Temp",
             markerBorderColor: "white",
             markerBorderThickness: 2,
             showInLegend: true,
             yValueFormatString: "$#,##0",
             dataPoints: [
                { x: new Date(2016, 0, 1, 1, 0), y: 5000 },
                { x: new Date(2016, 0, 1, 2, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 3, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 4, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 5, 0), y: 6000},
                { x: new Date(2016, 0, 1, 6, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 7, 0), y: 30000 },
                { x: new Date(2016, 0, 1, 8, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 9, 0), y: 20000 },
                { x: new Date(2016, 0, 1, 10, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 11, 0), y: 15000 },
                { x: new Date(2016, 0, 1, 12, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 13, 0), y: 13000 },
                { x: new Date(2016, 0, 1, 14, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 15, 0), y: 20000 },
                { x: new Date(2016, 0, 1, 16, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 17, 0), y: 15000 },
                { x: new Date(2016, 0, 1, 18, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 19, 0), y:  10000},
                { x: new Date(2016, 0, 1, 20, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 21, 0), y: 19000 },
                { x: new Date(2016, 0, 1, 22, 0), y: 7000 },
                { x: new Date(2016, 0, 1, 23, 0), y: 22000 },
                { x: new Date(2016, 0, 1, 24, 0), y: 7000 },
             ]
          }]
       });
       chart6.render();
       
       function addSymbols(e) {
          var suffixes = ["", "K", "M", "B"];
          var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
       
          if(order > suffixes.length - 1)                	
             order = suffixes.length - 1;
       
          var suffix = suffixes[order];      
          return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
       }
       
       function toggleDataSeries6(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
             e.dataSeries.visible = false;
          } else {
             e.dataSeries.visible = true;
          }
          e.chart.render();
       }         
     });     
  }  


  private loadPVProperties(startdate: string, enddate: string)
  {

   this.corerequest.startdate = startdate;
   this.corerequest.enddate = enddate;
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");  
   this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);


       console.log(cr.body);
   
       console.log(cr.meta);
       let dataPoints1 = [];
       let dataPoints2 = [];
       let dataPoints3 = [];
       let dataPoints4 = [];
       let pvoutput = 0;		
       let batteryoutput = 0;
       let generatoroutput = 0;
       for ( var i = 1; i < cr.body.length; i++ ) {		  
         //y += Math.round(5 + Math.random() * (-5 - 5));	
         //pvoutput = parseFloat(cr.body[i].pvoutput);
         //batteryoutput = parseFloat(cr.body[i].batteryoutput);
         //generatoroutput = parseFloat(cr.body[i].generatoroutput);
         //dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, 11, i, 0)});
         //dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, 11, i, 0)});
         //dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, 11, i, 0)});
       }
      
       console.log(dataPoints1);   
       console.log(dataPoints2);       





       var chart = new CanvasJS.Chart("chartContainer", {
         animationEnabled: true,
         title:{
            text: "PV Properties"
         },	
         axisX: {
            valueFormatString: "H"
         },         
         axisY: {
            title: "deg F",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
         },
         axisY2: {
            title: "KW/m2",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
         },	
         toolTip: {
            shared: true
         },
         legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
         },
         data: [
            
            {
               type: "column",
               name: "Global Solar (Kwh/m2)",
               showInLegend: true,
               xValueFormatString: "MMMM YYYY",
               yValueFormatString: "$#,##0",
               dataPoints: [
                  { x: new Date(2016, 0, 1, 1, 0), y: 20000 },
                  { x: new Date(2016, 0, 1, 2, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 3, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 4, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 5, 0), y: 25000 },
                  { x: new Date(2016, 0, 1, 6, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 7, 0), y: 70000 },
                  { x: new Date(2016, 0, 1, 8, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 9, 0), y: 50000 },
                  { x: new Date(2016, 0, 1, 10, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 11, 0), y: 35000 },
                  { x: new Date(2016, 0, 1, 12, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 13, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 14, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
                  { x: new Date(2016, 0, 1, 16, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 17, 0), y: 35000 },
                  { x: new Date(2016, 0, 1, 18, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 19, 0), y: 30000},
                  { x: new Date(2016, 0, 1, 20, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 21, 0), y: 40000 },
                  { x: new Date(2016, 0, 1, 22, 0), y: 30000 },
                  { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
                  { x: new Date(2016, 0, 1, 24, 0), y: 30000 },
               ]
            },          
            
            
            {
            type: "line",
            name: "Ambient Temp",
            legendText: "Ambient Temp",
            showInLegend: true, 
            dataPoints: [
               { x: new Date(2016, 0, 1, 1, 0), y: 40000 },
               { x: new Date(2016, 0, 1, 2, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 3, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 4, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 5, 0), y: 45000 },
               { x: new Date(2016, 0, 1, 6, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 7, 0), y: 45000 },
               { x: new Date(2016, 0, 1, 8, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 9, 0), y: 47000 },
               { x: new Date(2016, 0, 1, 10, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 11, 0), y: 43000 },
               { x: new Date(2016, 0, 1, 12, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 13, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 14, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 15, 0), y: 43000 },
               { x: new Date(2016, 0, 1, 16, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 17, 0), y: 41000 },
               { x: new Date(2016, 0, 1, 18, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 19, 0), y: 45000 },
               { x: new Date(2016, 0, 1, 20, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 21, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 22, 0), y: 42000 },
               { x: new Date(2016, 0, 1, 23, 0), y: 50000 },
               { x: new Date(2016, 0, 1, 24, 0), y: 42000 }
            ]
         },
         {
            type: "area",	
            name: "PV Temp",
            legendText: "PV Temp",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: [
               { x: new Date(2016, 0, 1, 1, 0), y: 5000 },
               { x: new Date(2016, 0, 1, 2, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 3, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 4, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 5, 0), y: 6000},
               { x: new Date(2016, 0, 1, 6, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 7, 0), y: 30000 },
               { x: new Date(2016, 0, 1, 8, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 9, 0), y: 20000 },
               { x: new Date(2016, 0, 1, 10, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 11, 0), y: 15000 },
               { x: new Date(2016, 0, 1, 12, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 13, 0), y: 13000 },
               { x: new Date(2016, 0, 1, 14, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 15, 0), y: 20000 },
               { x: new Date(2016, 0, 1, 16, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 17, 0), y: 15000 },
               { x: new Date(2016, 0, 1, 18, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 19, 0), y:  10000},
               { x: new Date(2016, 0, 1, 20, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 21, 0), y: 19000 },
               { x: new Date(2016, 0, 1, 22, 0), y: 7000 },
               { x: new Date(2016, 0, 1, 23, 0), y: 22000 },
               { x: new Date(2016, 0, 1, 24, 0), y: 7000 },
            ]
         }]
      });
      chart.render();
      
      function toggleDataSeries(e) {
         if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
         }
         else {
            e.dataSeries.visible = true;
         }
         chart.render();
      } 
       

    });       
  }



  public onStartDateSelect(event: any)
  {
     //alert("start date: - " + event);
     console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     this.loadPVProperties(event.year + "-" +event.month + "-01", event.year + "-" + event.month + "-29");
  }  
  public onEndDateSelect(event: any)
  {
     //alert("end date: - " + event);
     console.log(event);
     this.loadPVProperties("2007-01-11", "2007-01-29");
     //this.optFromInput = JSON.parse(this.optFromInputString2);
  }   

  public return() {
    //alert(_page);
    this._router.navigate(['customer/main']);
  }       

}
