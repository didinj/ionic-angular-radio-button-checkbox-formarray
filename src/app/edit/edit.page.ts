import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  qsForm: FormGroup;
  data: any[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.data = JSON.parse(this.activatedRoute.snapshot.params.data);
    this.qsForm = this.formBuilder.group({
      quests: this.formBuilder.array([
        this.initQuests()
      ]),
      quests2: this.formBuilder.array([
        this.initQuests()
      ])
    });
  }

  ngOnInit() {
    this.qsForm = this.formBuilder.group({
      quests: this.setQuest(this.data.slice(0, 3)),
      quests2: this.setQuest(this.data.slice(3, 5))
    });
  }

  initQuests() {
    return this.formBuilder.group({
      nbr: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      answer: '',
    });
  }

  setQuest(quests: any) {
    const arr = new FormArray([]);
    quests.forEach((q: any) => {
      arr.push(this.formBuilder.group({
        nbr: q.nbr,
        question: q.question,
        nchoice1br: q.choice1,
        choice1: q.choice1,
        choice2: q.choice2,
        choice3: q.choice3,
        choice4: q.choice4,
        answer: q.answer
      }));
    });
    return arr;
  }

  selectChecked(i: any, value: any) {
    const formArray = this.qsForm.controls.quests2 as FormArray;
    const formGroup = formArray.at(i) as FormGroup;
    const choice = formGroup.controls.choice;
    if (choice.value.search(value) === -1) {
      if (choice.value !== '') {
        choice.setValue(choice.value + ',' + value);
      } else {
        choice.setValue(value);
      }
    } else {
      const splitted = choice.value.split(',');
      const idx = splitted.indexOf(value, 0);
      splitted.splice(idx, 1);
      choice.setValue(splitted.toString());
    }
  }

  setChecked(i: any, value: any): boolean {
    const formArray = this.qsForm.controls.quests2 as FormArray;
    const formGroup = formArray.at(i) as FormGroup;
    const answer = formGroup.controls.answer;
    if (answer.value.search(value) === -1) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    const submitData: any[] = [];
    this.qsForm.value.quests.forEach((qu: any) => {
      submitData.push({
        nbr: qu.nbr,
        question: qu.question,
        answer: qu.choice
      });
    });
    this.qsForm.value.quests2.forEach((qu2: any) => {
      submitData.push({
        nbr: qu2.nbr,
        question: qu2.question,
        answer: qu2.choice
      });
    });
    this.router.navigate(['/details/' + JSON.stringify(submitData)]);
  }

}
