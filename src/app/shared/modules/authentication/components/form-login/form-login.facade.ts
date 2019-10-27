import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {PageRoute} from '../../../../../pages/page-route';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormValidationComponent} from '../form-validation/form-validation.component';

@Injectable()
export class FormLoginFacade {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) {
  }

  public init(): FormGroup {
    return this.formBuilder.group({
      email: [],
      password: []
    });
  }

  public submit(user: User) {
    this.authService.signIn(user)
      .subscribe((response) => {
          if (response.success) {
            this.askVerificationCode(response.data);
          } else {
            throw response.errors;
          }
        },
        (error) => this.handleError(error.message));
  }

  private askVerificationCode(user: User) {
    this.openDialog(user)
      .afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            if (response.success) {
              this.router.navigateByUrl(PageRoute.profile);
            } else {
              throw response.errors;
            }
          }
        },
        (error) => this.handleError(error.message));
  }

  private openDialog(user: User): MatDialogRef<FormValidationComponent> {
    return this.dialog.open(
      FormValidationComponent, {
        disableClose: true,
        data: user
      });
  }

  private handleError(error: string[] | string) {
    console.log(error);
  }
}
