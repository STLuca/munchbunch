import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-table-dialog',
  templateUrl: './select-table-dialog.component.html',
  styleUrls: ['./select-table-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTableDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SelectTableDialogComponent>
  ) { }

  ngOnInit() {
  }

  submit(tableID) {
    this.dialogRef.close(tableID);
  }
}
