import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RemoveAlert } from '../store/alerts/alerts.action';
import { selectAlerts } from '../store/alerts/alerts.reducer';
import { AlertState } from '../store/alerts/alerts.state';

@Component({
  selector: 'app-alerts-view',
  templateUrl: './alerts-view.component.html',
  styleUrls: ['./alerts-view.component.css']
})
export class AlertsViewComponent implements OnInit {

  alerts: Observable<string[]>;

  constructor(private store: Store<AlertState>) {
    this.alerts = this.store.select(selectAlerts);
   }

  ngOnInit() {
  }

  closeAlert(index) {
    this.store.dispatch(new RemoveAlert({index}));
  }
}
