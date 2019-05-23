import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Comment } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class CommentForm {
  firstName: string;
  lastName: string;
  office: string;
  @bindable comments: Comment[];

  constructor(private ds: PoiService) {}

  addComment() {
    this.ds.createComment(this.firstName, this.lastName, this.office);
  }
}
