import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProfileComponent } from './profile/profile.component';
import { GigsComponent } from './gigs/gigs.component';
import { CreateGigComponent } from './create-gig/create-gig.component';

export const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'search', component: SearchComponent },
/*{ path:'artists', component: DisplayArtistsComponent }, */
  { path:'gigs', component: GigsComponent },
  { path: 'post-gig', component: CreateGigComponent },
  { path:'create-account', component: CreateAccountComponent },
  { path:'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
