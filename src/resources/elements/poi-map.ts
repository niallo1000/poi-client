import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { TotalUpdate } from '../../services/messages';
import { Poi } from '../../services/poi-types';

@inject(EventAggregator)
export class PoiMap {
  mapId = 'pois-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ea: EventAggregator) {
    ea.subscribe(TotalUpdate, msg => {
      this.renderPoi(msg.poi);
    });
  }

  renderPoi(poi: Poi) {
    if (this.map) {
      const poiStr = `${poi.comment.firstName} ${poi.comment.lastName} €${poi.name.toString()}`;
      this.map.addMarker(poi.location, poiStr);
      this.map.moveTo(12, poi.location);
    }
  }

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203 },
      zoom: 8,
      minZoom: 7
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
  }
}
