import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../flight.model'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    
  constructor(private flightsService : FlightsService) {}
  flightList! : any[];
  loading=true;
  id!:number;
  origin! : string;
  destination! : string;
  depart! : Date;
  arrive! : Date;
  nonstop : boolean=false;
  flightNo! : number;

  ngOnInit(): void { 
    this.refresh();
  }

  
  sendFlight(){
    const flight : Flight={
      id:this.id,
      origin: this.origin,
      destination : this.destination,
      flightNo: this.flightNo,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    }
    this.flightsService.postFlight(flight).subscribe((data:any)=>{
      if(data){
        this.refresh();
      }
    });
  }

  update(flight : Flight){
    this.flightsService.updateFlight(flight).subscribe((data:any) =>{
      if(data && data['affected']){
        this.refresh();
      }
    });
  }

  toggleNonstop(){
    this.nonstop=!this.nonstop;
  }

  delete(flight : Flight){
    if(window.confirm("Are you sure want to delete this flight?")){
    this.flightsService.deleteFlight(flight.id).subscribe((data:any)=>{
      if(data && data['affected']){
        this.refresh();
      }
    });
   }
  }
  
  refresh(){
    this.loading=true;
    this.flightsService.getAllFlights().subscribe(data => {
      this.flightList=data;
      this.loading=false;
    })
  }

}
