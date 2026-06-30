import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    standalone: true,
    imports: [],

})
export class UserManagementComponent implements OnInit {
    @Output() close = new EventEmitter<string>();

    constructor(
        private route: ActivatedRoute, private router: Router,
    ) {
    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f)
            console.log(element)
            if (element) element.scrollIntoView(true)
        })
    }

    ngOnInit(): void {
        this.scrollTop()
    }

    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
}
