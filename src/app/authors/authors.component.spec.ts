import { async, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';

import { AuthorsComponent } from './authors.component';
import { AuthorComponent } from './author.component';
import {Location} from "@angular/common";
import { AuthorsService } from './authors.service';
import {By} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module"
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { of } from 'rxjs';
import Pretender from 'pretender';
const authors = {"meta":{"page":1,"resources_per_page":10,"total_resources":11},"data":[{"type":"authors","id":"1","attributes":{"name":"Everett Fahey PhD","birthplace":"British Virgin Islands","date_of_birth":"1991-10-04","date_of_death":"1970-02-23"},"relationships":{"photos":{"data":[{"type":"photos","id":"1"},{"type":"photos","id":"2"}]},"books":{"data":[{"type":"books","id":"20"},{"type":"books","id":"47"}]}},"links":{"self":"\/authors\/1"}},{"type":"authors","id":"2","attributes":{"name":"Prof. Amani Ledner I","birthplace":"Panama","date_of_birth":"2016-04-17","date_of_death":"1978-11-17"},"relationships":{"photos":{"data":[]},"books":{"data":[]}},"links":{"self":"\/authors\/2"}},{"type":"authors","id":"3","attributes":{"name":"Joshua Shanahan","birthplace":"Qatar","date_of_birth":"1979-10-06","date_of_death":"2018-05-29"},"relationships":{"photos":{"data":[{"type":"photos","id":"3"}]},"books":{"data":[{"type":"books","id":"17"},{"type":"books","id":"49"}]}},"links":{"self":"\/authors\/3"}},{"type":"authors","id":"4","attributes":{"name":"Loyal Effertz","birthplace":"Burkina Faso","date_of_birth":"1977-03-23","date_of_death":"1974-11-23"},"relationships":{"photos":{"data":[{"type":"photos","id":"4"},{"type":"photos","id":"5"}]},"books":{"data":[{"type":"books","id":"9"},{"type":"books","id":"38"}]}},"links":{"self":"\/authors\/4"}},{"type":"authors","id":"5","attributes":{"name":"Kavon Wunsch","birthplace":"Taiwan","date_of_birth":"1972-01-05","date_of_death":"1991-12-14"},"relationships":{"photos":{"data":[]},"books":{"data":[{"type":"books","id":"1"},{"type":"books","id":"2"}]}},"links":{"self":"\/authors\/5"}},{"type":"authors","id":"6","attributes":{"name":"Darrel McGlynn","birthplace":"Mauritius","date_of_birth":"1980-05-10","date_of_death":"1981-07-13"},"relationships":{"photos":{"data":[{"type":"photos","id":"6"}]},"books":{"data":[{"type":"books","id":"3"}]}},"links":{"self":"\/authors\/6"}},{"type":"authors","id":"7","attributes":{"name":"Prof. Birdie Reynolds III","birthplace":"Guinea-Bissau","date_of_birth":"1983-08-15","date_of_death":"1998-01-12"},"relationships":{"photos":{"data":[{"type":"photos","id":"7"},{"type":"photos","id":"8"}]},"books":{"data":[{"type":"books","id":"34"}]}},"links":{"self":"\/authors\/7"}},{"type":"authors","id":"8","attributes":{"name":"Hailey Harber","birthplace":"Saint Kitts and Nevis","date_of_birth":"1970-05-06","date_of_death":"1989-06-03"},"relationships":{"photos":{"data":[]},"books":{"data":[{"type":"books","id":"27"}]}},"links":{"self":"\/authors\/8"}},{"type":"authors","id":"9","attributes":{"name":"Dr. Aron Cruickshank DDS","birthplace":"Nigeria","date_of_birth":"2006-05-21","date_of_death":"1971-12-24"},"relationships":{"photos":{"data":[{"type":"photos","id":"9"}]},"books":{"data":[{"type":"books","id":"30"}]}},"links":{"self":"\/authors\/9"}},{"type":"authors","id":"10","attributes":{"name":"Ervin Kihn","birthplace":"Barbados","date_of_birth":"1985-03-04","date_of_death":"1976-09-22"},"relationships":{"photos":{"data":[{"type":"photos","id":"10"},{"type":"photos","id":"11"}]},"books":{"data":[{"type":"books","id":"4"}]}},"links":{"self":"\/authors\/10"}}]}



const server = new Pretender(function() {
  this.get('http://jsonapiplayground.reyesoft.com/v2/authors', request => {
    let all =  JSON.stringify(authors);
    return [200, {"Content-Type": "application/vnd.api+json"}, all]
  });

  
});
server.undhandledRequest = function(verb, path, request) {
console.log("what is this I don't even...");
}


describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let server: Pretender;
  let location: SpyLocation;
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ AuthorsComponent ,AuthorComponent],
      providers: [AuthorsService],
      
      imports:  [NgxJsonapiModule.forRoot({
        url: '//jsonapiplayground.reyesoft.com/v2/'
      }), RouterTestingModule.withRoutes([
        { path: 'authors/:id', component: AuthorComponent}
      ])]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  async function timeout(ms) {
    return  new Promise(resolve => setTimeout(resolve, ms));
  }

   async function waitUntilTrue (testFunction){
    while (testFunction() != true){
      await timeout(5);
    }
  }
  it('show all the authors', async () =>  {
    
    
    await waitUntilTrue(function(){
      return component.isDataLoaded == true
    });

    fixture.detectChanges();

    const authorElements = fixture.debugElement.queryAll(By.css('.author'));
    expect(authorElements.length).toBeGreaterThan(3);

  });
});
