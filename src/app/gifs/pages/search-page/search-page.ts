import { Component, inject, signal } from "@angular/core";
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from "../../services/gif.service";
import { Gif } from "../../interfaces/gif.interface";


@Component({
  templateUrl: './search-page.html',
  imports: [GifList]
})

export default class SearchPage {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe( (response: Gif[]) => {
      this.gifs.set(response);
    })
  }

}
