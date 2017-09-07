import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Worklet',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  workletName:String="Absence";
  constructor() { }

  ngOnInit() {
  }

}
