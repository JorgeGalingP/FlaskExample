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
  counts: number[];
  urlForm = new FormGroup({
    url: new FormControl(''),
  });
  pollingResults:any;
  show = false;
  loading = false;

  constructor(private titleService: Title ,
    private wordcountService: WordcountSevice) {
      this.titleService.setTitle(this.title)
  }

  ngOnInit() {}

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
        this.loading = true;
        count += 1;
        
        if (count > 45 || res.status == 200) {   
            this.show = true;  
            this.results = res.body;
            this.loading = false;
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
