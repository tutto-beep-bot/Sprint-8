import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { Location } from '../interfaces/location';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  map!: mapboxgl.Map;

  constructor(private _mapService: MapService) {}

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZGF2aXR1dHRvIiwiYSI6ImNtYzlmaWlscTAyYzMyanNkeXRlMGRpeGYifQ.ZUPsfuvZNp45KVF9fnH0uw',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12
    });

    this._mapService.getLocations().subscribe((locations: Location[]) => {
      locations.forEach(loc => {
        new mapboxgl.Marker()
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(new mapboxgl.Popup().setText(loc.name))
          .addTo(this.map)
      })
    })
  }
}
