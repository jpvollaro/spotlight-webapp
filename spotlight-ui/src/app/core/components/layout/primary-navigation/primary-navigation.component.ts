import { Component, OnInit } from '@angular/core';
import { primaryNavModel } from '@app/core/models/primary.navigation';

@Component({
  selector: 'app-primary-navigation',
  templateUrl: './primary-navigation.component.html',
  styleUrls: ['./primary-navigation.component.scss']
})
export class PrimaryNavigationComponent implements OnInit {
  public primaryNavModel: any;

  constructor() { }

  ngOnInit() {
    this.primaryNavModel = primaryNavModel;
  }

}
