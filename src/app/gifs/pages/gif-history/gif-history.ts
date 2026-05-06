import { Component, computed, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from "rxjs";
import { GifService } from "../../services/gif.service";
import { GifList } from "../../components/gif-list/gif-list";


@Component({
  templateUrl: './gif-history.html',
  imports: [GifList]
})

export default class GifHistory {

  /*
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']);
  })
    */

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'])
    )
  );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()) )

}
