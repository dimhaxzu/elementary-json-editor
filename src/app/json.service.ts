import { Injectable } from '@angular/core';
import { JsonObject } from './jsonObject';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  jsonData: JsonObject[];
  getJson(): JsonObject[] {
      return this.jsonData;
  }
  setJson(value:string){
    this.jsonData=JSON.parse(value);
  }
  constructor() { }
}
