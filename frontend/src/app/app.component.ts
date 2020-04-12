import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordcountSevice } from './wordcount/wordcount.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wordcount';
  jobSub: Subscription;
  jobId: any;
  urlForm = new FormGroup({
    url: new FormControl(''),
  });

  constructor(private wordcountService: WordcountSevice) {
  }

  ngOnInit() {
  }

  onSubmit(){
    this.jobSub = this.wordcountService.getJobId(this.urlForm.value.url).subscribe(res => {
      this.jobId = res;
    },
    console.error
  );
  }

  ngOnDestroy() {
    this.jobSub.unsubscribe();
  }
}
