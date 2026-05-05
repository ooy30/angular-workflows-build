import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AppConfig {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config.json')
    ).then(cfg => { this.config = cfg; });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }
}
