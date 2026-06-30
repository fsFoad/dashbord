import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DATA_SOURCE } from '../config/data-source.config';
import { PortalInfo } from '../models/portal-info.model';

/** داده mock — وقتی DATA_SOURCE.portalInfo = true یا API در دسترس نباشد */
const MOCK: PortalInfo = {
  logoUrl: '',
  appName: 'API Gateway',
  tagline: 'درگاه ارائه سرویس',
  description:
    'راهکار جامع تعریف، مسیردهی و انتشار سرویس‌های سازمانی با قابلیت اتصال مستقیم به منابع داده، اعمال سیاست‌های امنیتی پیشرفته و مانیتورینگ لحظه‌ای در یک پلتفرم متمرکز.',
  version: '2.4.1',
  features: [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'API Gateway',
      description: 'مسیردهی هوشمند و Load Balancing',
      color: 'sky',
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: 'Data Hub',
      description: 'اتصال مستقیم به پایگاه‌داده',
      color: 'indigo',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Advanced Security',
      description: 'RSA Auth و Rate Limiting',
      color: 'emerald',
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Monitoring',
      description: 'Observability و Health Check',
      color: 'purple',
    },
  ],
  badges: ['Kubernetes Native', 'Real-time Analytics', 'Auto Scaling'],
};

@Injectable({ providedIn: 'root' })
export class PortalInfoService {
  private readonly http = inject(HttpClient);

  get(): Observable<PortalInfo> {
    if (DATA_SOURCE.portalInfo) return of(MOCK);
    return this.http
      .get<PortalInfo>('/api/portal-info')
      .pipe(catchError(() => of(MOCK)));
  }
}
