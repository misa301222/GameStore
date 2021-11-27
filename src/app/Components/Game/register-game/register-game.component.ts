import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/Models/game';
import { GameService } from 'src/app/services/game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Models/category';

@Component({
  selector: 'app-register-game',
  templateUrl: './register-game.component.html',
  styleUrls: ['./register-game.component.scss']
})
export class RegisterGameComponent implements OnInit {


  newGame: Game = new Game();
  categories: Category[] = [];

  public registerGameForm = this.formBuilder.group({
    idGame: ['', [Validators.required]],
    gameName: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    price: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
    category: [''],
    coverUrl: [''],
    description: [''],
    quantity: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private router: Router, private modalService: NgbModal, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onChangeCategory($event) {
    this.registerGameForm.controls['category'].setValue($event.target.options[$event.target.options.selectedIndex].value);
  }

  addGame(content) {
    let idGame = this.registerGameForm.controls["idGame"].value
    let gameName = this.registerGameForm.controls["gameName"].value
    let publisher = this.registerGameForm.controls["publisher"].value
    let price = this.registerGameForm.controls["price"].value
    let releaseDate = this.registerGameForm.controls["releaseDate"].value
    let category = this.registerGameForm.controls["category"].value
    let coverUrl = this.registerGameForm.controls["coverUrl"].value
    let description = this.registerGameForm.controls["description"].value
    let quantity = this.registerGameForm.controls['quantity'].value

    this.gameService.addGame(idGame, gameName, publisher, price, releaseDate, category, coverUrl, description, quantity).subscribe(x => {
      
      this.registerGameForm.controls["idGame"].setValue("")
      this.registerGameForm.controls["gameName"].setValue("")
      this.registerGameForm.controls["publisher"].setValue("")
      this.registerGameForm.controls["price"].setValue("")
      this.registerGameForm.controls["releaseDate"].setValue("")
      this.registerGameForm.controls["category"].setValue("")
      this.registerGameForm.controls["coverUrl"].setValue("")
      this.registerGameForm.controls["description"].setValue("")
      this.registerGameForm.controls["quantity"].setValue("")
      this.open(content);
    })

  }

  open(content) {
    this.modalService.open(content);
  }

}
