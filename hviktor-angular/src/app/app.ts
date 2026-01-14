import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviButton } from '@helsevestikt/hviktor';
import { HviAlert } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
