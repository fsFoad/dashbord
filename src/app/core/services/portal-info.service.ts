import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DATA_SOURCE } from '../config/data-source.config';
import { PortalInfo } from '../models/portal-info.model';
import { BRANDING } from '../config/branding.config';

/** Mock data — used when DATA_SOURCE.portalInfo is true, or as a fallback if the API call fails. */
const MOCK: PortalInfo = {
  logoUrl: '',
  appName: BRANDING.appName,
  tagline: 'مدیریت یکپارچه‌ی مالیِ سازمان شما، در یک پلتفرم',
  description:
    'حساب‌ها، حواله‌ها، تسهیلات، کارت و کیف پول، گزارش‌ها — همه در یک داشبورد امن و سریع، هماهنگ با زیرساخت بانکی کشور.',
  version: '2.3.0',
  features: [
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      title: 'مدیریت حساب‌ها',
      description: 'گردش وجوه و صورت‌حساب‌ها',
      color: 'sky',
    },
    {
      icon: 'M17 8l4 4m0 0l-4 4m4-4H3',
      title: 'حواله و پرداخت',
      description: 'ساتنا، پایا و پرداخت قبوض',
      color: 'indigo',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'امنیت بانکی',
      description: 'ورود دومرحله‌ای و رمزنگاری کامل',
      color: 'emerald',
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'گزارش‌های دقیق',
      description: 'تراکنش‌ها و کارمزدها با خروجی PDF',
      color: 'purple',
    },
  ],
  badges: ['هماهنگ با بانک مرکزی', 'دسترس‌پذیری بالا', 'رمزنگاری end-to-end'],
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
