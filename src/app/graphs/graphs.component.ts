import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpRequestService } from '../httpRequest/http-request.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements AfterViewInit {
 /**
   * Referencia al elemento DOM para el gráfico de los principales ofensores.
   * @remarks
   * Utiliza ViewChild para obtener una referencia al elemento con la etiqueta 'topOfensor'.
   */
 @ViewChild('topOfensor') topOfensor!: ElementRef;

 /**
  * Referencia al elemento DOM para el gráfico de los datos de scrap.
  * @remarks
  * Utiliza ViewChild para obtener una referencia al elemento con la etiqueta 'scrapTurno'.
  */
 @ViewChild('scrapTurno') scrapTurno!: ElementRef;

 /**
  * Arreglo que almacena las etiquetas de los materiales.
  * @remarks
  * Utilizado para configurar las etiquetas en los gráficos.
  * @deprecated
  * la variable no es utilizada en el codigo solo esta inicializada. en caso de agregar alguna nueva funcion hacer uso de ella 
  */
 material: string[] = [];

 /**
  * Arreglo que almacena las descripciones de los materiales.
  * @remarks
  * Utilizado para configurar las descripciones en los gráficos.
  * @deprecated
  * la variable no es utilizada en el codigo solo esta inicializada. en caso de agregar alguna nueva funcion hacer uso de ella 
  */
 materialDesc: string[] = [];

 /**
  * almacena la informacion obtenida atravez de una respuesta HTTP.
  * @deprecated
  * la variable solo es utilizada en la funcion 'set_graph_Info_registry' la cual esta comentada
  * ya que aun no se cuenta con la informacion suficiente para su implementacion.
  */
 htmlData: any;

 /**
  * Gráfico para representar datos sobre los principales ofensores.
  * @remarks
  * Utilizado para visualizar datos relacionados con ofensores en la producción.
  */
 ofensorChart: any;

 /**
  * Gráfico para representar datos sobre scrap.
  * @remarks
  * Utilizado para visualizar datos relacionados con la cantidad de scrap.
  */
 scrapChart: any;

 /**
  * Etiquetas para el gráfico de scrap.
  * @remarks
  * Utilizado para definir las etiquetas en el eje X del gráfico de scrap.
  */
 Scraplabels = ['NOK', 'IMM', 'HC', 'AF'];

 /**
  * Etiqueta principal para el gráfico de scrap.
  * @remarks
  * Utilizado como título para el gráfico de scrap.
  */
 Scraplabel = 'Suma de NOK TOTAL';

 /**
  * Datos para el gráfico de scrap.
  * @remarks
  * Utilizados como valores para el eje Y del gráfico de scrap.
  */
 Scrapdata = [500, 200, 100, 200];

 /**
   * Etiquetas para el gráfico de los principales ofensores.
   * @remarks
   * Utilizado para definir las etiquetas en el eje X del gráfico de ofensores.
   */
 TOGraphFooterLabels = ['1095 HDL', '1085 HDL', '1144 HDL']; // la infomracion detro del arrelo solo es un ejemplo es necesario cambiarla segun necesidades

 /**
  * Arreglo de objetos que contienen valores para gráficos.
  * @remarks
  * Cada objeto representa un conjunto de datos con un título y valores asociados.
  * @remarks
  * la infomracion de los objetos solo son un ejemplo, es necesariocambiarla segun necesidades
  */
objValues = [
    {
      title: 'Suma de NOK TOTAL',
      values: [300, 150, 50]
    },
    {
      title: 'Suma de NOK IMM',
      values: [120, 60, 20]
    },
    {
      title: 'Suma de NOK HC',
      values: [60, 30, 10]
    },
    {
      title: 'Suma de NOK AF',
      values: [120, 60, 20]
    }
  ];


/**
 * objetivo deseado para el cumplimieto por hora
 * @remarks
 * arreglo de objetos que almacena las horas del dia en formato 24 horas y el cumplimiento que debe de tener cada hora
 */
  desiredGoal:any = [ 
    {
      'hour':0,
      'rateXhour':350, // Valor por hora deseado (puede ajustarse según sea necesario)
      
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
    {
      'daylyGoal':8400 // Valor diario deseado (puede ajustarse según sea necesario)
    },
  ];

  /**
  * Almacena los datos obtenidos de la funcion 'get_hourly_compliance_report'.
  */
  HourlyCompliance: any = [];

/**
   * Objetivo diario deseado en unidades específicas (se extraer de la variable 'desiredGoal').
   * @remarks
   * Se utiliza para definir la meta diaria que se espera alcanzar.
   */
dailyGoal: number = 0;

/**
 * Meta diaria actual (cambia dinámicamente).
 * @remarks
 * Representa la meta diaria actual que se está siguiendo o ajustando.
 */
currentDayliGoal: number = 0;

/**
 * cumplimiento deseado por hora en unidades específicas (se extraer de la variable 'desiredGoal').
 * @remarks
 * Indica la tasa por hora que se pretende lograr.
 */
desiredRateXHour: number = 0;

/**
 * Tasa real por hora alcanzada (puede cambiar dinámicamente).
 * @remarks
 * Representa la tasa real alcanzada por hora en un momento dado.
 */
RealRateHour: number = 0;

/**
 * Porcentaje de la tasa actual en comparación con la tasa deseada.
 * @remarks
 * Se utiliza para mostrar visualmente la comparación entre la tasa real y la deseada.
 */
percentageRate: string = '';

  /**
  * Almacena una clase del frameworks css 'tailwind' la cual define el color del texto del contenedor llamado 
  *'cumplimiento diario actual'.
  * @remarks
  * El valor de esta variable es definida por la funcion 'set_compliance' .
  */
  setCurrentDailyRateColor:string = '';

  /**
  * Almacena una clase del frameworks css 'tailwind' la cual define el color del texto del contenedor llamado 
  *'cumplimiento actual'.
  * @remarks
  *  El valor de esta variable es definida por la funcion 'set_compliance' y guarda el valor de la funcion ' gettingPercentageXHourly'.
  */
setCurrentHourlyRateColor:string = '';


  constructor(private http:HttpRequestService){}

  /**
   * Método del ciclo de vida llamado después de que la vista del componente se ha inicializado completamente.
   * @remarks
   * Este método se utiliza para realizar acciones que deben llevarse a cabo después de que
   * la vista y sus componentes secundarios se hayan inicializado.
   */
  ngAfterViewInit() {
    // Configurar gráficos y realizar actualizaciones iniciales después de que la vista se ha inicializado
    this.setCharTopOfensor(this.TOGraphFooterLabels, this.objValues);
    this.setCharScrap(this.Scraplabels, this.Scraplabel, this.Scrapdata);
    
    // Iniciar actualizaciones programadas y realizar una actualización inicial de la información
    this.startScheduledUpdates();
    this.updateAndonInfo();
  }

  set_compliance(){
    const now = new Date();
    const currentHour = now.getHours();

    const getCurrentHourlyCompliance = this.HourlyCompliance[currentHour] === undefined ? this.HourlyCompliance[currentHour-1] : this.HourlyCompliance[currentHour];
    
    this.desiredRateXHour = this.desiredGoal[currentHour].rateXhour;
    this.RealRateHour = getCurrentHourlyCompliance.quantity_per_hour;

    this.currentDayliGoal = getCurrentHourlyCompliance.total_quantity;
    
    this.dailyGoal = this.desiredGoal[this.desiredGoal.length -1].daylyGoal;

    const getPercentage = (this.currentDayliGoal / this.dailyGoal) * 100;
    this.setCurrentDailyRateColor = getPercentage < 50 ? 'text-red-500': getPercentage < 80 ? 'text-yellow-500' : 'text-green-500';
    
    this.setCurrentHourlyRateColor = this.gettingPercentageXHourly(this.desiredRateXHour, this.RealRateHour);
    this.percentageRate = getPercentage.toFixed(2);
    
  }
  gettingPercentageXHourly(desiredRateXHour:number, realRateHour:number):string{
   const get50percentage = (desiredRateXHour * 50)/100;
   const get80percentage = (desiredRateXHour * 80)/100;

    if(realRateHour < get50percentage){
      return 'text-red-500'
    }else if(realRateHour < get80percentage){
      return 'text-yellow-500'
    }else{
      return 'text-green-500'
    }

  }

  startScheduledUpdates() {
    // Obtén la hora actual
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
  
    // Calcula los minutos restantes hasta el próximo intervalo de 10 minutos
    const minutesUntilNextUpdate = (11 - (currentMinutes % 10)) % 10;
    console.log(minutesUntilNextUpdate);
    // Calcula los segundos restantes hasta el próximo intervalo
    const secondsUntilNextUpdate = 60 - currentSeconds;
    console.log(secondsUntilNextUpdate);
    // Calcula el tiempo hasta el próximo intervalo (en milisegundos)
    const timeUntilNextUpdate = (minutesUntilNextUpdate * 60 + secondsUntilNextUpdate) * 1000;
    console.log(timeUntilNextUpdate);
  
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

  async updateAndonInfo(){
    try {
      await this.conf_outlook_download();
      await this.data_db_insertion();
      await this.get_hourly_compliance_report();
      //await this.set_graph_Info_registry(); solo descomentar en caso de que se tenga que hacer uso de la funcion
      this.set_compliance();
      
  } catch (error) {
      console.error('error en updateAndonInfo', error);
    }
  }
/**
 * Descarga archivos adjuntos desde Outlook a través de una solicitud HTTP.
 * @returns Una promesa que se resuelve si la descarga es exitosa, o se rechaza si hay un error.
 */
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
/**
 * Extrae datos HTML y los inserta en la base de datos a través de una solicitud HTTP.
 * @returns Una promesa que se resuelve si la operación es exitosa, o se rechaza si hay un error.
 */
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

  /**
 * Obtiene y procesa un informe de cumplimiento por horas a través de una solicitud HTTP.
 * @returns Una promesa que se resuelve con éxito si la operación es exitosa, o se rechaza si hay un error.
 */
  get_hourly_compliance_report(): Promise<void>{
    console.log('procesando reporte...');
    return new Promise<void>((resolve, reject) =>{
      this.http.get_hourly_compliace_report().subscribe({
        next:res =>{
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

/**
 * Inicia la obtención y procesamiento de información para el gráfico a través de una solicitud HTTP.
 * @returns Una promesa que se resuelve con éxito si la operación es exitosa, o se rechaza si hay un error.
 * @remarks
 * Nota: Esta función depende de la función auxiliar `noDuplicateItems` para procesar la respuesta recibida.
 * @remarks
 * la funcion se mantiene comentada ya que no se ha obtenido alguna informacion de como utilizarla e interpretarla
 * en los graficos
 */
/*set_graph_Info_registry(): Promise<void> {
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
}*/

/**
 * Elimina duplicados de una lista y calcula el recuento y la cantidad total por material.
 * @param arrData - La lista de datos a procesar.
 * @remarks
 * Nota: Esta función es utilizada internamente por `set_graph_Info_registry`.
 */
/*
noDuplicateItems(arrData: any): void {
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
    this.materialDesc = matDesc;
}
*/

/**
 * Configura y renderiza un gráfico de barras con opciones personalizadas para representar datos de scrap.
 * @param labels - Etiquetas para el eje x del gráfico.
 * @param label - Etiqueta de la serie de datos.
 * @param data - Datos numéricos para la serie de datos.
 * @remarks
 * Este método utiliza la biblioteca Chart.js.
 */
setCharScrap(labels: string[], label: string, data: number[]) {
  const scrap = this.scrapTurno.nativeElement.getContext('2d');
  this.scrapChart = new Chart(scrap, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [
              {
                  label: label,
                  backgroundColor: 'rgba(5, 100, 52, 0.9)',
                  data: data,
                  order: 1,
              },
              {
                  label: 'new line',
                  backgroundColor: 'rgba(230, 8, 1, 0.9)',
                  borderColor: 'rgba(230, 8, 1, 0.9)',
                  pointBackgroundColor: 'white',
                  pointBorderColor: 'red',
                  data: data,
                  type: 'line',
                  order: 0,
                  datalabels: {
                      labels: {
                          title: null,
                      },
                  },
              },
          ],
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


/**
* Configura y renderiza un gráfico de barras con opciones personalizadas para representar datos de los principales ofensores.
* @param footerLabels - Etiquetas para el eje x del gráfico.
* @param objValues - Datos para las series de barras del gráfico.
* @remarks
* Este método utiliza la biblioteca Chart.js.
*/
setCharTopOfensor(footerLabels: string[], objValues: any[]) {
  const TO = this.topOfensor.nativeElement.getContext('2d');
  const tolerancia = [150, 100, 49];
  const datasets = objValues.map((value, index) => {
      const backgroundColors = value.values.map((val: number, ind: number) => (val > tolerancia[ind] ? 'rgba(255, 26, 1, 0.9)' : this.getRandomColor(index)));

      return {
          label: value.title,
          backgroundColor: backgroundColors,
          data: value.values,
      };
  });

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

/**
* Genera un color aleatorio a partir de una lista predefinida de colores.
* @param index - Índice para seleccionar el color.
* @returns Un color en formato RGBA.
* @remarks
* Este método es utilizado internamente por `setCharTopOfensor`.
*/
getRandomColor(index: number) {
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