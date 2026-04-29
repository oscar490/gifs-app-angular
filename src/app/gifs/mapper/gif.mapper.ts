import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from './../interfaces/giphy.interface';

export class GifMapper {

  static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url
    }
  }

  static mapGiphyItemsToGifArray(giphyItems: GiphyItem[]): Gif[] {
    return giphyItems.map(this.mapGiphyItemToGif);
  }

}
