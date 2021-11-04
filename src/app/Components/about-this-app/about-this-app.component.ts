import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-about-this-app',
  templateUrl: './about-this-app.component.html',
  styleUrls: ['./about-this-app.component.scss'],
  animations: [fadeInOnEnterAnimation(),
  trigger('displayTechnologies', [
    transition('randomPlace => correctPlace', animate('2000ms', keyframes([
      style({ transform: 'translateX(' + Math.floor((Math.random() * 2000) - 1000) + 'px) translateY(' + Math.floor((Math.random() * 1500) - 500) + 'px) rotateY(0) rotateX(0)', offset: 0 }),
      style({ transform: 'translateX(' + Math.floor((Math.random() * 2000) - 1000) + 'px) translateY(' + Math.floor((Math.random() * 1500) - 500) + 'px) rotateY(90deg) rotateX(30deg)', offset: 0.33 }),
      style({ transform: 'translateX(' + Math.floor((Math.random() * 2000) - 1000) + 'px) translateY(' + Math.floor((Math.random() * 1500) - 500) + 'px) rotateY(180deg) rotateX(360deg)', offset: 0.66 }),
      style({ transform: 'translateX(0%)', offset: 1 })
    ])))
  ]),
  trigger('displayTechnologyNames', [
    state('hide', style({
      opacity: 0,
      transform: 'translateY(10px)'
    })),
    state('show', style({
      opacity: 1,
      transform: 'translateY(0%)'
    })),
    transition('hide => show', animate('400ms ease-in'))
  ]),
  rubberBandAnimation(),
  trigger('makeImageDance', [
    state('normal', style({
      transform: 'scale(1, 1)',
    })),
    state('dance', style({
      //transform: 'scale(1.02, 1.02)',
    })),
    transition('normal => dance', animate('700ms', keyframes([
      style({ transform: 'translateX(0px) rotate(0)', offset: 0 }),
      style({ transform: 'translateY(-500px) rotate(90deg)', offset: 0.33 }),
      style({ transform: 'translateY(-500px) rotate(180deg)', offset: 0.66 }),
      style({ transform: 'translateX(0px) rotate(360deg)', offset: 1 })
    ]))),
    //transition('dance => normal', animate('700ms ease-in'))
  ])
  ]
})
export class AboutThisAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.toggle();
    }, 200);
  }

  isRandomPlace = true;
  isTextVisible = false;
  playRubberBand = [false, false, false];
  isImageDancing: boolean[] = [false];

  toggle() {
    this.isRandomPlace = false;
  }

  toggleRubberBand(index: number) {
    if (this.isTextVisible) {
      this.playRubberBand[index] = !this.playRubberBand[index];
    }
  }

  toggleImageDancing(index: number) {
    return this.isImageDancing[index] = true;
  }

  imageDancingDone(index: number, $event) {
    this.isImageDancing[index] = false;
  }

  frameworkAnimationDone($event) {
    if ($event.toState.toString() == "correctPlace") {
      this.isTextVisible = true;
    }
  }

}
