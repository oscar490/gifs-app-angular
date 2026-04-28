import { Component, input, OnInit } from "@angular/core";
import { GifListItem } from "./gif-list-item/gif-list-item";


@Component({
  selector: 'gif-list',
  templateUrl: './gif-list.html',
  imports: [GifListItem]
})

export class GifList {

  gifs = input.required<string[]>();
}
