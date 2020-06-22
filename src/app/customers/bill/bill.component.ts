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
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

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
  usersaddress: string;  

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {
   
   this.usersaddress = localStorage.getItem("usersaddress");

   this.corerequest.startdate = "2007-01-1";
   this.corerequest.enddate = "2007-01-31";
   this.corerequest.sessionID = localStorage.getItem("sessionid");
   this.corerequest.username = localStorage.getItem("username");        
   this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
    {
       console.log(cr);
    });  
    //this.loadTemplate("", "");
    this.loadMonthlyBill("01", "2007");

/*    
    
    this._registrationService.gethourlydata(this.corerequest).subscribe(cr =>
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
     this._registrationService.getdailydata(this.corerequest).subscribe(cr =>
      {
         console.log(cr);
      }); 


  }  

  private loadTemplate(startdate: string, enddate: string)
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
           cost = parseFloat(cr.body[i].cost);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints4.push({ y: cost, x: new Date(2007, 0, i, 0, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);

         
     
         let chart1 = new CanvasJS.Chart("chartContainer6", {
           animationEnabled: true,
           exportEnabled: true,
           axisX: {
            valueFormatString: "D"
         },
         axisY:{
            title: "Kwh"
         },     
         axisY2:{
          title: "US Dollars($)"
         },               
           title: {
             text: "Monthly Profile"
           },
           data: [{
            name: "Cost",
             type: "line",
             yValueFormatString: "#0.## $",
             showInLegend: true,
             dataPoints: dataPoints4
           },
           {
            name: "Power Consumed",
            type: "line",
            showInLegend: true,
            dataPoints: dataPoints1
          }           
/*           
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
*/                         
         ]
         });
           
         chart1.render();

      });   
      
      
/*      
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
*/
          
  }  


  public onStartDateSelect(event: any)
  {
     //alert("start date: - " + event);
     //console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     //this.corerequest.startdate = event.year + "-" + event.month + "-" + event.day;
     //this.corerequest.startdate = "2007-" + event.month + "-1";
     //this.loadMonthlyBill(this.corerequest.startdate, this.corerequest.enddate);
     this.loadMonthlyBill(event.month, event.year);
  }  
  public onEndDateSelect(event: any)
  {
     //alert("end date: - " + event);
     //console.log(event);
     //this.optFromInput = JSON.parse(this.optFromInputString2);
     //this.corerequest.enddate = event.year + "-" + event.month + "-" + event.day;
     this.loadMonthlyBill(event.month, event.year);
  }   

  private loadMonthlyBill(month: string, year: string)
  {
    this.corerequest.startdate = year + "-" + month + "-1";
    if(month == "2")
    {
       this.corerequest.enddate = year + "-" + month + "-28";
    }
    else{
       this.corerequest.enddate = year + "-" + month + "-30";
    }
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
           cost = parseFloat(cr.body[i].cost);
           dataPoints1.push({ y: pvoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints2.push({ y: batteryoutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints3.push({ y: generatoroutput, x: new Date(2007, 0, i, 0, 0)});
           dataPoints4.push({ y: cost, x: new Date(2007, 0, i, 0, 0)});
         }
        
         console.log(dataPoints1);   
         console.log(dataPoints2);


         var chart = new CanvasJS.Chart("chartContainer", {
           zoomEnabled: true,
           zoomType: "xy",
           exportEnabled: true,
           title: {
             text: "Monthly Bill"
           },
           axisX: {
             title: "Axis Title",
             valueFormatString: "D"
           },
           axisY: {
             title: "Kwh",
             titleFontColor: "#4F81BC",
             labelFontColor: "#4F81BC"
           },
           axisY2: {
             title: "US Dollars($)",
             titleFontColor: "#C0504E",
             labelFontColor: "#C0504E"
           },
           toolTip: {
             shared: true
           },
           legend:{
             cursor:"pointer"
           },
           data: [{
             type: "line",
             name: "Power Consumed",
             showInLegend: true,
             dataPoints: dataPoints1
           },
           {
             type: "line",
             name: "Cost",
             color: "#C0504E",
             showInLegend: true,
             axisYType: "secondary",
             dataPoints: dataPoints4
           }]
         });
         
         chart.render();                     

      });        
  }


  public return() {
    //alert(_page);
    this._router.navigate(['customer/main']);
  } 

}
