// app.config.ts
import { ApplicationConfig } from '@angular/core';

// Import the web components library (registers all custom elements)
import '@helsevestikt/hviktor-icons';

export const appConfig: ApplicationConfig = {
  // ... other config
};

// For a standalone root component, configure CUSTOM_ELEMENTS_SCHEMA
// on the component itself:
// app.component.ts
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//
// @Component({
//   standalone: true,
//   selector: 'app-root',
//   template: `
//     <hvi-icon-airplane size="lg"></hvi-icon-airplane>
//   `,
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
// })
// export class AppComponent {}

// Or for NgModule-based apps, configure CUSTOM_ELEMENTS_SCHEMA
// on the NgModule:
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//
// @NgModule({
//   declarations: [AppComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
// })
// export class AppModule {}

// Now in your Angular templates, you get full IntelliSense:
// <hvi-icon-airplane size="lg"></hvi-icon-airplane>
