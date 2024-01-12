import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  data!:any[][];
  //This is a TypeScript declaration indicating a two-dimensional array that can hold any type of data. The ! symbolizes that this property will be initialized before use.

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt: any){
    //This function is triggered when a file input's value changes. It takes an event parameter, likely from an <input type="file" /> element.
    const target:DataTransfer=<DataTransfer>(evt.target);
    // It casts the evt.target into a DataTransfer type. In this case, it's probably the file input element.
    if(target.files.length !== 1)throw new Error('Cannot use multiple files');
    //Checks if more than one file is selected. If so, it throws an error as the code seems designed to handle only one file at a time.
    const reader:FileReader = new FileReader();
    //A FileReader is created to read the contents of the selected file.

    reader.onload=(e:any) =>{
      // This event is triggered when the file reading is completed.
      const bstr: string =e.target.result;
      //Retrieves the file contents as a binary string.
      const wb:XLSX.WorkBook=XLSX.read(bstr,{type:'binary'});
      // Uses the xlsx library to read the binary string as an Excel file.
      const wsname:string =wb.SheetNames[0];
      //Retrieves the name of the first sheet in the Excel file.
      const ws:XLSX.WorkSheet=wb.Sheets[wsname];
      // Fetches the first sheet using its name.
      console.log(ws);
      this.data=(XLSX.utils.sheet_to_json(ws, {header:1}));
      // Converts the sheet's data into a JavaScript object array using sheet_to_json from xlsx. The { header: 1 } option indicates that the first row contains headers.
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
    //Initiates reading the file as a binary string. It reads the first file in the input.
  }

}
