// @ts-nocheck
import {  Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ClientComponent } from '../client/client.component';

@Component({
    selector: 'app-client-base',
    templateUrl: './client-base.component.html',
    standalone: true,
    styleUrls: ['./client-base.component.scss'],
    imports: [ClientComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ClientBaseComponent implements OnInit {
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
