import { Component, OnInit } from '@angular/core';
import { Card } from '../types/card';
import { PaymentService } from '../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  form: Card = {
    id: 0,
    userId: 0,
    cardOwner: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: ""
  }

  cards: any[] = [];
  editing: boolean = false;

  constructor(private paymentService: PaymentService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.paymentService.getCards()
      .subscribe(
        cards => {
          this.cards = cards;
          console.log('Retrieved cards:', this.cards);
        },
        error => {
          console.error('Error fetching cards:', error);
        }
      );
  }

  loadCards() {
    this.paymentService.getCards()
      .subscribe(
        cards => {
          this.cards = cards;
          console.log('Retrieved cards:', this.cards);
        },
        error => {
          console.error('Error fetching cards:', error);
        }
      );
  }

  delete(card: any) {
    if (confirm("Are you sure? This can't be undone.")) {
      this.paymentService.delete(card.id)
      .subscribe(
        () => {
          console.log('Card deleted successfully');
          
          this.loadCards();
        },
        error => {
          console.error('Error deleting card:', error);
        }
      );
    }
  }

  edit(card:any) {
    this.form = card;
    this.editing = true;
  }

  saveCard() {
    this.form.userId = Number(sessionStorage.getItem('UserId'));
    if (!this.editing) {
      this.paymentService.saveCard(this.form).subscribe(
        (response) => {
          this.toastr.success('Hello, world!', 'Success');
          console.log('Card saved successfully:', response);
          
          this.loadCards();
        },
        (error) => {
          console.error('Error saving card:', error);
        }
      );
    }
    else {
      this.paymentService.editCard(this.form).subscribe(
        (response) => {
          console.log('Card saved successfully:', response);
         
          this.loadCards();
        },
        (error) => {
          console.error('Error saving card:', error);
        }
      );
      this.clear();
    }
    
  }

  clear() {
    this.form = {
      id: 0,
      userId: 0,
      cardOwner: "",
      cardNumber: "",
      expiryDate: "",
      securityCode: ""
    }
    this.editing = false;
    this.loadCards();
  }

}
