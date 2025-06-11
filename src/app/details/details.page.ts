import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,]
})
export class DetailsPage implements OnInit {

  questions: any[] = [];
  answers: any[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.questions = nav?.extras.state?.['questions'];
    this.answers = nav?.extras.state?.['answers'];
  }

  ngOnInit() { }

  getSelectedOptions(q: any, i: number): string {
    if (q.type === 'radio') {
      return this.answers[i] || 'None';
    }

    if (q.type === 'checkbox') {
      const selected = q.options.filter((opt: string | number) => this.answers[i]?.[opt]);
      return selected.length > 0 ? selected.join(', ') : 'None';
    }

    return 'None';
  }

}
