import { CharacterService } from './../../provider/character.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage {

  public comics : any=[];
  
  public character = {
    id: 0,
    name: "",
    series: "",
  }
  
  constructor(private characterService: CharacterService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.character.id = params['id'];
          
        if(this.character.id){
        this.characterService.getCharacterById(this.character.id).then(character => {
        this.character = (character[0] || this.character);      
          if(this.character){
            this.getComicsByCharacter();
          }
        });
      }  
    });  
  }

  public getComicsByCharacter(){
    
    this.characterService.getComicsByCharacter(this.character).then((comics) => {
      this.comics   = comics;
    });
  }
}