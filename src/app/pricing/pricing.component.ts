import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from '@angular/router';

interface Plan {
  name: string;
  price: string;
  features: string[];
  id: number;
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  constructor(private Router: Router) { }

  plans: Plan[] = [
    {
      name: ' Basic Plan',
      price: '$9',
      features: ['1 user', 'SD quality', 'Available for a limited time only'],
      id: 1
    },
    {
      name: 'Watch with a Friend Plan',
      price: '$39',
      features: ['5 users', 'Screen sharing with a friend', 'Unlimited viewing'],
      id: 2
    },
    {
      name: 'Enterprise',
      price: '$99',
      features: ['Unlimited users', 'Unlimited viewing', 'Phone & email support'],
      id: 3
    },
  ];
  sumbit(id: any) {
    localStorage.setItem('selectedPlan', JSON.stringify(id));
    this.Router.navigate(['/movies']);
  }
  // Freetrial() {
  //   this.Router.navigate(['/movies']);
  // }



}