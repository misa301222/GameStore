import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/category';
import { Game } from 'src/app/Models/game';
import { CategoryService } from 'src/app/services/category.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss']
})
export class ShowGameComponent implements OnInit {

  public gameList: Game[] = [];
  incializarDataTable: boolean = false;
  categories: Category[] = [];

  public editGameForm = this.formBuilder.group({
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

  constructor(private gameService: GameService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getCategoryById(categoryId: number) {
      return JSON.stringify(this.categoryService.getCategoryById(categoryId).subscribe(data => {

      }))
  }

  onChangeCategory($event) {
    this.editGameForm.controls['category'].setValue($event.target.options[$event.target.options.selectedIndex].value);
  }

  getAllGames() {
    return this.gameService.getAllGames().subscribe((data: Game[]) => {
      this.gameList = data;
      if (!(this.incializarDataTable)) {
        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25]
          });
        }, 1);
        this.incializarDataTable = true;
      }
    })

  }

  deleteGame(idGame: number) {
    console.log(idGame);

    return this.gameService.deleteGame(idGame).subscribe(x => {
      console.log(x);
      this.getAllGames();
    });
  }

  openModalEdit(content, game: Game) {
    this.modalService.open(content);
    this.editGameForm.controls["idGame"].setValue(game.idGame)
    this.editGameForm.controls["idGame"].disable();
    this.editGameForm.controls["gameName"].setValue(game.gameName)
    this.editGameForm.controls["publisher"].setValue(game.publisher)
    this.editGameForm.controls["price"].setValue(game.price)
    this.editGameForm.controls["releaseDate"].setValue(game.releaseDate)
    this.editGameForm.controls['category'].setValue(game.category);
    this.editGameForm.controls["coverUrl"].setValue(game.coverUrl)
    this.editGameForm.controls["description"].setValue(game.description)
  }

  editGame() {
    let idGame = this.editGameForm.controls["idGame"].value;
    let gameName = this.editGameForm.controls["gameName"].value;
    let publisher = this.editGameForm.controls["publisher"].value;
    let price = this.editGameForm.controls["price"].value;
    let releaseDate = this.editGameForm.controls["releaseDate"].value;
    let category = this.editGameForm.controls['category'].value;
    let coverUrl = this.editGameForm.controls['coverUrl'].value;
    let description = this.editGameForm.controls['description'].value;
    let quantity = this.editGameForm.controls['quantity'].value

    this.gameService.editGame(idGame, gameName, publisher, price, releaseDate, category, coverUrl, description, quantity).subscribe(x => {
      console.log(x);
      this.editGameForm.controls["idGame"].setValue("")
      this.editGameForm.controls["gameName"].setValue("")
      this.editGameForm.controls["publisher"].setValue("")
      this.editGameForm.controls["price"].setValue("")
      this.editGameForm.controls["category"].setValue("")
      this.editGameForm.controls["releaseDate"].setValue("")
      this.editGameForm.controls["description"].setValue("")
      this.editGameForm.controls["quantity"].setValue("")
      this.modalService.dismissAll();
      this.getAllGames();
    //this.router.navigate(['/show-game']);
    })

  }

}
