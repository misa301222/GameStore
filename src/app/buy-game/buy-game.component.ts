import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../Models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-buy-game',
  templateUrl: './buy-game.component.html',
  styleUrls: ['./buy-game.component.scss']
})
export class BuyGameComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService, private route: ActivatedRoute) { }


  selectedGame: Game = new Game();

  ngOnInit(): void {
    this.getGameById(Number(this.route.snapshot.paramMap.get('idGame')));
  }

  getGameById(idGame: number) {
    this.gameService.getGameById(idGame).subscribe(data => {
      this.selectedGame = data;
      console.log(JSON.stringify(data));
    })
  }



}
