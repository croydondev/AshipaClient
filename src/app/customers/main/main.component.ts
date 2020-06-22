import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';
import { Coreresponse, CoreRequest, GenerationRequest, GenerationResponse } from '../../models/coreresponse';
import { Usersession } from '../../models/usernameexists';
import * as CanvasJS from '../../../assets/canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

   time = {hour: 13, minute: 30};

   model1: NgbDateStruct;
   model2: NgbDateStruct;
   model3: NgbDateStruct;
   model4: NgbDateStruct;
   model5: NgbDateStruct;
   model6: NgbDateStruct;
   active = 'top';
   corerequest: CoreRequest = new CoreRequest();
   usersession: Usersession = new Usersession();
   usersaddress: string;
   generationrequest: GenerationRequest = new GenerationRequest();
   

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {

    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");

    this._registrationService.userDetails(this.usersession).subscribe(us => {
      console.log(us);
      this.usersaddress = us.p0.street + ", " + us.p0.city + "\n" + us.p0.state;
      localStorage.setItem("usersaddress", this.usersaddress);
   });    

    this.loadDailyProfile("2007-01-11", "2007-01-11");
    this.loadMonthlyProfile("2007-01-1", "2007-01-31");    
    this.loadGenerationProfile("2007-12-31");
    this.loadYearlyProfileTemplate();
    //this.loadYearlyProfile("2007-1-1", "2007-11-29");
    this.loadPVProperties("2007-01-11", "2007-01-29");
    this.loadMonthlyBill("", "");
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
         let pvoutput = 0;		
         let batteryoutput = 0;
         let generatoroutput = 0;
         for ( var i = 1; i < cr.body.length; i++ ) {		  
           //y += Math.round(5 + Math.random() * (-5 - 5));	
           pvoutput = parseFloat(cr.body[i].pvoutput);
           batteryoutput = parseFloat(cr.body[i].batteryoutput);
           generatoroutput = parseFloat(cr.body[i].generatoroutput);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, 11, i, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, 11, i, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);
     
         let chart1 = new CanvasJS.Chart("chartContainer1", {
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
          }                   
         ]
         });
           
         chart1.render();          
    });    
  }

  private loadMonthlyProfile(startdate: string, enddate: string)
  {
    this.corerequest.startdate = "2007-01-1";
    this.corerequest.enddate = "2007-01-31";
    this.corerequest.sessionID = localStorage.getItem("sessionid");
    this.corerequest.username = localStorage.getItem("username");  
 
    this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
       {
          console.log(cr);
 
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
            pvoutput = parseFloat(cr.body[i].pvoutput);
            batteryoutput = parseFloat(cr.body[i].batteryoutput);
            generatoroutput = parseFloat(cr.body[i].generatoroutput);
            dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, i, 0, 0)});
            dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, i, 0, 0)});
            dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, i, 0, 0)});
          }
         
          console.log(dataPoints1);   
          console.log(dataPoints2);
      
          let chart1 = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            exportEnabled: true,
            axisX: {
             valueFormatString: "D"
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
       });      
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


  private loadYearlyProfileTemplate()
  {
    var chart = new CanvasJS.Chart("chartContainer4", {
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


  private loadPVProperties(startdate: string, enddate: string)
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

  private loadMonthlyBill(startdate: string, enddate: string)
  {
   this.corerequest.startdate = "2007-01-1";
   this.corerequest.enddate = "2007-01-31";
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");  

   this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
      {
        console.log("MONTHLY BILLS");
         console.log(cr);

         console.log(cr.meta);
         let dataPoints1 = [];
         let dataPoints2 = [];
         let dataPoints3 = [];
         let dataPoints4 = [];
         let pvoutput = 0;		
         let batteryoutput = 0;
         let generatoroutput = 0;
         let cost = 0;
         for ( var i = 1; i < cr.body.length; i++ ) {		  
           //y += Math.round(5 + Math.random() * (-5 - 5));	
           pvoutput = parseFloat(cr.body[i].pvoutput);
           batteryoutput = parseFloat(cr.body[i].batteryoutput);
           generatoroutput = parseFloat(cr.body[i].cost);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints3.push({ y: cost, x: new Date(2007, 0, i, 0, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);

/*         
     
         let chart1 = new CanvasJS.Chart("chartContainer2", {
           animationEnabled: true,
           exportEnabled: true,
           axisX: {
            valueFormatString: "D"
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
   var chart5 = new CanvasJS.Chart("chartContainer6", {
      animationEnabled: true,
      title:{
        text: "Monthly Bill"
      },
      axisX: {
        valueFormatString: "D"
      },
      axisY:{
         title: "Kwh"
      },
      legend:{
        cursor: "pointer",
        fontSize: 16,
        itemclick: toggleDataSeries
      },
      toolTip:{
        shared: true
      },
      data: [
      {
        name: "Power Consumed",
        type: "line",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017,6,1), y: 20 },
          { x: new Date(2017,6,2), y: 20 },
          { x: new Date(2017,6,3), y: 25 },
          { x: new Date(2017,6,4), y: 25 },
          { x: new Date(2017,6,5), y: 25 },
          { x: new Date(2017,6,6), y: 25 },
          { x: new Date(2017,6,7), y: 25 },
          { x: new Date(2017,6,8), y: 20 },
          { x: new Date(2017,6,9), y: 20 },
          { x: new Date(2017,6,10), y: 25 },
          { x: new Date(2017,6,11), y: 25 },
          { x: new Date(2017,6,12), y: 25 },
          { x: new Date(2017,6,13), y: 25 },
          { x: new Date(2017,6,14), y: 25 },   
          { x: new Date(2017,6,15), y: 20 },
          { x: new Date(2017,6,16), y: 20 },
          { x: new Date(2017,6,17), y: 25 },
          { x: new Date(2017,6,18), y: 25 },
          { x: new Date(2017,6,19), y: 25 },
          { x: new Date(2017,6,20), y: 25 },
          { x: new Date(2017,6,21), y: 25 },
          { x: new Date(2017,6,22), y: 20 },
          { x: new Date(2017,6,23), y: 20 },
          { x: new Date(2017,6,24), y: 25 },
          { x: new Date(2017,6,25), y: 25 },
          { x: new Date(2017,6,26), y: 25 },
          { x: new Date(2017,6,27), y: 25 },
          { x: new Date(2017,6,28), y: 25 },                           
          { x: new Date(2017,6,29), y: 25 },
          { x: new Date(2017,6,30), y: 25 },
          { x: new Date(2017,6,31), y: 25 }
        ]
      },
      {
        name: "Cost",
        type: "line",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
         { x: new Date(2017,6,1), y: 30 },
         { x: new Date(2017,6,2), y: 40 },
         { x: new Date(2017,6,3), y: 45 },
         { x: new Date(2017,6,4), y: 35 },
         { x: new Date(2017,6,5), y: 25 },
         { x: new Date(2017,6,6), y: 45 },
         { x: new Date(2017,6,7), y: 25 },
         { x: new Date(2017,6,8), y: 50 },
         { x: new Date(2017,6,9), y: 20 },
         { x: new Date(2017,6,10), y: 15 },
         { x: new Date(2017,6,11), y: 65 },
         { x: new Date(2017,6,12), y: 25 },
         { x: new Date(2017,6,13), y: 35 },
         { x: new Date(2017,6,14), y: 75 },   
         { x: new Date(2017,6,15), y: 30 },
         { x: new Date(2017,6,16), y: 30 },
         { x: new Date(2017,6,17), y: 35 },
         { x: new Date(2017,6,18), y: 35 },
         { x: new Date(2017,6,19), y: 35 },
         { x: new Date(2017,6,20), y: 35 },
         { x: new Date(2017,6,21), y: 35 },
         { x: new Date(2017,6,22), y: 30 },
         { x: new Date(2017,6,23), y: 30 },
         { x: new Date(2017,6,24), y: 35 },
         { x: new Date(2017,6,25), y: 35 },
         { x: new Date(2017,6,26), y: 35 },
         { x: new Date(2017,6,27), y: 35 },
         { x: new Date(2017,6,28), y: 35 },                           
         { x: new Date(2017,6,29), y: 35 },
         { x: new Date(2017,6,30), y: 35 },
         { x: new Date(2017,6,31), y: 35 }
        ]
      }]
    });
    chart5.render();    
   
    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      chart5.render();
    }        
  }

  public onDateSelect(event: any)
  {
     alert(event);
     console.log(event);
  }

  public enlarge(_page: string) {
   //alert(_page);
   this._router.navigate(['customer/' + _page])
 }        


}
