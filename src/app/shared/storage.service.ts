import {SonarrConfig} from "./domain/sonar.config.model";
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  storage: Storage = null;

  constructor() {
    this.storage = localStorage;
  }

  private setItem(key: string, value: any) {
    return this.storage.setItem(key, JSON.stringify(value));
  }

  private getItem(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  getSonarrConfig() {
    return new SonarrConfig(this.getItem('config'));
  }

  setSonarrConfig(config: SonarrConfig) {
    return this.setItem('config', config);
  }
}
