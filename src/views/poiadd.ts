import { inject } from 'aurelia-framework';
import { Comment, Poi } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Poiadd {
  pois: Poi[];
  paymentMethods: string[];
  comments: Comment[];
  total = 0;

  constructor(private ds: PoiService) {
    this.comments = ds.comments;
    this.pois = ds.pois;
    this.paymentMethods = ds.paymentMethods;
    this.total = ds.total;
  }
}
