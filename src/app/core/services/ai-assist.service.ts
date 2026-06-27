import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface AiSummary {
  generatedAt: string;
  insights: { fa: string[]; en: string[]; ar: string[] };
}

/**
 * Mock AI assistant. The endpoint analyzes current data and returns written
 * insights; swap the URL for a real LLM endpoint later — the component stays
 * the same. (See anthropic API-in-artifacts pattern for a real integration.)
 */
@Injectable({ providedIn: 'root' })
export class AiAssistService {
  private readonly http = inject(HttpClient);

  summary(): Observable<AiSummary> {
    return this.http.post<AiSummary>('/api/ai/summary', {});
  }
}
