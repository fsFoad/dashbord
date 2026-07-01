import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Panel} from 'primeng/panel';
import {ButtonDirective} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {NgForOf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {TranslocoService} from '@jsverse/transloco';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../@fuse/services/loading';
import {MessagesApiFacadeService} from '../../services/messages-api-facade.service';
import {Card} from 'primeng/card';

@Component({
    selector: 'app-release-note',
    templateUrl: './release-note.component.html',
    styleUrls: ['./release-note.component.scss'],
    standalone: true,
    imports: [
        Panel,
        Card,
        NgForOf,
        ButtonDirective,
        Ripple,
        Tooltip

    ],
})
export class ReleaseNoteComponent implements OnInit {
    tempVersion = [];
    releaseList = [];
    pageno = 0;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private route: ActivatedRoute,
        private transloco:TranslocoService,
    ) {}

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
    ngOnInit(): void {
     /*   this.messagesApiFacadeService
            .releasenote(this.pageno, 3)
            .subscribe((k) => {
                this.tempVersion = k;
            });*/
    }
    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
}
