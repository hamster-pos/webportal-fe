import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { CustomersComponent } from '../../customers/customers.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,



  MatSelectModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { ValidatorService } from 'angular4-material-table';
import { PersonValidatorService } from 'app/customers/person-validator.service';
import { HttpClientModule } from '@angular/common/http';
import { LicencesComponent } from 'app/licences/licences.component';
import { LicenceValidatorService } from 'app/licences/licence-validator.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    CustomersComponent,
    LicencesComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ],
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorService },
    {provide: LicenceValidatorService, useClass: LicenceValidatorService }
  ],
})

export class AdminLayoutModule {}
