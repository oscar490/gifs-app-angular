import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";

const GIF_KEY = 'history';

const loadFromLocalStorage = () => {
  //  Record<string, Gif[]>
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';

  return JSON.parse(gifsFromLocalStorage);
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendinGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendinGifs().length; i += 3) {
      groups.push(this.trendinGifs().slice(i, i + 3));
    }

    console.log(groups);

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());

    localStorage.setItem(GIF_KEY, historyString);
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
