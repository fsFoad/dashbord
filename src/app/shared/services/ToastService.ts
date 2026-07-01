import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private messageService: MessageService) {}

    showSuccess(message: string | { detail: string;life: number; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'success',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            this.messageService.add({
                severity: 'success',
                summary: message.title || '',
                detail: message.detail,
            });
        }
    }

    showInfo(message: string | { detail: string; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'info',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            this.messageService.add({
                severity: 'info',
                summary: message.title || '',
                detail: message.detail,
            });
        }
    }

    showWarning(message: string | { detail: string;life: number; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'warn',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: message.title || '',
                detail: message.detail,
            });
        }
    }

    showError(message: string | { detail: string; life?: number; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'error',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            // Handle the object case
            this.messageService.add({
                severity: 'error',
                summary: message.title || '', // Fallback to "Error" if no title provided
                detail: message.detail,
                life: message.life, // Set life duration if required
            });
        }
    }

    showContrast(message: string | { detail: string; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'contrast',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            this.messageService.add({
                severity: 'contrast',
                summary: message.title || '',
                detail: message.detail,
            });
        }
    }

    showSecondary(message: string | { detail: string; title?: string }) {
        if (typeof message === 'string') {
            this.messageService.add({
                severity: 'secondary',
                summary: '', // Default summary for string messages
                detail: message,
            });
        } else {
            this.messageService.add({
                severity: 'secondary',
                summary: message.title || '',
                detail: message.detail,
            });
        }
    }
}
