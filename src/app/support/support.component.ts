import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
   
  toDisplay=false;
  toDisplay1=false;
  toDisplay2=false;
  toDisplay3=false;
  toDisplay4=false;
  toDisplay5=false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleData(){
    this.toDisplay=!this.toDisplay;
  }
  

  toggleData1(){
    this.toDisplay1=!this.toDisplay1;
  }

  toggleData2(){
    this.toDisplay2=!this.toDisplay2;
  }

  toggleData3(){
    this.toDisplay3=!this.toDisplay3;
  }

  toggleData4(){
    this.toDisplay4=!this.toDisplay4;
  }

  toggleData5(){
    this.toDisplay5=!this.toDisplay5;
  }

}
