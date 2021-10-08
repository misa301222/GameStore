import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/Models/game';
import { GameService } from 'src/app/services/game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-game',
  templateUrl: './register-game.component.html',
  styleUrls: ['./register-game.component.scss']
})
export class RegisterGameComponent implements OnInit {


  newGame: Game = new Game();

  public registerGameForm = this.formBuilder.group({
    idGame: ['', [Validators.required]],
    gameName: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    price: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private router: Router, private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  addGame(content) {
    let idGame = this.registerGameForm.controls["idGame"].value
    let gameName = this.registerGameForm.controls["gameName"].value
    let publisher = this.registerGameForm.controls["publisher"].value
    let price = this.registerGameForm.controls["price"].value
    let releaseDate = this.registerGameForm.controls["releaseDate"].value

    this.gameService.addGame(idGame, gameName, publisher, price, releaseDate).subscribe(x => {
      console.log(x);
      this.registerGameForm.controls["idGame"].setValue("")
      this.registerGameForm.controls["gameName"].setValue("")
      this.registerGameForm.controls["publisher"].setValue("")
      this.registerGameForm.controls["price"].setValue("")
      this.registerGameForm.controls["releaseDate"].setValue("")
      this.open(content);
    })

  }

  open(content){
      this.modalService.open(content);
  }

}
