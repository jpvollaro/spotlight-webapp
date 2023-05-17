import { Component, OnInit } from '@angular/core';
import { sideNavModel } from '@app/core/models/side.navigation';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.scss']
})
export class VerticalNavigationComponent implements OnInit {
  public sideNavModel: any;
  collapseVerticalNav = false;

  constructor() {}

  ngOnInit() {
    this.sideNavModel = sideNavModel;
  }

  toggleVerticalNav() {
    this.collapseOpenedMenus(this.sideNavModel);
    this.collapseVerticalNav = !this.collapseVerticalNav;
  }

  collapseOpenedMenus(object) {
    Object.keys(object).forEach(k => {
      if (object.hasOwnProperty(k)) {
        if (typeof object[k] === 'object') {
          this.collapseOpenedMenus(object[k]);
        }
        if (k === 'menuVisible') {
          object['menuVisible'] = false;
        }
      }
    });
  }
}
