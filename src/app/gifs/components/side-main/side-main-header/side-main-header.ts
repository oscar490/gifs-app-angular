import { Component } from "@angular/core";
import { environment } from "@environments/environment.development";


@Component({
  selector: 'gifts-side-main-header',
  templateUrl: './side-main-header.html'
})

export class SideMainHeader {

  envs = environment;

}
