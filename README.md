# 
```ng new angular-tdd```
```cd angular-tdd```
```ng g c authors```
```yarn add ngx-jsonapi@2.1.12 --save```
```npm test```
```touch authors/authors.service.ts```
authors.service.ts:
```
import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource, DocumentCollection, DocumentResource } from 'ngx-jsonapi';

export class Author extends Resource {
    public attributes = {
        name: 'default name',
        date_of_birth: ''
    };

    public relationships = {
     };
}

@Injectable()
export class AuthorsService extends Service<Author> {
    public resource = Author;
    public type = 'authors';
}
```
replace component with
```
import { Component, OnInit } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  public authors: DocumentCollection<Author>;
  public constructor(private authorsService: AuthorsService) {
        authorsService
            .all({
                // include: ['books', 'photos'],
            })
            .subscribe(authors => (this.authors = authors));
    }

  ngOnInit() {
  }

}

```

test fail. "NullInjectorError: StaticInjectorError(DynamicTestModule)[AuthorsComponent -> AuthorsService]: 
  StaticInjectorError(Platform: core)[AuthorsComponent -> AuthorsService]: 
    NullInjectorError: No provider for AuthorsService!"


add provider to the test bed

test fail. TypeError: Cannot read property 'getResourceService' of undefined

add imports.
imports:  [NgxJsonapiModule.forRoot({
        url: '//jsonapiplayground.reyesoft.com/v2/'
      })]


```providers: [AuthorsService]```


add in authors component spec 

```
imports:  [NgxJsonapiModule.forRoot({
        url: '//jsonapiplayground.reyesoft.com/v2/'
      })]

```
test pass!
add to test

```
it('show all the authors', () => {
    const authorElements = fixture.debugElement.queryAll(By.css('.authors'));
    expect(authorElements.length).toBeGreaterThan(3);
  });
```


# AngularTdd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
