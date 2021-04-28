import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';


@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
      
})
export class ProgressBarComponent extends BaseComponent {

    @Input('progress') progress;

    constructor(
      public router: Router,
      public ngZone: NgZone
    ){
      super(router, ngZone);

    }

}

