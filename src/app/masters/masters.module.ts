import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CampaignModule } from './campaign/campaign.module';

export const baseRoutes: Routes = [
  {
    path: 'campaign',
    loadChildren: () => CampaignModule
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
  imports: [SharedModule,RouterModule.forChild(baseRoutes)],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class MastersModule {}
