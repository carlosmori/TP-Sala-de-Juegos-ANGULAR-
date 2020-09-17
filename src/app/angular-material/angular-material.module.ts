import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatInputModule],
  exports: [MatButtonModule, MatDividerModule, MatIconModule, MatInputModule]
})
export class AngularMaterialModule {}
