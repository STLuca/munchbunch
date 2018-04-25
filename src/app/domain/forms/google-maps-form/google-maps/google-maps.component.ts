import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @Input() form: FormGroup;
  coordinates: Observable<any>;
  selectedCoordinates: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {
    this.coordinates = this.selectedCoordinates.asObservable().pipe(startWith({lat: 51.50361379162682, lng: -0.1318359375}));
    this.selectedCoordinates.subscribe(x => this.form.get('location').setValue(new firestore.GeoPoint(x.lat, x.lng)));
  }

}
