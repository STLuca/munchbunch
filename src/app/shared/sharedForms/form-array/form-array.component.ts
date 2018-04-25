import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayComponent implements OnInit {


  @Input() formGroup: FormGroup;
  @Input() key: string;
  @Input() createForm: () => FormGroup;
  @Input() name: string;
  @ContentChild(TemplateRef) formTemplate: TemplateRef<any>;


  constructor() { }

  ngOnInit() {

  }

  get formArray(): FormArray {
    return this.formGroup.get(this.key) as FormArray;
  }

  addOrderForm() {
    this.formArray.push(this.createForm());
  }

  removeForm(i: number) {
    this.formArray.removeAt(i);
  }

  getContextObj(index: number) {
    return this.formArray[index];
  }
}

