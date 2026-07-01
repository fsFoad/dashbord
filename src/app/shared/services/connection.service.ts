import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ApiMockObjectsService } from '../mockObjects/api-mock-objects.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppSettings } from '../../app/AppSetting';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    constructor(private httpClient: HttpClient) {}

    /**
     * @param options گزینه‌های درخواست HTTP
     * @param responseType نوع پاسخ، به‌صورت پیش‌فرض 'json'
     * @param observe نحوه مشاهده پاسخ ('body' یا 'response')، به‌صورت پیش‌فرض 'body'
     * @returns گزینه‌های HTTP تنظیم‌شده
     */
    private createHttpOptions(options?: any, responseType: any = 'json', observe: 'body' | 'response' = 'body') {
        return {
            ...options,
            responseType: responseType,
            observe: observe
        };
    }

    /**
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns نتیجه بررسی حالت Mock
     */
    private isMockRequest(isMock?: boolean): boolean {
        return AppSettings.IsMock || isMock === true;
    }

    /**
     * @param mockObjectName نام شیء Mock برای بازگشت
     * @returns Observable پاسخ Mock در صورت وجود، در غیر این صورت پاسخ پیش‌فرض
     */
    private handleMockResponse(mockObjectName?: string): Observable<any> {
        if (ApiMockObjectsService[mockObjectName]) {
            return of(ApiMockObjectsService[mockObjectName]);
        }
        return of(ApiMockObjectsService.defaultApiResult);
    }

    /**
     * متد GET برای دریافت داده‌ها از سرور
     * @param url آدرس Endpoint برای درخواست
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns Observable داده‌های دریافتی
     */
    public getConnection(url: string, mockObjectName?: string, options?: any, isMock?: boolean): Observable<any> {
        if (!this.isMockRequest(isMock)) {
            return this.httpClient.get(environment.serviceBaseUrl + url, options)
                .pipe(map(e => e));
        } else {
            return this.handleMockResponse(mockObjectName);
        }
    }

    /**
     * متد DELETE برای حذف داده‌ها از سرور
     * @param url آدرس Endpoint برای درخواست
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns Observable نتیجه حذف
     */
    public deleteConnection(url: string, mockObjectName?: string, options?: any, isMock?: boolean): Observable<any> {
        if (!this.isMockRequest(isMock)) {
            return this.httpClient.delete(environment.serviceBaseUrl + url, options)
                .pipe(map(e => e));
        } else {
            return this.handleMockResponse(mockObjectName);
        }
    }

    /**
     * متد برای دانلود داده‌ها از سرور
     * @param url آدرس Endpoint برای درخواست دانلود
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @returns Observable نتیجه دانلود
     */
    public downloadConnection(url: string, mockObjectName?: string, options?: any): Observable<any> {
        if (!AppSettings.IsMock) {
            window.location.href = environment.serviceBaseUrl + url;
            return of('success');
        } else {
            return this.handleMockResponse(mockObjectName);
        }
    }

    /**
     * متد POST برای ارسال داده‌ها به سرور
     * @param url آدرس Endpoint برای درخواست
     * @param body داده‌های ارسال‌شونده
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns Observable نتیجه ارسال
     */
    public postConnection(url: string, body: any, mockObjectName?: string, options?: any, isMock?: boolean): Observable<any> {
        if (!this.isMockRequest(isMock)) {
            return this.httpClient.post(environment.serviceBaseUrl + url, body, options)
                .pipe(map(e => e));
        } else {
            return this.handleMockResponse(mockObjectName);
        }
    }

    /**
     * متد PUT برای به‌روزرسانی داده‌ها در سرور
     * @param url آدرس Endpoint برای درخواست
     * @param body داده‌های به‌روزرسانی‌شونده
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns Observable نتیجه به‌روزرسانی
     */
    public putConnection(url: string, body: any, mockObjectName?: string, options?: any, isMock?: boolean): Observable<any> {
        if (!this.isMockRequest(isMock)) {
            return this.httpClient.put(environment.serviceBaseUrl + url, body, options)
                .pipe(map(e => e));
        } else {
            return this.handleMockResponse(mockObjectName);
        }
    }

    /**
     * متد POST برای دانلود داده‌ها به عنوان Blob
     * @param url آدرس Endpoint برای درخواست دانلود
     * @param body داده‌های ارسال‌شونده
     * @param mockObjectName نام شیء Mock مورد استفاده (در صورت Mock)
     * @param options گزینه‌های درخواست HTTP
     * @param isMock آیا درخواست در حالت Mock است یا خیر
     * @returns Observable شیء شامل Blob و هدرهای دریافتی
     */
    public postDownloadConnection(
        url: string,
        body: any,
        mockObjectName?: string,
        options?: any,
        isMock?: boolean
    ): Observable<{ blob: Blob; headers: HttpHeaders }> {
        if (!this.isMockRequest(isMock)) {
            // تنظیم گزینه‌ها به‌درستی برای پاسخ Blob
            const httpOptions = this.createHttpOptions(options, 'blob', 'response');

            return this.httpClient.post<Blob>(environment.serviceBaseUrl + url, body, httpOptions)
                .pipe(map((response: HttpResponse<Blob>) => ({
                    blob: response.body as Blob, // دریافت Blob از بدنه پاسخ
                    headers: response.headers // دریافت هدرها از پاسخ
                })));
        }

        return of({ blob: new Blob(), headers: new HttpHeaders() }); // بازگشت یک مقدار پیش‌فرض برای Mock
    }

    getDownloadConnection(
        url: string,
        mockObjectName?: string,
        options?: any,
        isMock?: boolean
    ): Observable<{ blob: Blob; headers: HttpHeaders }> {
        if (!this.isMockRequest(isMock)) {
            // Set options correctly for blob response
            const httpOptions = this.createHttpOptions(options, 'blob', 'response');

            // Return the observable from the httpClient.get
            return this.httpClient.get<Blob>(environment.serviceBaseUrl + url, httpOptions)
                .pipe(
                    map((response: HttpResponse<Blob>) => ({
                        blob: response.body as Blob, // Get Blob from response body
                        headers: response.headers // Get headers from response
                    })),
                    tap(() => {
                        // Trigger download in the browser
                        window.location.href = environment.serviceBaseUrl + url;
                    })
                );
        } else {
            // Handle mock requests properly
            if (ApiMockObjectsService[mockObjectName]) {
                return of({ blob: new Blob(), headers: new HttpHeaders() }); // Return a valid structure
            } else {
                return of({ blob: new Blob(), headers: new HttpHeaders() }); // Default case
            }
        }
    }
}
