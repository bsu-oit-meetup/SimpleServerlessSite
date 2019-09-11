import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestionFormService {

  constructor(private http: HttpClient) { }

  postSuggestion(endpoint, suggestion) {
    return this.http.post(endpoint, suggestion);
  }
}
