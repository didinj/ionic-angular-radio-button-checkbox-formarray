import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCheckbox, IonButton, IonItem, IonLabel, IonList, IonRadio } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, IonRadio, IonList, IonLabel, IonItem, IonButton, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, ReactiveFormsModule]
})
export class HomePage implements OnInit {
  qsForm: FormGroup = this.fb.group({
    answers: this.fb.array([])
  });

  questions = [
    { title: 'Single choice question', type: 'radio', options: ['A', 'B', 'C'] },
    { title: 'Multiple answers question', type: 'checkbox', options: ['One', 'Two', 'Three'] }
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    const answerControls = this.questions.map(q =>
      q.type === 'radio'
        ? this.fb.control('', Validators.required)
        : this.fb.group(q.options.reduce((acc: { [key: string]: any }, opt) => {
          acc[opt] = this.fb.control(false);
          return acc;
        }, {}))
    );

    this.qsForm.setControl('answers', this.fb.array(answerControls));
  }

  buildCheckboxGroup(options: string[]): FormGroup {
    const group: { [key: string]: FormControl } = {};
    options.forEach(opt => group[opt] = this.fb.control(false));
    return this.fb.group(group);
  }

  get answersArray() {
    return this.qsForm?.get('answers') as FormArray;
  }

  onSubmit() {
    console.log(this.qsForm?.value);
    this.router.navigate(['/details'], {
      state: { answers: this.qsForm?.value, questions: this.questions }
    });
  }
}
