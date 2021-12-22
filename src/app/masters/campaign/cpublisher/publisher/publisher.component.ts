import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedserviceService } from 'app/services/sharedservice.service';
import { ToastrService } from 'ngx-toastr';
import { dbSourceService } from '../../services/source.service';
import { publishersearchComponent } from '../publishersearch/publishersearch.component';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  formGroup: FormGroup;dealerList: any;PageMode: string = "ADD"; public currentdata: any;public currentListdata: any;
  submitted = false;mycheck = true;
  constructor(private fb: FormBuilder,private sharedService:SharedserviceService,public dialog: MatDialog,
    public route: Router,private dbService:dbSourceService,private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await this.formBuild();
    await this.getdealer();
    this.sharedService.currentMessage.subscribe(data => this.currentdata = data);
    if (this.currentdata == null || this.currentdata.PageMode == "" || this.currentdata == "") {
      //this.onPageLoad();
      this.PageMode = "ADD";
    }
    else {
      if (this.currentdata!=null) {
        for (let i in this.formGroup.controls) {
          this.formGroup.controls[i].setValue(this.currentdata[i]);
        }
        this.PageMode=this.currentdata["PageMode"]
        //this.onPageLoad();
      }
    }

  }
  async formBuild()
  {
    this.formGroup = this.fb.group({
      DealerId:[null,Validators.required],
      SourceId:[null],
      SourceName:[null,Validators.required],
      SourceDesc:[null],
      IsActive:[true],
      CreatedBy:[null],
      UpdatedBy:[null]
    });
  }
  get f() { return this.formGroup.controls; }

  async getdealer() {
    let data = await this.sharedService.GetSelectionDetails("dealer", 1,null,null);
    JSON.stringify(data);
    console.log(data);
    if (data != null) {
      if(data.FinalMode=="DataFound"){
        this.dealerList = data["Data"];
      }
    }
  }
  
  async onSubmit():Promise<void>{
    this.submitted=true;
    if (this.formGroup.invalid) {
      return;
    }
    let data = await this.dbService.PostService(this.formGroup.value);
    JSON.stringify(data);
    if (data["FinalMode"] == "INSERT") {
      this.toastr.success(data["Message"], 'Source');
      await this.addNew();
    }
    else if (data["FinalMode"] == "UPDATE") {
      this.toastr.success(data["Message"], 'Source');
      await this.addNew();
    }
    else {
      this.toastr.error(data["Message"], 'Source');
    }
  }
  async addNew():Promise<void>{
    this.submitted=false;
    this.sharedService.sharingData(null);
    this.formGroup.reset();
    this.onPageLoad();
    this.PageMode = "ADD";
    this.formGroup.controls['SourceId'].setValue(null);
    this.formGroup.controls['IsActive'].setValue(true);
  }
  async onReset() {
    await this.addNew();
  }
  onPageLoad(): void {
    this.formGroup.controls['CreatedBy'].setValue(localStorage.getItem('USER_ID'));
    this.formGroup.controls['UpdatedBy'].setValue(localStorage.getItem('USER_ID'));
  }
  onBack() {
    this.sharedService.currentMessage_back.subscribe(currentListdata => this.currentListdata = currentListdata);
    this.sharedService.sharingData(this.currentListdata);
    localStorage.setItem('PageMode', JSON.stringify("LIST"));
    this.sharedService.redirectTo(this.route.url);
  }
  onSearch():void{
    const myTempDialog =this.dialog.open(publishersearchComponent,{panelClass: 'custom-dialog-container' });
    myTempDialog.afterClosed().subscribe((res) => {
      // Data back from dialog
      if (res != "Cross_click" && res!=0 && res != undefined) {
        console.log('dialog Closed');
        console.log({ res });
        localStorage.setItem('PageMode', JSON.stringify("LIST"));
        this.sharedService.redirectTo(this.route.url);
        this.sharedService.sharingData(res);
      }
    });
  }

  
}
