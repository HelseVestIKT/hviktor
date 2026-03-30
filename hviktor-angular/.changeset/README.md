# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

## Slik bruker du changesets

Når du gjør en endring som påvirker brukere av `@helsevestikt/hviktor-angular`, legg til en changeset:

```bash
npx changeset
```

Du blir spurt om:

1. Hvilken pakke som er endret (`@helsevestikt/hviktor-angular`)
2. Om det er `patch`, `minor` eller `major`
3. En kort beskrivelse av endringen

Dette oppretter en liten `.md`-fil i denne mappen. Commit den sammen med koden din.

Se [RELEASE.md](../RELEASE.md) for full publiseringsprosedyre.
