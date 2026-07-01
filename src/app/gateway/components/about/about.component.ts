import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { CheckTabValidService } from '../../services/check-tab-valid.service';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    imports: [Tooltip, ButtonDirective],
    standalone: true,
})
export class AboutComponent implements OnInit {
    @Output() close = new EventEmitter<string>();

    constructor(
        private router: Router,
        private checkTabValidService: CheckTabValidService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.scrollTop();
        window.open('assets/Gateway_Doc.docx', '_blank');

        this.router.navigate([this.checkTabValidService.previousRoute]);
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    BeforeButton() {
        this.router.navigate(['/home']);
        // this.close.emit('close');
    }
}
