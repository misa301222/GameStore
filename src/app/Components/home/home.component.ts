import { animate, state, style, transition, trigger } from '@angular/animations';
import { fadeInAnimation, fadeInOnEnterAnimation, fadeInRightAnimation, fadeInRightOnEnterAnimation, rubberBandAnimation } from 'angular-animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { Game } from 'src/app/Models/game';
import { GameService } from 'src/app/services/game.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(),
    fadeInOnEnterAnimation(),
    trigger('makeCardBigger', [
      state('normal', style({
        transform: 'translateX(0px)'
      })),
      state('big', style({
        transform: 'scale(1.1, 1.1)'
      })),
      transition('normal => big', animate('250ms ease-out')),
      transition('big => normal', animate('250ms ease-in'))
    ])
  ]

})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private gameService: GameService) { }

  products: Product[] = [];
  games: Game[] = [];
  isImageBig: boolean[] = [false];

  ngOnInit(): void {
    this.getProducts();
    this.getAllGames();
  }

  toggle(i: number) {
    this.isImageBig[i] = true;
    return this.isImageBig;
  }

  toggleMouseLeave(i: number) {
    this.isImageBig[i] = false;
    return this.isImageBig;
  }

  getProducts() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data;
    })
  }

  selectProduct(idProduct: number) {
    this.router.navigate(['/Product/buy-product/', idProduct]);
  }

  selectGame(idGame: number) {
    this.router.navigate(['/Game/buy-game/', idGame]);
  }


}
