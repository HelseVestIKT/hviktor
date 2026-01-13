import { booleanAttribute, Directive, HostBinding, Input } from "@angular/core";

/**
 * Direktive som gjør at vanlige `<button>`- og `<a>`-elementer får DS-knappestiler samt attributter
 * for størrelse, variant, farge og ikon/loader-tilstander slik at de kan kodes som design tokens.
 *
 * @remarks
 * Som utvikler kan du bruke `hviButton` for å holde markup ren mens du styrer visuell
 * fremtoning via inputs. Direktiven binder automatisk riktige klasser og aria-attributter basert
 * på prop-verdiene, slik at knappene både ser riktige ut og gir god tilgjengelighet.
 *
 * @property size Justerer knappens størrelse (`'sm' | 'md' | 'lg'`) ved å sette `data-size`.
 * @property variant Setter visuell variant (`'primary' | 'secondary' | 'tertiary'`) via `data-variant`.
 * @property type Angir knappetype (`'button' | 'submit' | 'reset'`) og eksponeres som `type`.
 * @property color Velger fargetema (`'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger'`) på `data-color`.
 * @property icon Flag som markerer ikonknapp med `data-icon`.
 * @property loading Aktiverer `aria-busy="true"` og viser lastestatus når satt.
 * @property fullWidth Stretcher knappen til full bredde via `data-fullWidth`.
 */
@Directive({
    selector: 'button[hviButton], a[hviButton]',
    standalone: true,
})

export class HviButtonDirective {
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger' = 'accent';

    @Input({ transform: booleanAttribute }) icon = false;
    @Input({ transform: booleanAttribute }) loading = false; 
    @Input({ transform: booleanAttribute }) fullWidth = false;

    @HostBinding('class.ds-button') hostClass = true;
    @HostBinding('attr.type') get attrType() {
    return this.type;
    }
    @HostBinding('attr.data-size') get dataSize() {
        return this.size;
    }
    @HostBinding('attr.data-variant') get dataVariant() {
        return this.variant;
    }

    @HostBinding('attr.data-color') get dataColor() {
        return this.color;
    }
    @HostBinding('attr.data-fullWidth') get dataFullWidth() {
        return this.fullWidth ? '' : null;
    }
    @HostBinding('attr.data-icon') get dataIcon() {
        return this.icon ? '' : null;
    }
    @HostBinding('attr.aria-busy') get dataLoading() {
        return this.loading ? 'true' : null;
    }
}