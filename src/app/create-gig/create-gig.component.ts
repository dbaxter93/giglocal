import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gig } from '../gig';
import { GigService } from '../services/gig.service';

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.component.html',
  styleUrls: ['./create-gig.component.css']
})
export class CreateGigComponent implements OnInit {

  gigForm = this.formBuilder.group({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required, Validators.maxLength(250)]),
    callFor: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    address: new FormControl('',[Validators.required]),
  });

  get title(): string { return String(this.gigForm.get('title')?.value)}
  get description(): string { return String(this.gigForm.get('description')?.value)}
  get callFor(): string { return String(this.gigForm.get('callFor')?.value)}
  get date(): string { return String(this.gigForm.get('date')?.value)}
  get address(): string { return String(this.gigForm.get('address')?.value)}

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gigService: GigService
  ) {}

  prepareSave(): Gig {
    return new Gig(
      null,
      this.title,
      this.description,
      this.callFor,
      this.date,
      new Date(),
      this.address,
      true
    )
  }

  saveGig(): void {
    if(this.gigForm.valid) {
      let gig = this.prepareSave();
      this.gigService.postGig(gig).subscribe(
        () => this.router.navigate(['/gigs'])
      )
    }
  }

  isInFuture(errorType: string) {
    return (input:FormControl) => {
      let userDate = String(input.value) || "";
      return userDate 
    }
  }

  ngOnInit(): void {
  }


}
