import { bindable } from 'aurelia-framework';
import { Comment } from '../../services/poi-types';

export class CommentForm {
  firstName: string;
  lastName: string;
  office: string;
  @bindable
  comments: Comment[];

  addComment() {
    const comment = {
      firstName: this.firstName,
      lastName: this.lastName,
      office: this.office,
      _id: ''
    };
    this.comments.push(comment);
    console.log(comment);
  }
}
