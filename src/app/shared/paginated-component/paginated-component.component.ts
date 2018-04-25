import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-paginated-component',
  templateUrl: './paginated-component.component.html',
  styleUrls: ['./paginated-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatedComponentComponent implements OnInit {

  @Output() newPagination = new EventEmitter<PageEvent>();

  form: FormGroup;
  countOption: number[] = [5, 10, 25, 50];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      page: [1],
      count: [10]
    });
   }

  ngOnInit() {
  }

}
