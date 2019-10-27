import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormLoginFacade} from './form-login.facade';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  providers: [FormLoginFacade]
})
export class FormLoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private loginFacade: FormLoginFacade) {
  }

  public ngOnInit(): void {
    this.loginForm = this.loginFacade.init();
  }

  public onSubmit() {
    this.loginFacade.submit(this.loginForm.value);
  }
}
