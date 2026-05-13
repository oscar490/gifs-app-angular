import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ScrollStateService {

  trendingScrollState = signal(0);

  setTredingScrollState(state: number) {
    this.trendingScrollState.set(state);
  }
}
