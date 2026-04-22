import { Component } from "@angular/core";
import { SideMainHeader } from "./side-main-header/side-main-header";
import { SideMainOptions } from "./side-main-options/side-main-options";

@Component({
  selector: 'gifs-side-main',
  templateUrl: './side-main.html',
  imports: [SideMainHeader, SideMainOptions]
})

export class SideMain {}
