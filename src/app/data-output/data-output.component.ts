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
  constructor(private jsonService: JsonService) { }

  ngOnInit(): void {
    this.jsonString = JSON.stringify(this.jsonService.getJson());
  }
    
  saveToFile() {
      let blob = new Blob([this.jsonString], {type:"application/json"});
      let url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, "jsondata.json")
      }
}
