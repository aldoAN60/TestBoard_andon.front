import { Component } from '@angular/core';



@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {

  chartData = [
    {
      data: [500, 200, 100, 200],
      label: 'SCRAP EN TURNO',
      backgroundColor: 'rgba(220, 0, 52, 0.9)',
      
    },
    
    
  ];

  chartLabels = ['NOK', 'IMM', 'HC', 'AF'];

  chartOptions = {
    responsive: true
  };

  constructor() { }

}
