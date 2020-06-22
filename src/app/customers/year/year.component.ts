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
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

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

   this.loadYearlyProfileTemplate();


   this.corerequest.startdate = "2007-1-1";
   this.corerequest.enddate = "2007-11-29";
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");  
   this._registrationService.getmonthlydata(this.corerequest).subscribe(cr =>
   {
         //console.log(cr);

         //console.log(cr.meta);


         
         let dataPoints1 = [];
         let dataPoints2 = [];
         let dataPoints3 = [];
         let dataPoints4 = [];
         let pvoutput = 0;		
         let batteryoutput = 0;
         let generatoroutput = 0;
         for ( var i = 1; i < cr.body.length; i++ ) {		  
           //y += Math.round(5 + Math.random() * (-5 - 5));	
           pvoutput = parseFloat(cr.body[i].pvoutput);
           batteryoutput = parseFloat(cr.body[i].batteryoutput);
           generatoroutput = parseFloat(cr.body[i].generatoroutput);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, i)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, i)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, i)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);
/*         
     
         let chart1 = new CanvasJS.Chart("chartContainer2", {
           animationEnabled: true,
           exportEnabled: true,
           axisX: {
            valueFormatString: "M"
         },
         axisY:{
            title: "Kwh"
         },           
           title: {
             text: "Monthly Profile"
           },
           data: [{
            name: "PV Output",
             type: "stackedColumn",
             showInLegend: true,
             dataPoints: dataPoints1
           },
           {
            name: "Battery Output",
            type: "stackedColumn",
            showInLegend: true,
            dataPoints: dataPoints2
          },
          {
            name: "Generator Output",
            type: "stackedColumn",
            showInLegend: true,
            dataPoints: dataPoints3
          }                   
         ]
         });
           
         chart1.render();          
*/




   });    


/*   
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
   this._registrationService.getyearlydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });   

   var chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      title:{
        text: "Yearly Profile"
      },
      axisX: {
        valueFormatString: "DD MMM,YY"
      },
      axisY: {
        title: "Temperature (in °C)",
        includeZero: false,
        suffix: " °C"
      },
      legend:{
        cursor: "pointer",
        fontSize: 16,
        itemclick: toggleDataSeries
      },
      toolTip:{
        shared: true
      },
      data: [{
        name: "Myrtle Beach",
        type: "spline",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017,6,24), y: 31 },
          { x: new Date(2017,6,25), y: 31 },
          { x: new Date(2017,6,26), y: 29 },
          { x: new Date(2017,6,27), y: 29 },
          { x: new Date(2017,6,28), y: 31 },
          { x: new Date(2017,6,29), y: 30 },
          { x: new Date(2017,6,30), y: 29 }
        ]
      },
      {
        name: "Martha Vineyard",
        type: "spline",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017,6,24), y: 20 },
          { x: new Date(2017,6,25), y: 20 },
          { x: new Date(2017,6,26), y: 25 },
          { x: new Date(2017,6,27), y: 25 },
          { x: new Date(2017,6,28), y: 25 },
          { x: new Date(2017,6,29), y: 25 },
          { x: new Date(2017,6,30), y: 25 }
        ]
      },
      {
        name: "Nantucket",
        type: "spline",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017,6,24), y: 22 },
          { x: new Date(2017,6,25), y: 19 },
          { x: new Date(2017,6,26), y: 23 },
          { x: new Date(2017,6,27), y: 24 },
          { x: new Date(2017,6,28), y: 24 },
          { x: new Date(2017,6,29), y: 23 },
          { x: new Date(2017,6,30), y: 23 }
        ]
      }]
    });
    chart1.render();    
   
    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      chart1.render();
    }
    
    
    var chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      theme: "light2",
      title: {
         text: "Monthly Sales Data"
      },
      axisX: {
         valueFormatString: "MMM"
      },
      axisY: {
         prefix: "$",
         labelFormatter: addSymbols
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
         name: "Actual Sales",
         showInLegend: true,
         xValueFormatString: "MMMM YYYY",
         yValueFormatString: "$#,##0",
         dataPoints: [
            { y: 3.69, label: "1" },
            { y: 3.06, label: "3" },
            { y: 4.08, label: "5" },
            { y: 4.06, label: "7" },
            { y: 4.48, label: "9" },
            { y: 3.45, label: "11" },
            { y: 4.17, label: "13" },
            { y: 4.05, label: "15" },
            { y: 4.05, label: "17" },
            { y: 3.5, label: "19" },
            { y: 4.0, label: "21" },
            { y: 3.86, label: "23" }
         ]
      }, 
      {
         type: "line",
         name: "Expected Sales",
         showInLegend: true,
         yValueFormatString: "$#,##0",
         dataPoints: [
            { y: 3.69, label: "1" },
            { y: 3.06, label: "3" },
            { y: 4.08, label: "5" },
            { y: 4.06, label: "7" },
            { y: 4.48, label: "9" },
            { y: 3.45, label: "11" },
            { y: 4.17, label: "13" },
            { y: 4.05, label: "15" },
            { y: 4.05, label: "17" },
            { y: 3.5, label: "19" },
            { y: 4.0, label: "21" },
            { y: 3.86, label: "23" }
         ]
      },
      {
         type: "area",
         name: "Profit",
         markerBorderColor: "white",
         markerBorderThickness: 2,
         showInLegend: true,
         yValueFormatString: "$#,##0",
         dataPoints: [
            { y: 3.69, label: "1" },
            { y: 3.06, label: "3" },
            { y: 4.08, label: "5" },
            { y: 4.06, label: "7" },
            { y: 4.48, label: "9" },
            { y: 3.45, label: "11" },
            { y: 4.17, label: "13" },
            { y: 4.05, label: "15" },
            { y: 4.05, label: "17" },
            { y: 3.5, label: "19" },
            { y: 4.0, label: "21" },
            { y: 3.86, label: "23" }
         ]
      }]
   });
   chart2.render();

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


var chart = new CanvasJS.Chart("chartContainer4", {
   animationEnabled: true,
   title:{
      text: "Year Profile",
      fontFamily: "arial black",
      fontColor: "#695A42"
   },
   axisX: {
      valueFormatString: "M"
   },
   axisY:{
      title: "Kwh"
   },
   toolTip: {
      shared: true,
      content: toolTipContent
   },
   data: [{
      type: "stackedColumn",
      showInLegend: true,
      color: "#696661",
      name: "PV Output",
      dataPoints: [
         { y: 6.75, x: new Date(2016, 0) },
         { y: 8.57, x: new Date(2016, 1) },
         { y: 10.64, x: new Date(2016, 2) },
         { y: 13.97, x: new Date(2016, 3) },
         { y: 15.42, x: new Date(2016, 4) },
         { y: 17.26, x: new Date(2016, 5) },
         { y: 20.26, x: new Date(2016, 6) },
         { y: 20.26, x: new Date(2016, 7) },
         { y: 20.26, x: new Date(2016, 8) },
         { y: 20.26, x: new Date(2016, 9) },
         { y: 20.26, x: new Date(2016, 10) },               
         { y: 20.26, x: new Date(2016, 11) }
      ]
      },
      {        
         type: "stackedColumn",
         showInLegend: true,
         name: "Battery Output",
         color: "#EDCA93",
         dataPoints: [
            { y: 6.82, x: new Date(2016, 0) },
            { y: 9.02, x: new Date(2016, 1) },
            { y: 11.80, x: new Date(2016, 2) },
            { y: 14.11, x: new Date(2016, 3) },
            { y: 15.96, x: new Date(2016, 4) },
            { y: 17.73, x: new Date(2016, 5) },
            { y: 21.5, x: new Date(2016, 6) },
            { y: 20.26, x: new Date(2016, 7) },
            { y: 20.26, x: new Date(2016, 8) },
            { y: 20.26, x: new Date(2016, 9) },
            { y: 20.26, x: new Date(2016, 10) },
            { y: 20.26, x: new Date(2016, 11) }                  
         ]
      },
      {        
         type: "stackedColumn",
         showInLegend: true,
         name: "Generator Output",
         color: "#695A42",
         dataPoints: [
            { y: 7.28, x: new Date(2016, 0) },
            { y: 9.72, x: new Date(2016, 1) },
            { y: 13.30, x: new Date(2016, 2) },
            { y: 14.9, x: new Date(2016, 3) },
            { y: 18.10, x: new Date(2016, 4) },
            { y: 18.68, x: new Date(2016, 5) },
            { y: 22.45, x: new Date(2016, 6) },
            { y: 20.26, x: new Date(2016, 7) },
            { y: 20.26, x: new Date(2016, 8) },
            { y: 20.26, x: new Date(2016, 9) },
            { y: 20.26, x: new Date(2016, 10) },
            { y: 20.26, x: new Date(2016, 11) }                   
         ]
      },
      {        
         type: "stackedColumn",
         showInLegend: true,
         name: "Q4",
         color: "#B6B1A8",
         dataPoints: [
            { y: 8.44, x: new Date(2016, 0) },
            { y: 10.58, x: new Date(2016, 1) },
            { y: 14.41, x: new Date(2016, 2) },
            { y: 16.86, x: new Date(2016, 3) },
            { y: 10.64, x: new Date(2016, 4) },
            { y: 21.32, x: new Date(2016, 5) },
            { y: 26.06, x: new Date(2016, 6) },
            { y: 20.26, x: new Date(2016, 7) },
            { y: 20.26, x: new Date(2016, 8) },
            { y: 20.26, x: new Date(2016, 9) },
            { y: 20.26, x: new Date(2016, 10) },
            { y: 20.26, x: new Date(2016, 11) }                  
         ]
   }]
});
chart.render();     

function toolTipContent(e) {
   var str = "";
   var total = 0;
   var str2, str3;
   for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
   }
   str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
   total = Math.round(total * 100) / 100;
   str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
   return (str2.concat(str)).concat(str3);
}

*/



  }


  private loadYearlyProfileTemplate()
  {
    var chart = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      title:{
         text: "Year Profile"
      },
      axisX: {
         valueFormatString: "M"
      },
      axisY:{
         title: "Kwh"
      },
      toolTip: {
         shared: true,
         content: toolTipContent
      },
      data: [{
         type: "stackedColumn",
         showInLegend: true,
         name: "PV Output",
         dataPoints: [
            { y: 6.75, x: new Date(2016, 0) },
            { y: 8.57, x: new Date(2016, 1) },
            { y: 10.64, x: new Date(2016, 2) },
            { y: 13.97, x: new Date(2016, 3) },
            { y: 15.42, x: new Date(2016, 4) },
            { y: 17.26, x: new Date(2016, 5) },
            { y: 20.26, x: new Date(2016, 6) },
            { y: 20.26, x: new Date(2016, 7) },
            { y: 20.26, x: new Date(2016, 8) },
            { y: 20.26, x: new Date(2016, 9) },
            { y: 20.26, x: new Date(2016, 10) },               
            { y: 20.26, x: new Date(2016, 11) }
         ]
         },
         {        
            type: "stackedColumn",
            showInLegend: true,
            name: "Battery Output",
            dataPoints: [
               { y: 6.82, x: new Date(2016, 0) },
               { y: 9.02, x: new Date(2016, 1) },
               { y: 11.80, x: new Date(2016, 2) },
               { y: 14.11, x: new Date(2016, 3) },
               { y: 15.96, x: new Date(2016, 4) },
               { y: 17.73, x: new Date(2016, 5) },
               { y: 21.5, x: new Date(2016, 6) },
               { y: 20.26, x: new Date(2016, 7) },
               { y: 20.26, x: new Date(2016, 8) },
               { y: 20.26, x: new Date(2016, 9) },
               { y: 20.26, x: new Date(2016, 10) },
               { y: 20.26, x: new Date(2016, 11) }                  
            ]
         },
         {        
            type: "stackedColumn",
            showInLegend: true,
            name: "Generator Output",
            dataPoints: [
               { y: 7.28, x: new Date(2016, 0) },
               { y: 9.72, x: new Date(2016, 1) },
               { y: 13.30, x: new Date(2016, 2) },
               { y: 14.9, x: new Date(2016, 3) },
               { y: 18.10, x: new Date(2016, 4) },
               { y: 18.68, x: new Date(2016, 5) },
               { y: 22.45, x: new Date(2016, 6) },
               { y: 20.26, x: new Date(2016, 7) },
               { y: 20.26, x: new Date(2016, 8) },
               { y: 20.26, x: new Date(2016, 9) },
               { y: 20.26, x: new Date(2016, 10) },
               { y: 20.26, x: new Date(2016, 11) }                   
            ]
         },
         {        
            type: "stackedColumn",
            showInLegend: true,
            name: "Q4",
            dataPoints: [
               { y: 8.44, x: new Date(2016, 0) },
               { y: 10.58, x: new Date(2016, 1) },
               { y: 14.41, x: new Date(2016, 2) },
               { y: 16.86, x: new Date(2016, 3) },
               { y: 10.64, x: new Date(2016, 4) },
               { y: 21.32, x: new Date(2016, 5) },
               { y: 26.06, x: new Date(2016, 6) },
               { y: 20.26, x: new Date(2016, 7) },
               { y: 20.26, x: new Date(2016, 8) },
               { y: 20.26, x: new Date(2016, 9) },
               { y: 20.26, x: new Date(2016, 10) },
               { y: 20.26, x: new Date(2016, 11) }                  
            ]
      }]
    });
    chart.render();     
    
    function toolTipContent(e) {
      var str = "";
      var total = 0;
      var str2, str3;
      for (var i = 0; i < e.entries.length; i++){
         var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
         total = e.entries[i].dataPoint.y + total;
         str = str.concat(str1);
      }
      str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
      total = Math.round(total * 100) / 100;
      str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
      return (str2.concat(str)).concat(str3);
    }    
  }

  private loadYearlyProfile(startdate: string, enddate: string)
  {
    this.corerequest.startdate = "2007-1-1";
    this.corerequest.enddate = "2007-11-29";
    this.corerequest.sessionID = localStorage.getItem("sessionid");
    this.corerequest.username = localStorage.getItem("username");  
    this._registrationService.getmonthlydata(this.corerequest).subscribe(cr =>
    {
          //console.log(cr);
 
          //console.log(cr.meta);
 
 
/*          
          let dataPoints1 = [];
          let dataPoints2 = [];
          let dataPoints3 = [];
          let dataPoints4 = [];
          let pvoutput = 0;		
          let batteryoutput = 0;
          let generatoroutput = 0;
          for ( var i = 1; i < cr.body.length; i++ ) {		  
            //y += Math.round(5 + Math.random() * (-5 - 5));	
            pvoutput = parseFloat(cr.body[i].pvoutput);
            batteryoutput = parseFloat(cr.body[i].batteryoutput);
            generatoroutput = parseFloat(cr.body[i].generatoroutput);
            dataPoints1.push({ y: pvoutput, x: new Date(2007, i)});
            dataPoints2.push({ y: batteryoutput, x: new Date(2007, i)});
            dataPoints3.push({ y: generatoroutput, x: new Date(2007, i)});
          }
         
          console.log(dataPoints1);   
          console.log(dataPoints2);
          
      
          let chart1 = new CanvasJS.Chart("chartContainer4", {
            animationEnabled: true,
            exportEnabled: true,
            axisX: {
             valueFormatString: "M"
          },
          axisY:{
             title: "Kwh"
          },           
            title: {
              text: "Monthly Profile"
            },
            data: [{
             name: "PV Output",
              type: "stackedColumn",
              showInLegend: true,
              dataPoints: dataPoints1
            },
            {
             name: "Battery Output",
             type: "stackedColumn",
             showInLegend: true,
             dataPoints: dataPoints2
           },
           {
             name: "Generator Output",
             type: "stackedColumn",
             showInLegend: true,
             dataPoints: dataPoints3
           }                   
          ]
          });
            
          chart1.render();    
*/

var chart = new CanvasJS.Chart("chartContainer4", {
  animationEnabled: true,
  title:{
     text: "Year Profile",
     fontFamily: "arial black",
     fontColor: "#695A42"
  },
  axisX: {
     valueFormatString: "M"
  },
  axisY:{
     title: "Kwh"
  },
  toolTip: {
     shared: true,
     content: toolTipContent
  },
  data: [{
     type: "stackedColumn",
     showInLegend: true,
     color: "#696661",
     name: "PV Output",
     dataPoints: [
        { y: 6.75, x: new Date(2016, 0) },
        { y: 8.57, x: new Date(2016, 1) },
        { y: 10.64, x: new Date(2016, 2) },
        { y: 13.97, x: new Date(2016, 3) },
        { y: 15.42, x: new Date(2016, 4) },
        { y: 17.26, x: new Date(2016, 5) },
        { y: 20.26, x: new Date(2016, 6) },
        { y: 20.26, x: new Date(2016, 7) },
        { y: 20.26, x: new Date(2016, 8) },
        { y: 20.26, x: new Date(2016, 9) },
        { y: 20.26, x: new Date(2016, 10) },               
        { y: 20.26, x: new Date(2016, 11) }
     ]
     },
     {        
        type: "stackedColumn",
        showInLegend: true,
        name: "Battery Output",
        color: "#EDCA93",
        dataPoints: [
           { y: 6.82, x: new Date(2016, 0) },
           { y: 9.02, x: new Date(2016, 1) },
           { y: 11.80, x: new Date(2016, 2) },
           { y: 14.11, x: new Date(2016, 3) },
           { y: 15.96, x: new Date(2016, 4) },
           { y: 17.73, x: new Date(2016, 5) },
           { y: 21.5, x: new Date(2016, 6) },
           { y: 20.26, x: new Date(2016, 7) },
           { y: 20.26, x: new Date(2016, 8) },
           { y: 20.26, x: new Date(2016, 9) },
           { y: 20.26, x: new Date(2016, 10) },
           { y: 20.26, x: new Date(2016, 11) }                  
        ]
     },
     {        
        type: "stackedColumn",
        showInLegend: true,
        name: "Generator Output",
        color: "#695A42",
        dataPoints: [
           { y: 7.28, x: new Date(2016, 0) },
           { y: 9.72, x: new Date(2016, 1) },
           { y: 13.30, x: new Date(2016, 2) },
           { y: 14.9, x: new Date(2016, 3) },
           { y: 18.10, x: new Date(2016, 4) },
           { y: 18.68, x: new Date(2016, 5) },
           { y: 22.45, x: new Date(2016, 6) },
           { y: 20.26, x: new Date(2016, 7) },
           { y: 20.26, x: new Date(2016, 8) },
           { y: 20.26, x: new Date(2016, 9) },
           { y: 20.26, x: new Date(2016, 10) },
           { y: 20.26, x: new Date(2016, 11) }                   
        ]
     },
     {        
        type: "stackedColumn",
        showInLegend: true,
        name: "Q4",
        color: "#B6B1A8",
        dataPoints: [
           { y: 8.44, x: new Date(2016, 0) },
           { y: 10.58, x: new Date(2016, 1) },
           { y: 14.41, x: new Date(2016, 2) },
           { y: 16.86, x: new Date(2016, 3) },
           { y: 10.64, x: new Date(2016, 4) },
           { y: 21.32, x: new Date(2016, 5) },
           { y: 26.06, x: new Date(2016, 6) },
           { y: 20.26, x: new Date(2016, 7) },
           { y: 20.26, x: new Date(2016, 8) },
           { y: 20.26, x: new Date(2016, 9) },
           { y: 20.26, x: new Date(2016, 10) },
           { y: 20.26, x: new Date(2016, 11) }                  
        ]
  }]
});
chart.render();     

function toolTipContent(e) {
  var str = "";
  var total = 0;
  var str2, str3;
  for (var i = 0; i < e.entries.length; i++){
     var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
     total = e.entries[i].dataPoint.y + total;
     str = str.concat(str1);
  }
  str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
  total = Math.round(total * 100) / 100;
  str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
  return (str2.concat(str)).concat(str3);
}



 
    });     
  }  

  public onDateSelect(event: any)
  {
     alert(event);
     console.log(event);
     this.corerequest.startdate = "2007-01-11";
     this.corerequest.enddate = "2007-01-29";
     this.corerequest.sessionID = localStorage.getItem("sessionid");
     this.corerequest.username = localStorage.getItem("username");  
     this._registrationService.getmonthlydata(this.corerequest).subscribe(cr =>
     {
           console.log(cr);
     });     
  }  

  public onStartDateSelect(event: any)
  {
   this.corerequest.startdate = event.year + "-" + event.month + "-" + event.day;
     alert("start date: - " + event);
     console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
  }  
  public onEndDateSelect(event: any)
  {
     alert("end date: - " + event);
     console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     this.corerequest.enddate = event.year + "-" + event.month + "-" + event.day;
     this.corerequest.sessionID = localStorage.getItem("sessionid");
     this.corerequest.username = localStorage.getItem("username");  
     this._registrationService.getmonthlydata(this.corerequest).subscribe(cr =>
     {
           console.log(cr);
     });     
  }   

  public return() {
    //alert(_page);
    this._router.navigate(['customer/main']);
  }       

}
