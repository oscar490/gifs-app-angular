import { Gif } from './../../../interfaces/gif.interface';
import { Component, inject } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gif.service';

interface MainOption {
  label: string,
  sublabel: string,
  route: string,
  icon: string
}

@Component({
  selector: 'gifts-side-main-options',
  templateUrl: './side-main-options.html',
  imports: [RouterLink, RouterModule]
})

export class SideMainOptions {

  gifService = inject(GifService);

  mainOptions: MainOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs Populars',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      sublabel: 'Serach gifs',
      route: '/dashboard/search'
    }
  ]
}
