import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CsourceComponent } from './csource.component';
import { SourceComponent } from './source/source.component';
import { SourcelistComponent } from './sourcelist/sourcelist.component';
import { SourcesearchComponent } from './sourcesearch/sourcesearch.component';



export const baseRoutes: Routes = [
  {
    path: '',
    component: CsourceComponent,
  },

];


const COMPONENTS: any[] = [
  // LoginComponent,
  // RegisterComponent,
  // Error403Component,
  // Error404Component,
  // Error500Component,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(baseRoutes)],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, CsourceComponent, SourceComponent, SourcelistComponent, SourcesearchComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SourceModule {}
