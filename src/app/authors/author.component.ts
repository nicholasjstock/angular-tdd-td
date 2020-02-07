import { Component, OnInit } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './authors.service';



@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})

export class AuthorComponent implements OnInit {
  public authors: DocumentCollection<Author>;
  public isDataLoaded: boolean;
  public constructor(private authorsService: AuthorsService) {
        
    }

    
  ngOnInit() {
    
  }
}
