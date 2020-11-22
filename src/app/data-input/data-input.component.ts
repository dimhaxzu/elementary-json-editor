import { Component, OnInit } from '@angular/core';

import { JsonObject } from '../jsonObject';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent implements OnInit {
  jsonString: string;
  jsonForm;
  dataFormat = "json";
  file: File = null;
  constructor(
    private jsonService: JsonService,
  ) { }
    
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    if (this.dataFormat == "json") {
      this.jsonService.setJson(this.jsonString);
    } else if (this.dataFormat == "csv") {
      this.jsonService.setJson(JSON.stringify(this.parseCsv(this.jsonString)));
    } else {
      console.log("Format not defined");
    }
  }
  
  onFileload(uploadedFile: FileList) {
      this.file = uploadedFile[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.jsonString = reader.result as string;
      }
      reader.readAsBinaryString(this.file);
      
  }
  
  parseCsv(csvString) {
    let lines = csvString.split('\n');
    let keys = lines[0].split(',');
    let values = lines.splice(1).map(function (eachLine) {
      return eachLine.split(','); });
    return values.map(function (rowValues) {
      let row = {};
      keys.forEach(function (key, index){
        row[key] = (index < rowValues.length) ? rowValues[index] : null;
      });
      return row;
    });
  }
  
  changeFormat(e) {
    this.dataFormat = e.target.value;
  }
}
