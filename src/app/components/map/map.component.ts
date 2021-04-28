import { MapsAPILoader } from '@agm/core';
import { Component, Input, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { Common } from '../../models/common/common.namespace';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'map-component',
    templateUrl: './map.component.html',
    styles: ['./map.component.scss']
})
export class MapComponent extends BaseComponent{

    @Input() mapModel: Common.MapModel;
    @Output() MarkerClicked: EventEmitter<any> = new EventEmitter();
    
    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number;
    lng: number;

    height = 0;


    // type of map: "roadmap" | "hybrid" | "satellite" | "terrain" | string
    type:string = "roadmap";

    info:boolean = false; 

    public markers: Array<Common.MapMarker>;

    private geoCoder;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      public router: Router,
      public ngZone: NgZone,
      public platform: Platform
    ){
      super(router, ngZone);
      console.log(platform.height());
      this.height = platform.height();

    }

    public ngOnInit(): void {
        this.markers = this.mapModel.markers;
        this.lat = this.mapModel.centerLat;
        this.lng = this.mapModel.centerLon;
        this.zoom = this.mapModel.initialZoom;
        this.type = this.mapModel.type;
    }

    public clickedMarker(label: string, index: number): void  {
        console.log(`clicked the marker: ${label || index}`)
        this.MarkerClicked.emit(index);
    }

    public mapClicked($event: MouseEvent): void {
        
    }

    markerDragEnd(m: Common.MapMarker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

}
