import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'uitk-boot-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() isVisible = false;
  @Input() side = 'right';
  @Input() title: string;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  close() {
    this.isVisible = false;
    this.onClose.emit(this.isVisible);
  }
}
