import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
    BasemoduleApiManagementComponent
} from '../module-api/basemodule-api-management/basemodule-api-management.component';

@Component({
    selector: 'app-module-base',
    templateUrl: './module-base.component.html',
    standalone: true,
    styleUrls: ['./module-base.component.scss'],
    imports: [BasemoduleApiManagementComponent],
})
export class ModuleBaseComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
    }
}
