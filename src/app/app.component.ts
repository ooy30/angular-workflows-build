import { Component } from '@angular/core';
import { environment } from '../environments/environment';

const d = (s: string) => atob(s);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  envName = d(environment.envName);
  apiUrl  = d(environment.apiUrl);
  isProd  = d(environment.production) === 'true';
}
