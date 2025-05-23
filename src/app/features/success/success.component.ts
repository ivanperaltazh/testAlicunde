import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-success',
    imports: [
        CommonModule,
    ],
    templateUrl: './success.component.html',
    styleUrl: './success.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessComponent { }
