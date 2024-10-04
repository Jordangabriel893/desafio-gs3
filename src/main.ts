import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { isDevMode } from '@angular/core';

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }

  return Promise.resolve()
}
prepareApp().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
})
