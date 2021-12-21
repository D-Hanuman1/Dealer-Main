import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedserviceService } from 'app/services/sharedservice.service';

@Component({
  selector: 'app-sourcesearch',
  templateUrl: './sourcesearch.component.html',
  styleUrls: ['./sourcesearch.component.scss']
})
export class SourcesearchComponent implements OnInit {
  formGroup: FormGroup;onDefActive: any; //selectedOption:Options = new Options("Start with");
  constructor(private fb: FormBuilder,private sharedService:SharedserviceService,private dialogRef: MatDialogRef<SourcesearchComponent>) { }

  async ngOnInit(): Promise<void> {
    this.onDefActive=this.sharedService.DefActiveDropdown;
    await this.formBuild();
  }
  async formBuild()
  {
    this.formGroup = this.fb.group({
      SourceName:[null],
      IsActive:[true],
      radioSearch:["Start with"]
    });
  }
  get f() { return this.formGroup.controls; }
  public async onSearch() {
    try {
      //this.formGroup.value.radioSearch=this.selectedOption.radioSearch;
      //this.formGroup.value.radioSearch=this.selectedOption.radioSearch;
      this.dialogRef.close(this.formGroup.value);
    }
    catch(error){
      
    }
  }
  public async onReset(){
    // this.formGroup.reset();
    // this.onDefActive=this._sharedService.DefActiveDropdown;
    // this.selectedOption = new Options("Start with");
    // this._form.controls["bactive"].setValue(true);
  }
  getValue(optionid) {
    //this.selectedOption.radioSearch = optionid;
  }
}
