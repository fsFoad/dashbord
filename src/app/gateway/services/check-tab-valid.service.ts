// @ts-nocheck
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckTabValidService {
    limitedOpenTab = false; // برای تعیین محدودیت تب‌های باز
    present = false; // بررسی وجود تب با URL مشخص
    lengthTab: number = null; // تعداد مجاز تب‌ها (اینجا ۶ تب)
    currentUrl: string = null; // URL فعلی تب باز
    previousRoute: string = null; // URL فعلی تب باز
    tabs: any[] = []; // آرایه‌ای برای ذخیره تب‌های باز
    addTab(url: string): boolean {
        if (this.isTabOpen(url)) {
            this.currentUrl = url;
            this.present = true;
            return true; // تب قبلاً باز بوده و تغییر مسیر مجاز است
        }

        if (this.tabs.length >= this.lengthTab) {
            this.limitedOpenTab = true;
            return false; // تعداد تب‌های باز از حد مجاز گذشته و تغییر مسیر مجاز نیست
        }

        // اگر تب باز نبود و تعداد مجاز پر نشده بود، تب را اضافه کن
        this.tabs.push(url);
        this.currentUrl = url;
        this.present = true;
        return true; // تب جدید باز شد و تغییر مسیر مجاز است
    }

    // تابع برای بستن تب
    closeTab(url: string): void {
        this.tabs = this.tabs.filter(tab => tab !== url);
        if (this.currentUrl === url) {
            this.currentUrl = this.tabs.length > 0 ? this.tabs[this.tabs.length - 1] : null;
        }
    }

    // بررسی باز بودن تب با URL مشخص
    isTabOpen(url: string): boolean {
        console.log('Checking if tab is open:', url);
        console.log('Tabs array:', this.tabs);
        return this.tabs.some(tab => tab.route === url);
    }
    // تابعی برای مدیریت تغییر مسیر (روت)
    canActivateRoute(url: string): boolean {
        if (this.isTabOpen(url)) {
            this.currentUrl = url;
            return true; // تب با این URL قبلاً باز بوده و تغییر مسیر مجاز است
        } else if (this.tabs.length < this.lengthTab) {
            return this.addTab(url); // اگر تعداد تب‌های باز کمتر از حد مجاز است، تب جدید اضافه شود
        }

        return false; // تعداد تب‌ها به حداکثر رسیده و تب جدید نمی‌تواند باز شود
    }

    // بستن همه تب‌ها
    closeAllTabs() {
        this.tabs = [{name: 'صفحه اصلی', route: '/main/home'}];
        this.currentUrl = null;
        this.present = false;
        return this.tabs
    }

  constructor() { }


}
