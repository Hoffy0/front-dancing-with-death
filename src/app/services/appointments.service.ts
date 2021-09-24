import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { API } from '../../shared/const';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {


  constructor(
    private http: HttpClient
  ) { }

  makeAppointment(appointment: any){
    return this.http.post<any>(API.URL + '/appointment/add', appointment, {
      headers: { 
        'Content-Type': 'application/json',
      },
      
    });
  };

  getAllAppointments(){
    return this.http.get<any>(API.URL + '/appointment');
  }

}
