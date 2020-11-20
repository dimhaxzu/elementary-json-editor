import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { JsonObject } from '../jsonObject';
import { JsonService } from '../json.service';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.css']
})
export class DataEditorComponent implements OnInit {
  jsonData: JsonObject[];
  faArrowsAltV = faArrowsAltV;
  
  constructor(private jsonService: JsonService) { 
  }

  ngOnInit(): void {
    this.jsonData = this.jsonService.getJson();    
  }

  trackByIndex(index, item) {
    return index;
  }  
  
  remove(index) {
    this.jsonData.splice(index, 1);
  }
  
  add() {
    let newRow = { ...this.jsonData[0] };
    Object.keys(newRow).forEach(function(key){newRow[key]=""});
    this.jsonData.push(newRow);
  }
  
  onSubmit() {
    this.jsonService.setJson(JSON.stringify(this.jsonData));
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.jsonData,
      event.previousIndex,
      event.currentIndex)
  }

}
