import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatTableModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
  MatFormFieldModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatStepperModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatChipsModule
  ],
  declarations: [],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AppMaterialModule {}
