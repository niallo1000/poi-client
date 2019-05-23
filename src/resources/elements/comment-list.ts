import { bindable } from 'aurelia-framework';
import { Comment } from '../../services/poi-types';

export class CommentList {
  @bindable
  comments: Comment[];
}
