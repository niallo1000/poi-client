import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Comment, Poi, Location } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';


@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  comments: Comment[] = [];
  pois: Poi[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  total = 0;

  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
     // http.withBaseUrl('https://elated-mechanic-1.glitch.me');
    });
  }

  async getComments() {
    const response = await this.httpClient.get('/api/comments');
    this.comments = await response.content;
    console.log(this.comments);
  }

  async createComment(firstName: string, lastName: string, office: string) {
    const comment = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    const response = await this.httpClient.post('/api/comments', comment);
    const newComment = await response.content;
    this.comments.push(newComment);
  }

  async poiadd(name: string, description: string, catagory: string, comment: Comment, location : Location) {
    const poi = {
      name: name,
      description: description,
      catagory: catagory,
      comment: comment,
      location : location
    };
    const response = await this.httpClient.post('/api/comments/' + comment._id + '/pois', poi);
    this.pois.push(poi);
   // this.total = this.total + amount;
   // this.ea.publish(new TotalUpdate(this.total, poi));
  //  console.log('Total so far ' + this.total);
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getComments();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.poi = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.poi !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.poi);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
