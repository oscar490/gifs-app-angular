import { GifService } from './../../services/gif.service';
import { Component, computed, inject } from "@angular/core";
import { GifList } from "../../components/gif-list/gif-list";


@Component({
  templateUrl: './trending-page.html',
  imports: [GifList]
})

export default class TrendingPage {

  gifService = inject(GifService);

}
