import {Inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormValidationComponent} from './form-validation.component';
import {User} from '../../models/user.model';

@Injectable()
export class FormValidationFacade {
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<FormValidationComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User
  ) {
  }

  public init(): FormGroup {
    return this.formBuilder.group({
      code: ''
    });
  }

  public submit(code: string) {
    this.user.verificationCode = code;
    this.validateCode(this.user);
  }

  public close(): void {
    this.dialogRef.close();
  }

  private validateCode(user: User) {
    this.authService.signInVerify(user)
      .subscribe((response) => {
          if (response.errors) {
            throw response.errors;
          }
          this.dialogRef.close(response);
        },
        (error) => this.handleError(error.message));
  }

  private handleError(error: string[] | string) {
    console.log(error);
  }
}
