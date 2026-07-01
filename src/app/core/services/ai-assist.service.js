import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
/**
 * Mock AI assistant. The endpoint analyzes current data and returns written
 * insights; swap the URL for a real LLM endpoint later — the component stays
 * the same. (See anthropic API-in-artifacts pattern for a real integration.)
 */
let AiAssistService = class AiAssistService {
    http = inject(HttpClient);
    summary() {
        return this.http.post('/api/ai/summary', {});
    }
};
AiAssistService = __decorate([
    Injectable({ providedIn: 'root' })
], AiAssistService);
export { AiAssistService };
