import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { DefaultSearchModel } from 'app/models/default-search.model';
import { SharedserviceService } from 'app/services/sharedservice.service';
import { dbSourceService } from '../../services/source.service';
import { publishersearchComponent } from '../publishersearch/publishersearch.component';

@Component({
  selector: 'app-publisherlist',
  templateUrl: './publisherlist.component.html',
  styleUrls: ['./publisherlist.component.scss']
})
export class PublisherlistComponent implements OnInit {
  searchdata: any;defSearch:DefaultSearchModel;
  constructor(private dbSourceService:dbSourceService,private sharedService:SharedserviceService,public dialog: MatDialog,
    public route: Router) { }
  // columnDefs = [
  //   { field: 'Source_ID', sortable: true, filter: 'agNumberColumnFilter',headerName: 'CAMPAIGN_ID',hide: true  },
  //   { field: 'DEALER_ID', sortable: true, filter: 'agNumberColumnFilter',headerName: 'CAMPAIGN_ID',hide: true  },
  //   { field: 'DEALER_NAME', sortable: true, filter: 'agTextColumnFilter',headerName: 'Dealer Name'  },
  //   { field: 'SOURCE_NAME', sortable: true, filter: 'agTextColumnFilter',headerName: 'Source Name'  },
  //   { field: 'SOURCE_DESC', sortable: true, filter: 'agTextColumnFilter',headerName: 'Source Description' },
  //   { field: 'ISACTIVE', sortable: true, filter: 'agNumberColumnFilter',headerName: 'CAMPAIGN_ID',hide: true  },
  //   { field: 'Status', sortable: true, filter: 'agNumberColumnFilter',headerName: 'Status' },
  // ];
  // rowData: any;

  columns: MtxGridColumn[] = [
    { header: 'DealerId', field: 'DealerId',hide: true },
    { header: 'Source Name', field: 'SourceName' },
    { header: 'Source Description', field: 'SourceDesc' },
    { header: 'ISACTIVE', field: 'IsActive',hide: true},
    { header: 'Status', field: 'Status'},
    {
      header: 'Opertaion',
      field: 'SourceId',
      minWidth: 120,
      width: '120px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'mode_edit',
          click: record => this.onEdit(record,"EDIT"),
        },
        {
          type: 'icon',
          icon: 'visibility',
          click: record => this.onView(record,"VIEW"),
        },
      ],
    },
  ];
  list: any[] = [];
  total = 0;
  isLoading = false;
  showPaginator = true;

  async ngOnInit(): Promise<void> {
    this.sharedService.currentMessage.subscribe(data => this.searchdata = data);
    if (this.searchdata == "") {
      this.searchdata =await this.defaultSearch();
      this.getsource(this.searchdata);
    }
    else {
      this.getsource(this.searchdata);
    }
  }
  async getsource(obj:any) {
    this.sharedService.sharingData_back(null);
    this.sharedService.sharingData_back(obj);
    let data = await this.dbSourceService.GetService(obj);
    JSON.stringify(data);
    console.log(data);
    if (data != null) {
      if(data.FinalMode=="DataFound"){
        this.list = data["Data"];
      }
    }
    this.sharedService.sharingData(obj);
    this.sharedService.sharingData_back(obj);
  }
  async defaultSearch() {
    this.defSearch={
      bactive:true,
      radioSearch:'Start with'
    }
    return this.defSearch;
  }
  onSearch():void{
    const myTempDialog =this.dialog.open(publishersearchComponent);
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
  onAddNew() {
    this.sharedService.sharingData(null);
    localStorage.setItem('PageMode', JSON.stringify("ADD"));
    this.sharedService.redirectTo(this.route.url);
  }
  onEdit(obj, Mode: string) {
    obj.PageMode = Mode;
    this.sharedService.sharingData(obj);
    localStorage.setItem('PageMode', JSON.stringify("ADD"));
    this.sharedService.redirectTo(this.route.url);
  }

  onView(obj, Mode: string) {
    obj.PageMode = Mode;
    this.sharedService.sharingData(obj);
    localStorage.setItem('PageMode', JSON.stringify("ADD"));
    this.sharedService.redirectTo(this.route.url);
  }
}
