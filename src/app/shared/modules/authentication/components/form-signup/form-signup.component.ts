import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormSignupFacade} from './form-signup.facade';

@Component({
  selector: 'form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
  providers: [FormSignupFacade]
})
export class FormSignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private loginFacade: FormSignupFacade) {
  }

  public ngOnInit(): void {
    this.signupForm = this.loginFacade.init();
  }

  public onSubmit() {
    this.loginFacade.submit(this.signupForm.value);
  }
}
