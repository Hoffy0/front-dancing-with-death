import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  imgURL = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Nuremberg_chronicles_-_Dance_of_Death_%28CCLXIIIIv%29.jpg'
  myDatePicker = null;
  selectedDate: any;

  constructor() { }

  ngOnInit(): void {

  }

  dateChange($event: any){
    this.selectedDate = new Date($event.value)
    this.selectedDate = this.selectedDate.toJSON()
    console.log(this.selectedDate)
  }


}
