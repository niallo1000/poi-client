import { inject } from 'aurelia-framework';
import { Comment } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Comments {
  comments: Comment[];

  constructor(private ds: PoiService) {
    this.comments = ds.comments;
  }
}
