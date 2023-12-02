import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpRequestService } from '../httpRequest/http-request.service';
import { map } from 'rxjs';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements AfterViewInit {
  @ViewChild('topOfensor') topOfensor!: ElementRef;
  @ViewChild('scrapTurno') scrapTurno!: ElementRef;

material:string[] = [];
materialDesc:string[] = [];

htmlData:any;

  ofensorChart: any;
  scrapChart:any;

  Scraplabels = ['NOK', 'IMM', 'HC','AF'];
  Scraplabel = 'Suma de NOK TOTAL';
  Scrapdata = [500, 200, 100,200];

  TOGraphFooterLabels =  ['1095 HDL', '1085 HDL', '1144 HDL'];
  objValues = [
    {
    "title":"Suma de NOK TOTAL",
    "values": [300, 150, 50]
    },
    {
      "title":"Suma de NOK IMM",
      "values":[120, 60, 20]
    },
    {
      "title":"Suma de NOK HC",
      "values":[60, 30, 10]
    },
    {
      "title":"Suma de NOK AF",
      "values":[120, 60, 20]
    }

  ];
  HourlyCompliance:any= [];
  desiredGoal:any = [ // rateXhour can be change as required
    {
      'hour':0,
      'rateXhour':350,
      
    },
    {
      'hour':1,
      'rateXhour':350,
      
    },
    {
      'hour':2,
      'rateXhour':350,
      
    },
    {
      'hour':3,
      'rateXhour':350,
      
    },
    {
      'hour':4,
      'rateXhour':350,
      
    },
    {
      'hour':5,
      'rateXhour':350,
      
    },
    {
      'hour':6,
      'rateXhour':350,
      
    },
    {
      'hour':7,
      'rateXhour':350,
      
    },
    {
      'hour':8,
      'rateXhour':350,
      
    },
    {
      'hour':9,
      'rateXhour':350,
      
    },
    {
      'hour':10,
      'rateXhour':350,
      
    },
    {
      'hour':11,
      'rateXhour':350,
      
    },
    {
      'hour':12,
      'rateXhour':350,
      
    },
    {
      'hour':13,
      'rateXhour':350,
      
    },
    {
      'hour':14,
      'rateXhour':350,
      
    },
    {
      'hour':15,
      'rateXhour':350,
      
    },
    {
      'hour':16,
      'rateXhour':350,
      
    },
    {
      'hour':17,
      'rateXhour':350,
      
    },
    {
      'hour':18,
      'rateXhour':350,
      
    },
    {
      'hour':19,
      'rateXhour':350,
      
    },
    {
      'hour':20,
      'rateXhour':350,
      
    },
    {
      'hour':21,
      'rateXhour':350,
      
    },
        {
      'hour':22,
      'rateXhour':350,
      
    },
    
    {
      'hour':23,
      'rateXhour':350,
      
    },
    {'daylyGoal':8400 // this value can be change as required
    },
  ];
  desiredRateXHour:number = 0;
  RealRateHour:string = '';

  currentPercentage:number = 0;

  constructor(private http:HttpRequestService){}

  ngAfterViewInit() {
    this.setCharTopOfensor( this.TOGraphFooterLabels, this.objValues, );
    this.setCharScrap(this.Scraplabels, this.Scraplabel ,this.Scrapdata);
    //this.startScheduledUpdates();
    this.updateAndonInfo();

  }

  set_compliance(){
    const now = new Date();
    const currentHour = now.getHours();

    const getCurrentHourlyCompliance = this.HourlyCompliance[currentHour-1] === undefined ? this.HourlyCompliance[currentHour-2] : this.HourlyCompliance[currentHour-1];
    
    this.desiredRateXHour = this.desiredGoal[currentHour].hour;
    this.RealRateHour = getCurrentHourlyCompliance.quantity_per_hour;

    const currentSumRate = getCurrentHourlyCompliance.total_quantity;
    
    const dailyGoal = this.desiredGoal[this.desiredGoal.length -1].daylyGoal;

    const getPercentage = (currentSumRate / dailyGoal) * 100;
    this.RealRateHour = getPercentage.toFixed(2);
    console.log(this.RealRateHour);
    
  }


  startScheduledUpdates() {
    // Obtén la hora actual
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
  
    // Calcula los minutos restantes hasta el próximo intervalo de 10 minutos
    const minutesUntilNextUpdate = (12 - (currentMinutes % 10)) % 10;
  
    // Calcula los segundos restantes hasta el próximo intervalo
    const secondsUntilNextUpdate = 60 - currentSeconds;
  
    // Calcula el tiempo hasta el próximo intervalo (en milisegundos)
    const timeUntilNextUpdate = (minutesUntilNextUpdate * 60 + secondsUntilNextUpdate) * 1000;
    
  
    // Programa la primera actualización después del tiempo calculado
    setTimeout(() => {
      // Ejecuta la actualización inicial
      this.updateAndonInfo();
  
      // Programa actualizaciones cada 10 minutos a partir de ahora
      setInterval(() => {
        this.updateAndonInfo();
      }, 10 * 60 * 1000);
  
    }, timeUntilNextUpdate);
  }
  
  get_hourly_compliance_report(): Promise<void>{
    console.log('procesando reporte...');
    return new Promise<void>((resolve, reject) =>{
      this.http.get_hourly_compliace_report().subscribe({
        next:res =>{
          console.log(res);
          this.HourlyCompliance = res;
          console.log('reporte procesado por exitosamente');
          resolve();
        },
        error:error => {
          console.error('falla en procesar el reporte',error);
          reject();
        }
      });
    });
  }

  async updateAndonInfo(){
    try {
      await this.conf_outlook_download();
      await this.data_db_insertion();
      await this.get_hourly_compliance_report();
      this.set_compliance();
     // await this.set_graph_Info_registry();
    } catch (error) {
      console.error('error en updateAndonInfo', error);
    }
  }

conf_outlook_download():Promise<void>{
  return new Promise<void>((resolve, reject) =>{
    this.http.dowload_outlook_attached().subscribe({
      next:res => {
        console.log('archivo HTML descargado correctamente');
        resolve();
      },
      error: error =>{
        console.error('Error en conf_outlook_download:', error);
        reject();
      }
    });
  });
}
data_db_insertion():Promise<void>{
  return new Promise<void>((resolve, reject) =>{
    this.http.html_data_extraction().subscribe({
      next:res => {
        console.info('datos extraidos insertados correctamente a la BD');
        resolve();
      },
      error: error =>{
        console.error('Error en data_db_insertion:', error);
                
        reject();
      }
    });
  });
}

set_graph_Info_registry(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
      console.debug('Iniciando set_graph_Info...');
      this.http.getRegistry().subscribe({
          next: response => {
              console.info('Respuesta recibida en set_graph_Info_registry:');
              this.noDuplicateItems(response);
              console.log(this.materialDesc);
              resolve();
          },
          error: error => {
              console.error('Error en set_graph_Info_registry:', error);
              reject();
          }
      });
  });
}

noDuplicateItems(arrData:any){
    let matDesc = arrData.reduce((obj: any, element: { material: any, materialDescription: any, quantity: any }) => {
      // Utilizar material como clave y materialDescription como valor
      const material = element.material;
      const materialDescription = element.materialDescription;
      const quantity = Number(element.quantity); // Convertir la cantidad a número
    
      // Si el material ya existe en el objeto, incrementar el contador y la cantidad, de lo contrario, establecerlos en 1 y la cantidad actual
      obj[material] = obj[material] || { 'count': 0, 'total_quantity': 0, 'descripcion': materialDescription };
      obj[material]['count']++;
      obj[material]['total_quantity'] += quantity;
    
      return obj;
    }, {});
    
    //matDesc = [... new Set(matDesc)];

    this.materialDesc = matDesc;

}
setCharScrap(labels:string[], label:string, data:number[] ){
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

backgroundColors(){

}
setCharTopOfensor(footerLabels: string[], objValues: any[]) {
    const TO = this.topOfensor.nativeElement.getContext('2d');
    const tolerancia = [150,100,49];
    const datasets = objValues.map((value, index) => {
      const backgroundColors = value.values.map((val: number, ind:number) => (val > tolerancia[ind] ? 'rgba(255, 26, 1, 0.9)' : this.getRandomColor(index)));

      return {
        label: value.title,
        backgroundColor: backgroundColors,
        data: value.values,
      };
    });
  //console.log(datasets);
    this.ofensorChart = new Chart(TO, {
      type: 'bar',
      data: {
        labels: footerLabels,
        datasets: datasets,
      },
      options: {
        plugins: {
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                },
              },
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
}
  
getRandomColor(index: number,) {
    // Puedes personalizar la generación de colores según tus necesidades
    const colors = [
      'rgba(255, 100, 52, 0.9)',
      'rgba(52, 100, 255, 0.9)',
      'rgba(150, 100, 50, 0.9)',
      'rgba(188, 43, 240, 0.9)',
      // Agrega más colores si es necesario
    ];
  
    return colors[index % colors.length];
}
  
}