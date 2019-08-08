import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.data = JSON.parse(this.activatedRoute.snapshot.params.data);
  }

  ngOnInit() {
  }

  edit(data: any[]) {
    this.router.navigate(['/edit/' + JSON.stringify(data)]);
  }

}
