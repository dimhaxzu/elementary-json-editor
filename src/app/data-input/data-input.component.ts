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
  file: File = null;
  constructor(
    private jsonService: JsonService,
  ) { }
    
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    this.jsonService.setJson(this.jsonString);
  }
  
  onFileload(uploadedFile: FileList) {
      this.file = uploadedFile[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.jsonService.setJson(reader.result as string);
        this.jsonString = JSON.stringify(this.jsonService.getJson());
      }
      reader.readAsBinaryString(this.file);
      
  }
}
