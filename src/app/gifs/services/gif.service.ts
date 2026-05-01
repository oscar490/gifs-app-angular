import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendinGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

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
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: 0,
        q: query
      }
    }).pipe(
      //  map( ({data}) => data ),
      //  map( items => GifMapper.mapGiphyItemsToGifArray(items))
      map( response => GifMapper.mapGiphyItemsToGifArray(response.data))
    )
  }

}
