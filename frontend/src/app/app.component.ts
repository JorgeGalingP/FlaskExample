import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap, map } from "rxjs/operators";

import { Title } from '@angular/platform-browser';
import { WordcountSevice } from './wordcount/wordcount.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wordcount';
  jobSub: Subscription;
  results: string[][];
  urlForm = new FormGroup({
    url: new FormControl(''),
  });
  pollingResults:any;
  show = true;
  

  constructor(private titleService: Title ,
    private wordcountService: WordcountSevice) {
      this.titleService.setTitle(this.title)
  }

  ngOnInit() {
    // only for testing chart config
    let res: string[][] = [
      ["Python", "40"],
      ["Angular", "28"],
      ["Typescript", "23"],
      ["Postgres", "19"],
      ["Redis", "18"],
      ["VSCode", "14"],
      ["SQL", "10"],
      ["MongoDB", "9"],
      ["CSharp", "4"],
      [".NET", "1"],
    ]

    this.results = res;
  }

  onSubmit() {
    this.jobSub = this.wordcountService.getJobId(this.urlForm.value.url).subscribe(
      res => {
        let jobId = res;

        this.getResults(jobId)
      },
      err => {
        console.error(err);
      }
    );
  }

  getResults(jobId: string) {
    let count = 0;
    this.pollingResults = interval(1000)
    .pipe(
      startWith(0),
      switchMap(() => this.wordcountService.getResults(jobId)),
    )
    .subscribe(
      res => {
        count += 1;
        this.results = res.body;
        
        if (count > 45 || res.status == 200) {   
            this.show = true;  
            this.pollingResults.unsubscribe();          
        }
      },
      err => {
        console.error(err);
      }
    );
}

  ngOnDestroy() {
    this.jobSub.unsubscribe();
    this.pollingResults.unsubscribe();
  }
}
