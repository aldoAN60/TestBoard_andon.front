import { Component } from '@angular/core';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent {
generated_data: any[] = [
  {Library_name: 'tailwind', version: 'v3.3.3'},
  {Library_name: 'XLSX', version: 'v0.18.5'},
  {Library_name: 'Angular Material', version: 'v16.2.5'},
];

extracted_data:any[] = [];

onFileChange(event: any):void{
  const file = event.target.files[0];
  const reader = new FileReader;

  reader.onload = (e: any) => {
    const binaryString = e.target.result;
    const workbook = XLSX.read(binaryString,{type: 'binary'});
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    this.extracted_data = XLSX.utils.sheet_to_json(worksheet,{raw: true});
  };
  reader.readAsBinaryString(file);
}



exportToExcel(): void{
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.generated_data);
const wb: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws, 'Instaled Library');
XLSX.writeFile(wb,'paqueterias_instaladas_Test_Board_Andon.xlsx');
}
}
