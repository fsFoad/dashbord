import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Panel } from 'primeng/panel';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { NgForOf } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Card } from 'primeng/card';
let ReleaseNoteComponent = class ReleaseNoteComponent {
    messagesApiFacadeService;
    _primengProgressBarService;
    route;
    transloco;
    tempVersion = [];
    releaseList = [];
    pageno = 0;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    constructor(messagesApiFacadeService, _primengProgressBarService, route, transloco) {
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.route = route;
        this.transloco = transloco;
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
    ngOnInit() {
        /*   this.messagesApiFacadeService
               .releasenote(this.pageno, 3)
               .subscribe((k) => {
                   this.tempVersion = k;
               });*/
    }
    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
};
ReleaseNoteComponent = __decorate([
    Component({
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
], ReleaseNoteComponent);
export { ReleaseNoteComponent };
