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

  public getAllGames() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    //console.log(userInfo);
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userInfo?.token}`
    })
    /*
    return this.httpClient.get<ResponseModel>(this.baseURL + "/GetAllGames", { headers: headers }).pipe(map((res: any) => {
      let gameList = new Array<Game>();
      if (res.responseCode == 1) {
        if (res.dataSet) {
          res.dataSet.map((x: Game) => {
            gameList.push(new Game(x.idGame, x.gameName, x.publisher, x.price, x.releaseDate));
          })
        }

      }
      return gameList;

    }));
    */
    return this.httpClient.get<Game[]>(this.baseURL + "/GetAllGames", { headers: headers });

  }

  addGame(idGame: number, gameName: string, publisher: string, price: number, releaseDate: string) {

    const body = {
      IdGame: idGame,
      GameName : gameName,      
      Publisher : publisher,
      Price : price,
      ReleaseDate : releaseDate
    }
    return this.httpClient.post<Game>(this.baseURL + '/AddGame', body);
  }

  deleteGame(idGame : number){
    return this.httpClient.delete<Game>(this.baseURL + '/'+ idGame);
  }

  editGame(idGame: number, gameName: string, publisher: string, price: number, releaseDate: string) {

    const body = {
      IdGame: idGame,
      GameName : gameName,      
      Publisher : publisher,
      Price : price,
      ReleaseDate : releaseDate
    }
    
    return this.httpClient.put<Game>(this.baseURL + '/' + idGame, body);
  }


}
