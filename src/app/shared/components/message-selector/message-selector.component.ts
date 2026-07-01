import {Component, Input, OnInit} from '@angular/core';
import {ApiGatewayConstants} from "../../../main/constants/ApiGatewayConstants";
import {MessagesApiFacadeService} from "../../../main/services/messages-api-facade.service";

import { TranslocoService } from '@ngneat/transloco';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';

@Component({
    selector: 'app-message-selector',
    templateUrl: './message-selector.component.html',
    standalone: true,
    styleUrls: ['./message-selector.component.scss'],
})
export class MessageSelectorComponent implements OnInit {
    @Input() inputMessage
    statusCodeOptions = ApiGatewayConstants.statusCode
    codeMessage
    titleMessage
    textMessage
    textENMessage
    typeMessage
    tableIdMessage
    messageId
    selectedMessageId
    icon_val
    tableIdDe
    titleMessageDe
    rows
    messageIdDe
    codeMessageDe
    first
    messageFlag=false
    messagesList = []
    typeMessages = ApiGatewayConstants.typeMessages;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    paginationLabel=this.transloco.translate('label.pagination.table');
  constructor(
      private messagesApiFacadeService:MessagesApiFacadeService,
      private transloco :TranslocoService,
      private _primengProgressBarService: FuseLoadingService,
  ) { }

  ngOnInit(): void {
  }
    messageSearch() {
        this.messagesApiFacadeService.messagesearch(
            this.codeMessage, this.titleMessage, this.tableIdMessage, this.typeMessage
        ).subscribe(response => {
            if (Array.isArray(response)) {
                this.messagesList = response
            } else {
                this.messagesList.push(response)
            }
        })
    }
    messageClear() {
        this.titleMessage = ""
        this.textMessage = ""
        this.textENMessage= ""
        this.tableIdMessage = ""
        this.typeMessage= ""
        this.messageId = null
        this.messageSearch()
    }
    selectedMessage(event) {
        this.messageId= event.data.messageId
        this.selectedMessageId = event.data.messageId
        this.codeMessageDe = event.data.code
        this.messageIdDe = event.data.messageId
        this.titleMessageDe = event.data.title
        this.tableIdDe = event.data.tableId
        this.icon_val = "pi pi-check"
    }
    onRowUnselect(event) {
        this.icon_val = null
    }
}
