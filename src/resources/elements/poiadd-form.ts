import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Comment, Location } from '../../services/poi-types';
import { PoiService } from '../../services/poi-service';

@inject(PoiService)
export class PoiaddForm {
 // @bindable paymentMethods: string[];
  @bindable comments: Comment[];

  name = '';
  description = '';
  catagory = '';
 // selectedMethod = '';
  selectedComment: Comment = null;

  location: Location = { lat: 53.2734, lng: -7.7783203 };

  constructor(private ds: PoiService) {}

  makePoi() {
    this.ds.poiadd(this.name, this.description, this.catagory, this.selectedComment, this.location);
  }
}
