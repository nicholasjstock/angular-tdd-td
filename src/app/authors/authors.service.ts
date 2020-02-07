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