import {enableProdMode} from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthService} from './services/auth.service';
import {BlogService} from './services/blog.service';
import {JobService} from './services/job.service';
import {ChatService} from './services/chat.service';
import {RoomService} from './services/room.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { EventsComponent } from './components/events/events.component';
import { CareerFairComponent } from './components/career-fair/career-fair.component';
import { JobComponent } from './components/job/job.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplyComponent } from './components/job/apply/apply.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { JobDeleteComponent } from './components/job-post/job-delete/job-delete.component';
import { MyJobsComponent } from './components/job/my-jobs/my-jobs.component';
import { PriorityComponent } from './components/job/priority/priority.component';
import { ViewedJobsComponent } from './components/job/viewed-jobs/viewed-jobs.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DeadlineComponent } from './components/job/deadline/deadline.component';
import { LibraryComponent } from './components/library/library.component';
import { QuietComponent } from './components/library/quiet/quiet.component';

import { GroupComponent } from './components/library/group/group.component';
import { SeminarComponent } from './components/library/seminar/seminar.component';
import { QuietReservationComponent } from './components/library/quiet/quiet-reservation/quiet-reservation.component';
import { GroupReservationComponent } from './components/library/group/group-reservation/group-reservation.component';
import { SeminarReservationComponent } from './components/library/seminar/seminar-reservation/seminar-reservation.component';
import { SeminarEventsComponent } from './components/library/seminar/seminar-events/seminar-events.component';
import { GroupEventsComponent } from './components/library/group/group-events/group-events.component';
import { QuietEventsComponent } from './components/library/quiet/quiet-events/quiet-events.component';
import { RoomPostComponent } from './components/room-post/room-post.component';
import { MessageComponent } from './components/profile/message/message.component';
import { EditMessageComponent } from './components/profile/message/edit-message/edit-message.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent,
    FilterPipePipe,
    EventsComponent,
    CareerFairComponent,
    JobComponent,
    ApplicationComponent,
    ApplyComponent,
    JobPostComponent,
    JobDeleteComponent,
    MyJobsComponent,
    PriorityComponent,
    ViewedJobsComponent,
    DeadlineComponent,
    LibraryComponent,
    QuietComponent,
    GroupComponent,
    SeminarComponent,
    QuietReservationComponent,
    GroupReservationComponent,
    SeminarReservationComponent,
    SeminarEventsComponent,
    GroupEventsComponent,
    QuietEventsComponent,
    RoomPostComponent,
    MessageComponent,
    EditMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, BlogService, LoginGuard, JobService, RoomService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
