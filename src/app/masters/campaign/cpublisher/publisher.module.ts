import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CpublisherComponent } from './cpublisher.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PublisherlistComponent } from './publisherlist/publisherlist.component';
import { publishersearchComponent } from './publishersearch/publishersearch.component';




export const baseRoutes: Routes = [
  {
    path: '',
    component: CpublisherComponent,
  },

];


const COMPONENTS: any[] = [
  CpublisherComponent,publishersearchComponent,PublisherComponent,PublisherlistComponent
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(baseRoutes)],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class PublisherModule {}
