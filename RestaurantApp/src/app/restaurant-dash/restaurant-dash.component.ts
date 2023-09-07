import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent {

  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;

  constructor(private formBuilder: FormBuilder , private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });

    this.getAllData()
  }

  addRestro(){
    // this.restaurantModelObj.id = this.formValue;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe((ref)=> {
      console.log(ref);
       this.getAllData()

    });    
  }

  getAllData(){
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
      console.log('getdata',res)
    })
  }  


}
