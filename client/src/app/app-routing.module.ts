import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageComponent } from './components/profile/message/message.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { EditMessageComponent } from './components/profile/message/edit-message/edit-message.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { EventsComponent } from './components/events/events.component';
import { JobComponent } from './components/job/job.component';
import { ApplyComponent } from './components/job/apply/apply.component';
import { CareerFairComponent } from './components/career-fair/career-fair.component';
import { JobPostComponent } from './components/job-post/job-post.component';

import { RoomPostComponent } from './components/room-post/room-post.component';
import { JobDeleteComponent } from './components/job-post/job-delete/job-delete.component'
import { MyJobsComponent } from './components/job/my-jobs/my-jobs.component';
import { PriorityComponent } from './components/job/priority/priority.component';
import { ViewedJobsComponent } from './components/job/viewed-jobs/viewed-jobs.component';
import { LibraryComponent } from './components/library/library.component';
import { QuietComponent } from './components/library/quiet/quiet.component';
import { GroupComponent } from './components/library/group/group.component';
import { SeminarComponent } from './components/library/seminar/seminar.component';
import { QuietReservationComponent } from './components/library/quiet/quiet-reservation/quiet-reservation.component';
import { GroupReservationComponent } from './components/library/group/group-reservation/group-reservation.component';
import { SeminarReservationComponent } from './components/library/seminar/seminar-reservation/seminar-reservation.component';


import { QuietEventsComponent } from './components/library/quiet/quiet-events/quiet-events.component';
import { GroupEventsComponent } from './components/library/group/group-events/group-events.component';
import { SeminarEventsComponent } from './components/library/seminar/seminar-events/seminar-events.component';




const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: '*', component: HomeComponent},
{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
{path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
{path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

{path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
{path: 'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard]},

{path: 'delete-message/:id', component: EditMessageComponent, canActivate: [AuthGuard]},
{path: 'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard]},
{path: 'user/:username', component: PublicProfileComponent, canActivate: [AuthGuard]},
{path: 'job', component: JobComponent, canActivate: [AuthGuard]},
{path: 'apply/:id', component: ApplyComponent, canActivate: [AuthGuard]},
{path: 'careerFair', component: CareerFairComponent, canActivate: [AuthGuard]},
{path: 'viewEvents', component: EventsComponent, canActivate: [AuthGuard]},
{path: 'jobPost', component: JobPostComponent, canActivate: [LoginGuard]},
{path: 'roomPost', component: RoomPostComponent, canActivate: [LoginGuard]},
{path: 'delete-job/:id', component: JobDeleteComponent, canActivate: [LoginGuard]},
{path: 'myJobs/:username', component: MyJobsComponent, canActivate: [AuthGuard]},
{path: 'priorityJob', component: PriorityComponent, canActivate: [AuthGuard]},
{path: 'viewJobs/:username', component: ViewedJobsComponent, canActivate: [AuthGuard]},
{path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
{path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
{path: 'quiet', component: QuietComponent, canActivate: [AuthGuard]},

{path: 'group', component: GroupComponent, canActivate: [AuthGuard]},

{path: 'seminar', component: SeminarComponent, canActivate: [AuthGuard]},
{path: 'seminarReservation', component: SeminarReservationComponent, canActivate: [AuthGuard]},
{path: 'quietReservation', component: QuietReservationComponent, canActivate: [AuthGuard]},
{path: 'groupReservation', component: GroupReservationComponent, canActivate: [AuthGuard]},


{path: 'seminarEvents', component: SeminarEventsComponent, canActivate: [AuthGuard]},
{path: 'quietEvents', component: QuietEventsComponent, canActivate: [AuthGuard]},
{path: 'groupEvents', component: GroupEventsComponent, canActivate: [AuthGuard]}



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
