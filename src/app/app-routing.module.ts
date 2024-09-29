import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
path:'',
pathMatch:'full',
redirectTo:'chat'
  }
  ,
  {
    path: 'chat',
    loadChildren: () => import('./features/chat/chat.module').then((m => m.ChatModule))
  },
  {
    path: 'maps',
    loadChildren: () => import('./features/maps/maps.module').then((m => m.MapsModule))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
