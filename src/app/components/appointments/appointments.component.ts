
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  form = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date:  new FormControl('', [Validators.required]),
  });
  
  get f(){
    return this.form.controls;
  }
  

  imgURL = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Nuremberg_chronicles_-_Dance_of_Death_%28CCLXIIIIv%29.jpg'
  myDatePicker = null;
  date: any;
  isSelectDate: Boolean = false;
  appointmentsOfTheDay: any = [];
  startAppointment: any;
  endAppointment: any;

  constructor(
    // @Inject(DOCUMENT) document: any,
    private appointmentsService: AppointmentsService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  

  dateChange($event: any){
    this.date = new Date($event.value);

    this.appointmentsOfTheDay = []

    let workHours = 9;
    for(let i = 0; i < 10; i++){
      document.getElementById(workHours++ + ':00')?.removeAttribute("disabled");
    }

    this.appointmentsService.getAllAppointments()
      .subscribe(
        res => {
          let appointments: any = res.appointments;
          appointments.forEach((appointment: any) => {
            let date = new Date(appointment.startAppointment)
            let dateOfAppointments = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
            let dateSelected = this.date.getDate() + '-' + this.date.getMonth() + '-' + this.date.getFullYear()
            if(dateOfAppointments == dateSelected){
              // console.log(appointment)
              this.appointmentsOfTheDay.push(appointment);
            }
          });

          for(let appointment of this.appointmentsOfTheDay){
            let hour = new Date(appointment.startAppointment).getHours() + 3;
            console.log("set disabled");
            document.getElementById(hour + ':00')?.setAttribute("disabled","disabled");
          }
        },
        err => {
          console.log(err)
        }
      );
    
    // console.log(this.appointmentsOfTheDay)

  }

  timePicker(hour: number){
    // console.log(hour)
    this.startAppointment = hour;
    this.endAppointment = hour + 1;
  }

  makeAppointment(name: String, email: String){
    // Se asigna las horas contemplando la variacion horaria con UTC
    this.startAppointment = this.date.setHours(this.startAppointment - 3);
    this.endAppointment = this.date.setHours(this.endAppointment - 3);

    // console.log(this.startAppointment);

    const appointment = {
      name,
      email,
      startAppointment: this.startAppointment,
      endAppointment: this.endAppointment
    }

    // console.log(appointment);

    this.appointmentsService.makeAppointment(appointment)
      .subscribe(
        res => {
          // console.log(res)
          this.toastrService.success(res.message)
          window.location.reload();
        }, err => {
          console.log(err)
          this.toastrService.error(err.error.Error, err.error.message)
        }
      );
  }


}
