import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurant-search-container',
  templateUrl: './restaurant-search-container.component.html',
  styleUrls: ['./restaurant-search-container.component.css']
})
export class RestaurantSearchContainerComponent {

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({

    });
   }

}
