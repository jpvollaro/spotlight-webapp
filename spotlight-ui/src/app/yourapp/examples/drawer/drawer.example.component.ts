import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.example.component.html',
  styleUrls: ['./drawer.example.component.scss']
})
export class DrawerExampleComponent {

  rightHandDrawer = false;
  leftHandDrawer = false;
  toggleRightDrawer() {
    this.rightHandDrawer = !this.rightHandDrawer;
  }
  toggleLeftDrawer() {
    this.leftHandDrawer = !this.leftHandDrawer;
  }

  rightDrawerClose(event: boolean) {
    this.rightHandDrawer = event;
  }

  leftDrawerClose(event: boolean) {
    this.leftHandDrawer = event;
  }


}
