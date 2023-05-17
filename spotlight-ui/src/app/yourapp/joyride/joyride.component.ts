import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';
@Component({
  selector: 'app-joyride',
  templateUrl: './joyride.component.html',
  styleUrls: ['./joyride.component.scss']
})
export class JoyrideComponent implements OnInit {

  constructor(private readonly joyrideService: JoyrideService) { }

  ngOnInit() {
      this.joyrideService.startTour(
        {
          steps: ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'],
          showPrevButton: false,
          stepDefaultPosition: 'top',
          themeColor: '#002843'
        }
      ).subscribe(
        (step) => {/*handle success*/ },
        (error) => { /*handle error*/ },
        () => { localStorage.setItem('joyride-taken', 'true'); }
      );
    // }

  }

}
