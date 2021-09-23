import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  imgURL = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Nuremberg_chronicles_-_Dance_of_Death_%28CCLXIIIIv%29.jpg'
  myDatePicker = null;
  startAppointment: any;
  endAppointment: any;

  constructor(
    private appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {

  }

  dateChange($event: any){
    let date = new Date($event.value);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    // startAppointment
    date.setHours(hoursDiff);
    this.startAppointment = date.toJSON();
    // console.log(this.startAppointment);
    
    //endAppointment
    let oneHourDance = date.getHours() + 1;
    date.setHours(oneHourDance);
    this.endAppointment = date.toJSON();
    // console.log(this.endAppointment);
  }

  makeAppointment(name: String, email: String){
    const appointment = {
      name,
      email,
      startAppointment: this.startAppointment,
      endAppointment: this.endAppointment
    }
    this.appointmentsService.makeAppointment(appointment)
      .subscribe(
        res => {
          console.log(res)
        }, err => {
          console.log(err)
        }
      );
  }


}
