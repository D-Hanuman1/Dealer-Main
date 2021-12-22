import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'app/services/previous-route.service';
import { SharedserviceService } from 'app/services/sharedservice.service';

@Component({
  selector: 'app-cpublisher',
  template: '<app-publisher *ngIf="displayD"></app-publisher><app-publisherlist *ngIf="displayL"></app-publisherlist>'
})
// <app-source *ngIf="displayD"></app-source>*ngIf="displayL<app-sourcelist ></app-sourcelist>"
export class CpublisherComponent implements OnInit {

  private PageMode: string;
  public CurrentUrl: string = ""; public PreviousUrl: string = "";
  displayD: boolean = false; displayL: boolean = false;
  constructor(private router: Router, private previousRouteService: PreviousRouteService,
    public sharedService:SharedserviceService) { }

  ngOnInit(): void {
    this.PreviousUrl = this.previousRouteService.getPreviousUrl();
    this.CurrentUrl = this.router.url;
    this.PreviousUrl = JSON.parse(localStorage.getItem('PreviousUrl'));
    this.PageMode = JSON.parse(localStorage.getItem('PageMode'));
    if (this.PageMode == null) {
      localStorage.setItem('PageMode', JSON.stringify("ADD"));
      this.displayD = true;
      this.displayL = false;
      this.sharedService.sharingData(null);
    }
    if (this.PageMode == "LIST") {
      if (this.PreviousUrl != this.CurrentUrl) {
        //localStorage.setItem('PageMode', JSON.stringify("ADD"));
      }
      this.displayL = true;
      this.displayD = false;
    }
    if (this.PageMode == "ADD") {
      this.displayL = false;
      this.displayD = true;
    }
  }
  ngOnDestroy() {
    this.CurrentUrl = this.router.url;
    if (this.CurrentUrl != '/' && this.CurrentUrl!='/dashboard')
      localStorage.removeItem('PageMode');
  }

}
