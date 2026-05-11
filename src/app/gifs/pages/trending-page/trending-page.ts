import { GifService } from './../../services/gif.service';
import { Component, computed, ElementRef, inject, viewChild } from "@angular/core";
import { GifList } from "../../components/gif-list/gif-list";


@Component({
  templateUrl: './trending-page.html',
  imports: [GifList]
})

export default class TrendingPage {

  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }

    const {scrollTop, clientHeight, scrollHeight} = scrollDiv;

    const isABottom = (scrollTop + (clientHeight + 300)) >= scrollHeight;

    if (isABottom) {
      this.gifService.loadTrendingGifs();
    }
  }

}
