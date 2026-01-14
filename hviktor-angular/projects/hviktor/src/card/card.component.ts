import { Component } from "@angular/core";

@Component({
    selector: 'hvi-card',
    standalone: true,
    template: '<ng-content />',
    host: {}
})

export class HviCard {}