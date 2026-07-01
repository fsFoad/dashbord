// @ts-nocheck
import {  Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    standalone: true,
    styleUrls: ['./report.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
    }
}
