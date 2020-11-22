import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';

import { JsonObject } from '../jsonObject';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-data-output',
  templateUrl: './data-output.component.html',
  styleUrls: ['./data-output.component.css']
})
export class DataOutputComponent implements OnInit {
  jsonString: string;
  csvString: string;
  shownString: string;
  dataFormat = "json";
  constructor(private jsonService: JsonService) { }

  ngOnInit(): void {
    this.jsonString = JSON.stringify(this.jsonService.getJson());
    this.shownString = this.jsonString;
  }
    
  saveToFile() {
    if (this.dataFormat == "json") {
      let blob = new Blob([this.jsonString], {type:"application/json"});
      let url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, "saveddata.json")
    } else if (this.dataFormat == "csv") {
      let blob = new Blob([this.csvString],{type:"text/csv"});
      let url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, "saveddata.csv")
    }
  }
  
  parseCsv(data) {
    let csv = "";
    let keys = Object.keys(data[0]).join(",");
    let values = data.map(o => Object.values(o).join(',')).join('\n');
    csv += keys + "\n" + values;
    return csv;
  }
    
  changeFormat(e) {
    this.dataFormat = e.target.value;
    
    if (this.dataFormat == "csv"){
      if (this.csvString) {
        this.shownString = this.csvString;
      } else {
        this.csvString = this.parseCsv(JSON.parse(this.jsonString));
        this.shownString = this.csvString;
      }
      
    } else if (this.dataFormat == "json") {
      this.shownString = this.jsonString;
      
    } else {
      console.log("Format not defined");
    }
  }
  
  copyToClipboard(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
  }
}
