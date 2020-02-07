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
  public isDataLoaded: boolean;
  public constructor(private authorsService: AuthorsService) {
        
    }

    
  ngOnInit() {
    
      this.isDataLoaded = false;
    let data = this.authorsService
    .all({
        // include: ['books', 'photos'],
    });

    data.subscribe(authors => {
      
      this.authors = authors;
      
    }, null, () => {
      this.isDataLoaded = true;
     
      
    })
  }
}
