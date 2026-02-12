import { Component } from '@angular/core';
import { HviAvatar, HviButton, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [HviAvatar, HviButton, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Avatar</h1>
      <p hviParagraph>Viser profilbilde eller initialer for en bruker.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex items-center gap-4">
        <hvi-avatar ariaLabel="Erlend Johnsen" />
        <hvi-avatar variant="square" ariaLabel="Erlend Johnsen" />
        <hvi-avatar initials="EJ" ariaLabel="Erlend Johnsen" />
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Størrelser</h2>
      <div class="mt-4 flex items-center gap-4">
        <hvi-avatar initials="xs" ariaLabel="Erlend Johnsen" size="xs" />
        <hvi-avatar initials="sm" ariaLabel="Erlend Johnsen" size="sm" />
        <hvi-avatar initials="md" ariaLabel="Erlend Johnsen" size="md" />
        <hvi-avatar initials="lg" ariaLabel="Erlend Johnsen" size="lg" />
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">I knapp</h2>
      <div class="mt-4 flex items-center gap-4">
        <button hviButton variant="secondary">
          <hvi-avatar initials="EJ" ariaLabel="Erlend Johnsen" size="sm" />
          Button with Avatar
        </button>
      </div>
    </section>
  `,
})
export class AvatarDemoComponent {}
