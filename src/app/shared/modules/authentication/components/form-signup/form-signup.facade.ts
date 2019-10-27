import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {PageRoute} from '../../../../../pages/page-route';

@Injectable()
export class FormSignupFacade {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  public init(): FormGroup {
    return this.formBuilder.group({
      name: [],
      email: [],
      password: []
    });
  }

  public submit(user: User) {
    this.authService.signUp(user)
      .subscribe((response) => {
          if (response.success) {
            this.router.navigateByUrl(PageRoute.home);
          } else {
            throw response.errors;
          }
        },
        (error) => this.handleError(error.message));
  }

  private handleError(error: string[] | string) {
    console.log(error);
  }
}
