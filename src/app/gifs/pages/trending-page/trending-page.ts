import { GifService } from './../../services/gif.service';
import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from "@angular/core";
import { GifList } from "../../components/gif-list/gif-list";
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  templateUrl: './trending-page.html',
  imports: [GifList]
})

export default class TrendingPage implements AfterViewInit {

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }

    const {scrollTop, clientHeight, scrollHeight} = scrollDiv;
    const isABottom = (scrollTop + (clientHeight + 300)) >= scrollHeight;

    this.scrollStateService.setTredingScrollState(scrollTop);

    if (isABottom) {
      this.gifService.loadTrendingGifs();
    }
  }

}
