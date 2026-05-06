import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendinGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
    this.loadSearchHistory();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());

    localStorage.setItem("history", historyString);
  })

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

  loadSearchHistory(): void {
    let history = JSON.parse(localStorage.getItem('history') ?? '') ?? {};
    this.searchHistory.set(history);
  }

  searchGifs(query: string): Observable<Gif[]> {
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
      map( response => GifMapper.mapGiphyItemsToGifArray(response.data)),
      //  History
      tap( items => {
        this.searchHistory.update(history => {
          return {...history, [query.toLowerCase()]: items};
        });

      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
