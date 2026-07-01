import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-fs-progress-spinner',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="spinner-container">
            <svg class="spinner" [attr.viewBox]="viewBoxValues">
                <circle class="spinner-circle" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" fill="none"
                        [attr.stroke-width]="stroke"/>
            </svg>
            <div class="spinner-overlay">
                <div class="spinner-text">لطفا شکیبا باشید</div>
                <div class="timer">{{ timeElapsed }} ثانیه</div>
            </div>
        </div>
    `,
    styleUrls: ['./fs-progress-spinner.component.scss']
})
export class FsProgressSpinnerComponent implements OnInit {
    width = '100';  // عرض SVG
    height = '100'; // ارتفاع SVG
    color = 'red';  // رنگ پرشدگی
    viewBoxValues = '25 25 50 50';  // مقادیر viewBox
    cx = '50';  // موقعیت افقی مرکز دایره
    cy = '50';  // موقعیت عمودی مرکز دایره
    r = '20';  // موقعیت عمودی مرکز دایره
    radius = '20';  // شعاع دایره
    stroke = '10';  // شعاع دایره

    constructor() {
        debugger
        this.updateSvgAttributes();
        window.addEventListener('resize', () => this.updateSvgAttributes());
    }

    timeElapsed = 0;

    updateSvgAttributes() {


    }

    ngOnInit(): void {
        console.log('cx=', this.cx);
        console.log('cy=', this.cy);
        console.log('r=', this.r);
        console.log('viewBoxValues=', this.viewBoxValues);
        setInterval(() => {
            this.timeElapsed++;
        }, 1000);
    }
}
