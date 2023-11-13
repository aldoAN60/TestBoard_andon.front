import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements AfterViewInit {
  @ViewChild('topOfensor') topOfensor!: ElementRef;
  @ViewChild('scrapTurno') scrapTurno!: ElementRef;

  ofensorChart: any;
  scrapChart:any;

  TOlabels = ['NOK', 'IMM', 'HC','AF'];
  TOlabel = 'Suma de NOK TOTAL';
  TOdata = [500, 200, 100,200];

  scrapLabels =  ['1095HDL', '1085 HDL', '1144 HDL'];
  scraplabel = [
    {
    1:"Suma de NOK TOTAL",
    "valores": [300, 150, 50]},
    {
      2:"Suma de NOK IMM",
      "valores":[120, 60, 20]
    },
    {
      3:"Suma de NOK HC",
      "valores":[60, 30, 10]
    },
    {
      4:"Suma de NOK AF",
      "valores":[120, 60, 20]
    }

  ];
  

  ngAfterViewInit() {
    this.setCharTopOfensor(this.TOlabels, this.TOlabel ,this.TOdata);
    this.setCharScrap(this.scrapLabels, this.scraplabel);
  }
  setCharTopOfensor(labels:string[], label:string, data:number[] ){
    const scrap = this.scrapTurno.nativeElement.getContext('2d');
    this.scrapChart = new Chart(scrap, {
      type:'bar',
      data:{
        labels:labels,
        datasets: [
          {
            label: label,
            backgroundColor: 'rgba(5, 100, 52, 0.9)',
            data: data,
            order:1
          },
          {
            label: 'new line',
            backgroundColor: 'rgba(230,8,1, 0.9)',
            borderColor:'rgba(230,8,1, 0.9)',
            pointBackgroundColor:'white',
            pointBorderColor:'red',
            data: data,
            type:'line',
            order:0,
            datalabels: {
              labels: {
                title: null
              }
            }
          },
        ],
      },
      options:{
        plugins:{
          datalabels:{
            color:'white',
            labels:{
              title:{
                font:{
                  weight:'bold'
                }
                
              }
            }
          }
        }
      },
      plugins:[ChartDataLabels]
    });
  }
  setCharScrap(labels:string[], label: any){
    console.log(this.scraplabel[0][1]);
    const ctx = this.topOfensor.nativeElement.getContext('2d');
    this.ofensorChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:labels,
        datasets: [
          {
            label:label[0][1],
            backgroundColor: 'rgba(255, 100, 52, 0.9)',
            data:label[1]['valores'],
          },
          {
            label: label[2],
            backgroundColor: 'rgba(52, 100, 255, 0.9)',
            data:[120, 60, 20],
          },
          {
            label: label[2],
            backgroundColor: 'rgba(150, 100, 50, 0.9)',
            data:[120, 60, 20],
          },
          {
            label: label[3],
            backgroundColor: 'rgba(188, 43, 240, 0.9)',
            data:[120, 60, 20],
          },
        ],
      },
      options:{
        plugins:{
          datalabels:{
            color:'white',
            labels:{
              title:{
                font:{
                  weight:'bold'
                }
                
              }
            }
          }
        }
      },
      plugins:[ChartDataLabels]
    });
  }
}