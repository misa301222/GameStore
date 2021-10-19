import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../Models/game';
import { Product } from '../Models/product';
import { GameService } from '../services/game.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  games: Game[] = [];
  constructor(private productService: ProductService, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getAllGames();
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

  selectGame(idGame: number){
    this.router.navigate(['/Game/buy-game/', idGame]);
  }


}
