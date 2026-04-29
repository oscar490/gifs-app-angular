import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendinGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        apiKey: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe( (response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendinGifs.set(gifs);
      console.log(gifs);
    })
  }

}
