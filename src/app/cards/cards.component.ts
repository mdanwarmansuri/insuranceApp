import { Component, Input, Output } from '@angular/core';
import { Card } from '../types/card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() cards:Card[]=[];
  
  @Output() editEvent=new EventEmitter<any>();
  @Output() deleteEvent=new EventEmitter<any>();

  edit(card:any){
    this.editEvent.emit(card);
  }

  delete(card:any){
    this.deleteEvent.emit(card);
  }
}
