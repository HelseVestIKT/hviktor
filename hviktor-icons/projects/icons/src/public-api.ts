/*
 * Public API Surface of icons
 */

export * from './lib/icons/icon-user.component';
export * from './lib/icons/icon-home.component';

import { registerIconsAsCustomElements } from './lib/register-elements';

registerIconsAsCustomElements();

