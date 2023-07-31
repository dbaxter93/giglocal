import { Component, OnInit } from '@angular/core';
import { Gig } from '../gig';
import { GigService } from '../services/gig.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-gigs',
  templateUrl: './gigs.component.html',
  styleUrls: ['./gigs.component.css']
})
export class GigsComponent implements OnInit {

  gigs?:Gig[];

  constructor(
    private gigService: GigService,
    private router: Router
    ) {}

  loadGigs(): void {
    this.gigService.getAllGigs().subscribe(
      res => this.gigs = res
    );
  }

  ngOnInit(): void {
    this.loadGigs();
  }

}
