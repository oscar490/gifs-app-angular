import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMain } from '../../components/side-main/side-main';


@Component({
  selector: 'dashboard-page',
  imports: [RouterOutlet, SideMain],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage { }
