import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidationFacade} from './form-validation.facade';

@Component({
  selector: 'form-validation',
  templateUrl: 'form-validation.component.html',
  styleUrls: ['form-validation.component.scss'],
  providers: [FormValidationFacade]
})
export class FormValidationComponent implements OnInit {

  public formValidation: FormGroup;

  constructor(private formValidationFacade: FormValidationFacade) {
  }

  public ngOnInit(): void {
    this.formValidation = this.formValidationFacade.init();
  }

  public onSubmit() {
    const code = this.formValidation.value.code;
    this.formValidationFacade.submit(code);
  }

  public close(): void {
    this.formValidationFacade.close();
  }
}
