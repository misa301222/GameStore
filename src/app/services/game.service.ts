import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Constants } from '../Helper/constants';
import { Game } from '../Models/game';
import { ResponseModel } from '../Models/reponseModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly baseURL: string = "https://localhost:5001/api/Game";

  constructor(private httpClient: HttpClient) { }

  //TODO AGREGAR CATEGORIA A TODO
  public getAllGames() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userInfo?.token}`
    })
    return this.httpClient.get<Game[]>(this.baseURL + "/GetAllGames", { headers: headers });

  }

  addGame(idGame: number, gameName: string, publisher: string, price: number, releaseDate: string, category: number, coverUrl: string, description: string, quantity: number) {

    const body = {
      IdGame: idGame,
      GameName: gameName,
      Publisher: publisher,
      Price: price,
      ReleaseDate: releaseDate,
      category: category,
      coverUrl: coverUrl,
      description: description,
      quantity: quantity
    }
    return this.httpClient.post<Game>(this.baseURL + '/AddGame', body);
  }

  deleteGame(idGame: number) {
    return this.httpClient.delete<Game>(this.baseURL + '/' + idGame);
  }

  editGame(idGame: number, gameName: string, publisher: string, price: number, releaseDate: string, category: number, coverUrl: string, description: string, quantity: number) {

    const body = {
      IdGame: idGame,
      GameName: gameName,
      Publisher: publisher,
      Price: price,
      ReleaseDate: releaseDate,
      category: category,
      coverUrl: coverUrl,
      description: description,
      quantity: quantity
    }

    return this.httpClient.put<Game>(this.baseURL + '/' + idGame, body);
  }

  getGameById(idGame: number) {
    return this.httpClient.get<Game>(this.baseURL + '/' + idGame);
  }


}
