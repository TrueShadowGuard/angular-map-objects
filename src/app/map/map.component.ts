import {Component, NgZone} from '@angular/core';
import {Icon, icon, latLng, marker, tileLayer, Map as LMap, DivIcon} from "leaflet";
import {Point, points} from "../points";

const redIcon = icon({
  ...Icon.Default.prototype.options,
  iconUrl: 'assets/marker_red.svg',
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  constructor() {}
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>'})
    ],
    zoom: 3,
    center: latLng(13, 100)
  };
  points = points;
  map !: LMap;
  createMarker(point: Point) {
    const m = marker([point.latitude, point.longitude], {icon: redIcon});
    m.bindTooltip(point.name, {permanent: true}).openPopup();
    return m;
  }
  onMapReady(map: LMap) {
    this.map = map;
  }

  onObjectSelect(p: Point) {
    this.map.setView([p.latitude, p.longitude], 10);
  }
}
