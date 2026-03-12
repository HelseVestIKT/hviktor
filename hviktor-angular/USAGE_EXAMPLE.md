// app.config.ts or app.module.ts
import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Import the web components library (registers all custom elements)
import '@helsevestikt/hviktor-icons';

export const appConfig: ApplicationConfig = {
// ... other config
// Add CUSTOM_ELEMENTS_SCHEMA if using standalone components
};

// Or for NgModule:
// @NgModule({
// schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })

// Now in your Angular templates, you get full IntelliSense:
// <hvi-icon-airplane size="lg"></hvi-icon-airplane>
