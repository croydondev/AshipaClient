import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';
import { Coreresponse, CoreRequest, CoreInterval } from '../../models/coreresponse';
import * as CanvasJS from '../../../assets/canvasjs.min';
import * as $ from 'jquery';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

   show = false;
   autohide = true;

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

  Highcharts: typeof Highcharts = Highcharts; // required
  //chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false    
  usersaddress: string;

  constructor(public toastService: ToastService, private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {

/*   
   this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
   {
         //this.loads = [cr.meta.count];
         console.log(cr.body);
         for (let i = 0; i < cr.meta.count; i++) {
            //console.log(cr.body[i].load);
            //this.currents.push(cr.body);
            //this.loads.push(parseFloat(cr.body[i].load));
            //this.loads[i] = parseInt(cr.body[i].load);
            this.loads.push(parseFloat(cr.body[i].load));
          }
          console.log(this.loads);

         for (let i = 0; i < cr.meta.count; i++) {
            //console.log(parseFloat(this.currents[i].voltage));
            this.loads.push();
          }   
                    
            
          //alert(this.loads[1]);
          //console.log(this.loads);     
         //alert(this.currents.length);         
         //this.currents.push(cr);
   });
   let chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Daily Profile"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "1" },
          { y: 55, label: "3" },
          { y: 50, label: "5" },
          { y: 65, label: "7" },
          { y: 95, label: "9" },
          { y: 68, label: "11" },
          { y: 28, label: "13" },
          { y: 34, label: "15" },
          { y: 14, label: "17" },
          { y: 24, label: "19" },
          { y: 44, label: "21" },
          { y: 34, label: "23" }
        ]
      }]
    });
      
    chart1.render();   
*/

this.corerequest.startdate = "2007-01-11";
this.corerequest.enddate = "2007-01-11";
this.corerequest.sessionID = localStorage.getItem("sessionid");
this.corerequest.username = localStorage.getItem("username");    
this.usersaddress = localStorage.getItem("usersaddress");

this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
   {

      console.log(cr);

      console.log(cr.meta);
      let dataPoints1 = [];
      let dataPoints2 = [];
      let dataPoints3 = [];
      let dataPoints4 = [];
      let dataPoints5 = [];
      let pvoutput = 0;		
      let batteryoutput = 0;
      let generatoroutput = 0;
      let excessenergy = 0;
      let load = 0;
      for ( var i = 1; i < cr.body.length; i++ ) {		  
        //y += Math.round(5 + Math.random() * (-5 - 5));	
        pvoutput = parseFloat(cr.body[i].pvoutput);
        batteryoutput = parseFloat(cr.body[i].batteryoutput);
        generatoroutput = parseFloat(cr.body[i].generatoroutput);
        excessenergy = parseFloat(cr.body[i].excessenergy);
        load = parseFloat(cr.body[i].load);
        dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, 11, i, 0)});
        dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, 11, i, 0)});
        dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, 11, i, 0)});
        dataPoints4.push({ y: excessenergy, x: new Date(2007, 0, 11, i, 0)});
        dataPoints5.push({ y: load, x: new Date(2007, 0, 11, i, 0)});
      }
     
      console.log(dataPoints1);   
      console.log(dataPoints2);
  
      let chart1 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        exportEnabled: true,
        axisX: {
         valueFormatString: "H"
      },
      axisY:{
         title: "Kwh"
      },           
        title: {
          text: "Daily Profile"
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
       },
       {
         type: "line",
         name: "Load",
         legendText: "Load",
         showInLegend: true, 
         dataPoints: dataPoints4
      },
      {
         type: "line",
         name: "Excess Energy",
         legendText: "Excess Energy",
         showInLegend: true, 
         dataPoints: dataPoints5
      }                                
      ]
      });
        
      chart1.render();      




/*
      var chart = new CanvasJS.Chart("chartContainer1", {
         animationEnabled: true,
         title:{
            text: "Daily Profile",
            fontFamily: "arial black",
            fontColor: "#695A42"
         },
         axisX: {
            valueFormatString: "H"
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
               { y: 6.75, x: new Date(2016, 0, 1, 1, 0) },
               { y: 8.57, x: new Date(2016, 0, 1, 2, 0) },
               { y: 10.64, x: new Date(2016, 0, 1, 3, 0) },
               { y: 13.97, x: new Date(2016, 0, 1, 4, 0) },
               { y: 15.42, x: new Date(2016, 0, 1, 5, 0) },
               { y: 17.26, x: new Date(2016, 0, 1, 6, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 7, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 8, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 9, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 10, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 11, 0) },               
               { y: 20.26, x: new Date(2016, 0, 1, 12, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 13, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 14, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 15, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 16, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 17, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 18, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 19, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 20, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 21, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 22, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 23, 0) },
               { y: 20.26, x: new Date(2016, 0, 1, 24, 0) }
            ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Battery Output",
               color: "#EDCA93",
               dataPoints: [
                  { y: 6.82, x: new Date(2016, 0, 1, 1, 0) },
                  { y: 9.02, x: new Date(2016, 0, 1, 2, 0) },
                  { y: 11.80, x: new Date(2016, 0, 1, 3, 0) },
                  { y: 14.11, x: new Date(2016, 0, 1, 4, 0) },
                  { y: 15.96, x: new Date(2016, 0, 1, 5, 0) },
                  { y: 17.73, x: new Date(2016, 0, 1, 6, 0) },
                  { y: 21.5, x: new Date(2016, 0, 1, 7, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 8, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 9, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 10, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 11, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 12, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 13, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 14, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 15, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 16, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 17, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 18, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 19, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 20, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 21, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 22, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 23, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 24, 0) }                  
               ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Generator Output",
               color: "#695A42",
               dataPoints: [
                  { y: 7.28, x: new Date(2016, 0, 1, 1, 0) },
                  { y: 9.72, x: new Date(2016, 0, 1, 2, 0) },
                  { y: 13.30, x: new Date(2016, 0, 1, 3, 0) },
                  { y: 14.9, x: new Date(2016, 0, 1, 4, 0) },
                  { y: 18.10, x: new Date(2016, 0, 1, 5, 0) },
                  { y: 18.68, x: new Date(2016, 0, 1, 6, 0) },
                  { y: 22.45, x: new Date(2016, 0, 1, 7, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 8, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 9, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 10, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 11, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 12, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 13, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 14, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 15, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 16, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 17, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 18, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 19, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 20, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 21, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 22, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 23, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 24, 0) }                   
               ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Q4",
               color: "#B6B1A8",
               dataPoints: [
                  { y: 8.44, x: new Date(2016, 0, 1, 1, 0) },
                  { y: 10.58, x: new Date(2016, 0, 1, 2, 0) },
                  { y: 14.41, x: new Date(2016, 0, 1, 3, 0) },
                  { y: 16.86, x: new Date(2016, 0, 1, 4, 0) },
                  { y: 10.64, x: new Date(2016, 0, 1, 5, 0) },
                  { y: 21.32, x: new Date(2016, 0, 1, 6, 0) },
                  { y: 26.06, x: new Date(2016, 0, 1, 7, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 8, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 9, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 10, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 11, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 12, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 13, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 14, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 15, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 16, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 17, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 18, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 19, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 20, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 21, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 22, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 23, 0) },
                  { y: 20.26, x: new Date(2016, 0, 1, 24, 0) }                  
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

/*      
      var chart = new CanvasJS.Chart("chartContainer1", {
         animationEnabled: true,
         title:{
            text: "Daily Profile",
            fontFamily: "arial black",
            fontColor: "#695A42"
         },
         axisX: {
            interval: 1,
            intervalType: "year"
         },
         axisY:{
            title: "Kwh"
         },
         data: [{
            type: "stackedColumn",
            showInLegend: true,
            color: "#696661",
            name: "PV Output",
            dataPoints: [
               { y: 6.75, x: new Date(2010,0) },
               { y: 8.57, x: new Date(2011,0) },
               { y: 10.64, x: new Date(2012,0) },
               { y: 13.97, x: new Date(2013,0) },
               { y: 15.42, x: new Date(2014,0) },
               { y: 17.26, x: new Date(2015,0) },
               { y: 20.26, x: new Date(2016,0) }
            ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Battery Output",
               color: "#EDCA93",
               dataPoints: [
                  { y: 6.82, x: new Date(2010,0) },
                  { y: 9.02, x: new Date(2011,0) },
                  { y: 11.80, x: new Date(2012,0) },
                  { y: 14.11, x: new Date(2013,0) },
                  { y: 15.96, x: new Date(2014,0) },
                  { y: 17.73, x: new Date(2015,0) },
                  { y: 21.5, x: new Date(2016,0) }
               ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Generator Output",
               color: "#695A42",
               dataPoints: [
                  { y: 7.28, x: new Date(2010,0) },
                  { y: 9.72, x: new Date(2011,0) },
                  { y: 13.30, x: new Date(2012,0) },
                  { y: 14.9, x: new Date(2013,0) },
                  { y: 18.10, x: new Date(2014,0) },
                  { y: 18.68, x: new Date(2015,0) },
                  { y: 22.45, x: new Date(2016,0) }
               ]
            },
            {        
               type: "stackedColumn",
               showInLegend: true,
               name: "Q4",
               color: "#B6B1A8",
               dataPoints: [
                  { y: 8.44, x: new Date(2010,0) },
                  { y: 10.58, x: new Date(2011,0) },
                  { y: 14.41, x: new Date(2012,0) },
                  { y: 16.86, x: new Date(2013,0) },
                  { y: 10.64, x: new Date(2014,0) },
                  { y: 21.32, x: new Date(2015,0) },
                  { y: 26.06, x: new Date(2016,0) }
               ]
         }]
      });
      chart.render();      
*/
   });


  }

  private loadDailyProfile(startdate: string, enddate: string)
  {
    this.corerequest.startdate = startdate;
    this.corerequest.enddate = enddate;
    this.corerequest.sessionID = localStorage.getItem("sessionid");
    this.corerequest.username = localStorage.getItem("username");    
    this.usersaddress = localStorage.getItem("usersaddress");    

    this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
      {   
         console.log(cr);
   
         console.log(cr.meta);
         let dataPoints1 = [];
         let dataPoints2 = [];
         let dataPoints3 = [];
         let dataPoints4 = [];
         let dataPoints5 = [];
         let pvoutput = 0;		
         let batteryoutput = 0;
         let generatoroutput = 0;
         let excessenergy = 0;
         let load = 0;
         for ( var i = 1; i < cr.body.length; i++ ) {		  
           //y += Math.round(5 + Math.random() * (-5 - 5));	
           pvoutput = parseFloat(cr.body[i].pvoutput);
           batteryoutput = parseFloat(cr.body[i].batteryoutput);
           generatoroutput = parseFloat(cr.body[i].generatoroutput);
           excessenergy = parseFloat(cr.body[i].excessenergy);
           load = parseFloat(cr.body[i].load);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints4.push({ y: excessenergy, x: new Date(2007, 0, 11, i, 0)});
           dataPoints5.push({ y: load, x: new Date(2007, 0, 11, i, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);
     
         let chart1 = new CanvasJS.Chart("chartContainer2", {
           animationEnabled: true,
           exportEnabled: true,
           axisX: {
            valueFormatString: "H"
         },
         axisY:{
            title: "Kwh"
         },           
           title: {
             text: "Daily Profile"
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
          },
          {
            type: "line",
            name: "Load",
            legendText: "Load",
            showInLegend: true, 
            dataPoints: dataPoints4
         },
         {
            type: "line",
            name: "Excess Energy",
            legendText: "Excess Energy",
            showInLegend: true, 
            dataPoints: dataPoints5
         }                             
         ]
         });
           
         chart1.render();          
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
  
     this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
        {
           console.log(cr);
        });     
  }  

  public onStartDateSelect(event: any)
  {
      this.corerequest.startdate = event.year + "-" + event.month + "-" + event.day;     
     //alert("start date: - " + event.year + "-" + event.month + "-" + event.day + "\n" + this.corerequest.startdate);
     //console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);

     this.loadDailyProfile(this.corerequest.startdate, this.corerequest.startdate);
  }  
  public onEndDateSelect(event: any)
  {
      this.corerequest.enddate = event.year + "-" + event.month + "-" + event.day;
      alert("end date: - " +  + event.year + "-" + event.month + "-" + event.day + "\n" + this.corerequest.startdate + "\n" + this.corerequest.enddate);
      //console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     //this.corerequest.startdate = "2007-01-11";
     //this.corerequest.enddate = "2007-01-11";     
     this.corerequest.sessionID = localStorage.getItem("sessionid");
     this.corerequest.username = localStorage.getItem("username");       

     this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
      {
         console.log(cr);

         console.log(cr.meta);
         let dataPoints1 = [];
         let dataPoints2 = [];
         let dataPoints3 = [];
         let dataPoints4 = [];
         let dataPoints5 = [];
         let pvoutput = 0;		
         let batteryoutput = 0;
         let generatoroutput = 0;
         let excessenergy = 0;
         let load = 0;
         for ( var i = 1; i < cr.body.length; i++ ) {		  
           //y += Math.round(5 + Math.random() * (-5 - 5));	
           pvoutput = parseFloat(cr.body[i].pvoutput);
           batteryoutput = parseFloat(cr.body[i].batteryoutput);
           generatoroutput = parseFloat(cr.body[i].generatoroutput);
           excessenergy = parseFloat(cr.body[i].excessenergy);
           load = parseFloat(cr.body[i].load);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints4.push({ y: excessenergy, x: new Date(2007, 0, 11, i, 0)});
           dataPoints5.push({ y: load, x: new Date(2007, 0, 11, i, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);
     
         let chart1 = new CanvasJS.Chart("chartContainer2", {
           animationEnabled: true,
           exportEnabled: true,
           axisX: {
            valueFormatString: "H"
         },
         axisY:{
            title: "Kwh"
         },           
           title: {
             text: "Daily Profile"
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
          },
          {
            type: "line",
            name: "Load",
            legendText: "Load",
            showInLegend: true, 
            dataPoints: dataPoints4
         },
         {
            type: "line",
            name: "Excess Energy",
            legendText: "Excess Energy",
            showInLegend: true, 
            dataPoints: dataPoints5
         }                          
         ]
         });
           
         chart1.render();         


      });      
  }  

  public return() {
   //alert(_page);
   this._router.navigate(['customer/main']);
 }    
 
 showStandard() {
   this.toastService.show('I am a standard toast');
 }

 showSuccess() {
   this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
 }

 showDanger(dangerTpl) {
   this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
 } 

}
