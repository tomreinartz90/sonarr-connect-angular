import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Config } from "../config/env.config";

// depending on the env mode, enable prod mode or add debugging modules

if ( Config.env === 'prod' ) {
  enableProdMode();
}

export function main():any {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
