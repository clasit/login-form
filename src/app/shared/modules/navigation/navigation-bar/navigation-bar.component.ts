import {Component, OnInit} from '@angular/core';
import {FormLoginFacade} from '../../authentication/components/form-login/form-login.facade';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'navigation-bar',
  templateUrl: 'navigation-bar.component.html',
  styleUrls: ['navigation-bar.component.scss'],
  providers: [FormLoginFacade]
})
export class NavigationBarComponent implements OnInit {

  constructor(public translate: TranslateService) {
  }

  public ngOnInit(): void {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang.match(/en|es/) ? browserLang : 'en';
    this.translate.use(lang);
  }
}
