import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class AngularMaterialModule {}
