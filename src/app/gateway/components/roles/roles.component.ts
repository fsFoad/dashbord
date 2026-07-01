import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    standalone: true,
    styleUrls: ['./roles.component.scss'],
    imports: [DevelopmentComponent, Tooltip, TranslocoPipe, ButtonDirective],
})
export class RolesComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
    }
    BeforeButton() {
        this.router.navigate(['/home']);
        // this.close.emit('close');
    }
}
