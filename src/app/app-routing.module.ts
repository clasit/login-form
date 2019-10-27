import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/restricted/profile/profile.component';
import {PageRoute} from './pages/page-route';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthGuardService} from './shared/modules/authentication/services/auth-guard.service';

const routes: Routes = [
  {path: PageRoute.home, component: HomeComponent},
  {path: PageRoute.signUp, component: SignupComponent},
  {path: PageRoute.profile, component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
