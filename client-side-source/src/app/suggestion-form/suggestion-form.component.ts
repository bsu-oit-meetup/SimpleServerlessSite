import { Component, OnInit } from '@angular/core';
import { SuggestionFormService } from '../suggestion-form.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {

  suggestionEndpoint = '';
  suggestion = '';
  // Angular form test :partyparrot:
  result = null;
  error = false;

  constructor(private suggestionFormService: SuggestionFormService) { }

  ngOnInit() {

  }

  submitSuggestion( ) {
    console.log(this.suggestion, ' ', this.suggestionEndpoint);
    this.suggestionFormService.postSuggestion(this.suggestionEndpoint, { suggestion: this.suggestion })
      .subscribe(data => {
        this.result = data;
      },
      error => {
        this.result = error;
      }
      );
  }

}
