import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

   model1: NgbDateStruct;
   model2: NgbDateStruct;
  active = 'top';

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  //chartOptions: Highcharts.Options = { ... }; // required
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };  
  //chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false  
  usersaddress: string;  

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {
   
   this.usersaddress = localStorage.getItem("usersaddress");
  }

  public onDateSelect(event: any)
  {
     alert(event);
     console.log(event);
  }  

  public return() {
    //alert(_page);
    this._router.navigate(['customer/main']);
  }      

  type = 'line';
  data2 = {
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

  title = 'myHighchart';
   
  data = [{
          name: 'ItSolutionStuff.com',
          data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
       },{
          name: 'Nicesnippets.com',
          data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
       }];

  data1 = [{
          name: 'Power consumed',
          data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
       },{
          name: 'Cost',
          data: [401, 601, 456, 345, 678, 778, 845, 468, 567, 690, 357, 555]
       }];       

       
 
  highcharts = Highcharts;
  chartOptions2 = {   
    chart: {
       type: "spline"
    },
    title: {
       text: "Monthly Bill"
    },
    xAxis:{
       categories:["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29", "31"]
    },
    yAxis: {          
       title:{
          text:"KWh"
       } 
    },
    series: this.data1
  };  



  chartOptions3 = {   
    chart : {
       plotBorderWidth: null,
       plotShadow: false
    },
    title : {
       text: 'Generation Profile'   
    },
    tooltip : {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
       pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
             enabled: false,
             format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
             style: {
                color: 'black'
             }
          },
          showInLegend: true
       }
    },
    series : [{
       type: 'pie',
       name: 'Browser share',
       data: [
          ['Generator Output',   45.0],
          ['Load',       26.8],
          ['PV Output',       13.5],
          ['Battery Input',    8.5],
          ['Battery Output',     6.2]
       ]
    }]
 };  


 chartOptions4 = {   
  chart: {
     type: 'column'
  },
  title: {
     text: 'Year Profile'
  },
  subtitle : {
     text: ''  
  },
  legend : {
     layout: 'vertical',
     align: 'left',
     verticalAlign: 'top',
     x: 250,
     y: 100,
     floating: true,
     borderWidth: 1,
    
     backgroundColor: ('#FFFFFF'), shadow: true
  },
  xAxis:{
     categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
        text: null
     } 
  },
  yAxis : {
     min: 0,
     title: {
        text: 'Population (millions)',
        align: 'high'
     },
     labels: {
        overflow: 'justify'
     }
  },
  tooltip : {
     valueSuffix: ' millions'
  },
  plotOptions : {
     column: {
        dataLabels: {
           enabled: true
        }
     },
     series: {
        stacking: 'normal'
     }
  },
  credits:{
     enabled: false
  },
  series: [
     {
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
     }, 
     {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
     }, 
     {
        name: 'Year 2008',
        data: [973, 914, 4054, 732, 34]      
     }
  ]
}; 


chartOptions5 = {         
   chart : {
      zoomType: 'xy'
   },
   title : {
      text: 'Day Profile'   
   },   
   subtitle : {
      text: ''
   },
   xAxis : {
      categories: ['1', '3', '5', '7', '9', '11',
'13', '15', '17', '19', '21', '23'],
      crosshair: true
   },
   yAxis : [
      { // Primary yAxis
         labels: {
            format: '{value}\xB0C',
            style: {
               color: Highcharts.getOptions().colors[1]
            }
         },
         title: {
            text: 'Temperature',
            style: {
               color: Highcharts.getOptions().colors[1]
            }
         },
         opposite: true
      }, 
      { // Secondary yAxis
         title: {
            text: 'Rainfall',
            style: {
               color: Highcharts.getOptions().colors[0]
            }
         },
         labels: {
            format: '{value} mm',
            style: {
               color: Highcharts.getOptions().colors[0]
            }
         }
      },
      { // Tertiary yAxis
         gridLineWidth: 0,
         title: {
            text: 'Sea-Level Pressure',
            style: {
               color: Highcharts.getOptions().colors[1]
            }
         },
         labels: {
            format: '{value} mb',
            style: {
               color: Highcharts.getOptions().colors[1]
            }
         },
         opposite:true  
      }
   ],
   tooltip: {
      shared: true
   },
   legend: {
      enabled:false
   },
   series : [
      {
         name: 'Rainfall',
         type: 'column',
         yAxis: 1,
         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
                 216.4, 194.1, 95.6, 54.4],
         tooltip: {
            valueSuffix: ' mm'
         }
      }, 
      {
         name: 'Sea-Level Pressure',
         type: 'spline',
         yAxis: 2,
         data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2,
                  1013.1, 1016.9, 1018.2, 1016.7],
         marker: {
            enabled: false
         },
         dashStyle: 'shortdot',
         tooltip: {
            valueSuffix: ' mb'
         }
      },
      {
         name: 'Temperature',
         type: 'spline',
         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
         tooltip: {
            valueSuffix: '\xB0C'
         }
      }
   ]
};


chartOptions6 = {         
   chart : {
      zoomType: 'xy'
   },
   title : {
      text: 'PV Properties'   
   },   
   subtitle : {
      text: ''
   },
   xAxis : {
      categories: ['1', '3', '5', '7', '9', '11',
              '13', '15', '17', '19', '21', '23'],
      crosshair: true
   },
   yAxis : [
      { // Primary yAxis
         labels: {
            format: '{value}\xB0C',
               style: {
                  color: Highcharts.getOptions().colors[1]
               }
         },
         title: {
            text: 'Temperature',
            style: {
               color: Highcharts.getOptions().colors[1]
            }
         }
      }, 
      { // Secondary yAxis
         title: {
            text: 'Rainfall',
            style: {
               color: Highcharts.getOptions().colors[0]
            }
         },
         labels: {
            format: '{value} mm',
            style: {
               color: Highcharts.getOptions().colors[0]
            }
         },
         opposite: true
      }
   ],
   tooltip: {
      shared: true
   },
   legend: {
      layout: 'vertical',
      align: 'left',
      x: 60,
      verticalAlign: 'top',
      y: 100,
      floating: true,
            
      backgroundColor: '#FFFFFF'
   },
   series : [
      {
         name: 'Rainfall',
         type: 'column',
         yAxis: 1,
         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
                 216.4, 194.1, 95.6, 54.4],
         tooltip: {
            valueSuffix: ' mm'
         }
      }, 
      {
         name: 'Temperature',
         type: 'spline',
         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
         tooltip: {
            valueSuffix: '\xB0C'
         }
      }
   ]
};  

}
