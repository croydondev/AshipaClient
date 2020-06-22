import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../services/registration.service';
import { Usersession } from '../models/usernameexists';
import * as CanvasJS from '../../assets/canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [NgbCarouselConfig]
})
export class LandingComponent implements OnInit {

  validsession: boolean = false;

  usersession: Usersession = new Usersession();
  images: string[] = [`../assets/andreas.jpg`, `../assets/DSC_0206-scaled.jpg`, `../assets/american-public-power-association.jpg`, `../assets/DSC_0206-scaled.jpg`];
  //images = [700, 533, 807, 124].map((n) => `../assets/andreas.jpg`);

  constructor(private _router: Router, private modalService: NgbModal, config: NgbCarouselConfig, private _registrationService: RegistrationService) { 

    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;    

  } 

  ngOnInit() {



    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");
    this._registrationService.logout(this.usersession).subscribe(sessionstate =>
      {
        this.validsession = false;
        console.log(sessionstate);
        //this._router.navigate(['/landing']);
        window.location.href = "https://ashipaelectric.com/";
      });    


/*
		let chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart1.render();  


    let chart2 = new CanvasJS.Chart("chartContainer2", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    chart2.render();  
    
    let dataPoints1 = [];
    let y = 0;		
    for ( var i = 0; i < 10000; i++ ) {		  
      y += Math.round(5 + Math.random() * (-5 - 5));	
      dataPoints1.push({ y: y});
    }
    let chart3 = new CanvasJS.Chart("chartContainer3", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Performance Demo - 10000 DataPoints"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      data: [
      {
        type: "line",                
        dataPoints: dataPoints1
      }]
    });
      
    chart3.render(); 
    

    let dataPoints2 = [];
    let dpsLength = 0;
    let chart4 = new CanvasJS.Chart("chartContainer4",{
      exportEnabled: true,
      title:{
        text:"Live Chart with Data-Points from External JSON"
      },
      data: [{
        type: "spline",
        dataPoints : dataPoints2,
      }]
    });
    
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {  
      $.each(data, function(key, value){
        dataPoints2.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints2.length;
      chart4.render();
      updateChart();
    });
    function updateChart() {	
      $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints2[dataPoints2.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
        $.each(data, function(key, value) {
          dataPoints2.push({
          x: parseInt(value[0]),
          y: parseInt(value[1])
          });
          dpsLength++;
        });
        
        if (dataPoints2.length >  20 ) {
              dataPoints2.shift();				
            }
        chart4.render();
        setTimeout(function(){updateChart()}, 1000);
      });    
    }


    var chart = new CanvasJS.Chart("chartContainer5", {
      animationEnabled: true,
      title:{
        text: "Daily High Temperature at Different Beaches"
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
    chart.render();    

    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      chart.render();
    }    



*/
    
  }
  
  public customers() {
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");   
    this._registrationService.isvalidsession(this.usersession).subscribe((result) =>
    {
      if(result)
      {
        this._router.navigate(['/customer/main'])
      }
      else{
        this._router.navigate(['/customer/login'])
      }
    });         
  }  
  public operators() {
    //alert("seen!");

    //this._router.navigate(['/operator/login'])

    //const modalRef = this.modalService.open(NgbdModalContent);
    //modalRef.componentInstance.name = 'Welcome to Ashipa!';    

    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");   
    this._registrationService.isvalidsession(this.usersession).subscribe((result) =>
    {
      if(result)
      {
        this._router.navigate(['/operator/main'])
      }
      else{
        this._router.navigate(['/operator/login'])
      }
    }); 

  }

}
