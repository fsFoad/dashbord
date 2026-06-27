import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
    index: number;

    label_index0: string | null;
    rout_index0: string | null;
    isActive0: boolean;
    img_index0: string | null;
    label_Detail_index0: string | null;

    label_index1: string | null;
    rout_index1: string | null;
    isActive1: boolean;
    img_index1: string | null;
    label_Detail_index1: string | null;

    label_index2: string | null;
    rout_index2: string | null;
    isActive2: boolean;
    img_index2: string | null;
    label_Detail_index2: string | null;

    label_index3: string | null;
    rout_index3: string | null;
    isActive3: boolean;
    img_index3: string | null;
    label_Detail_index3: string | null;

    label_index4: string | null;
    rout_index4: string | null;
    isActive4: boolean;
    img_index4: string | null;
    label_Detail_index4: string | null;

    label_index5: string | null;
    rout_index5: string | null;
    isActive5: boolean;
    img_index5: string | null;
    label_Detail_index5: string | null;

    label_index6: string | null;
    rout_index6: string | null;
    isActive6: boolean;
    img_index6: string | null;
    label_Detail_index6: string | null;

    constructor(data: any) {
        this.index = data.index || 0;

        this.label_index0 = data.label_index0 || null;
        this.rout_index0 = data.rout_index0 || null;
        this.isActive0 = data.isActive0 || false;
        this.img_index0 = data.img_index0 || null;
        this.label_Detail_index0 = data.label_Detail_index0 || null;

        this.label_index1 = data.label_index1 || null;
        this.rout_index1 = data.rout_index1 || null;
        this.isActive1 = data.isActive1 || false;
        this.img_index1 = data.img_index1 || null;
        this.label_Detail_index1 = data.label_Detail_index1 || null;

        this.label_index2 = data.label_index2 || null;
        this.rout_index2 = data.rout_index2 || null;
        this.isActive2 = data.isActive2 || false;
        this.img_index2 = data.img_index2 || null;
        this.label_Detail_index2 = data.label_Detail_index2 || null;

        this.label_index3 = data.label_index3 || null;
        this.rout_index3 = data.rout_index3 || null;
        this.isActive3 = data.isActive3 || false;
        this.img_index3 = data.img_index3 || null;
        this.label_Detail_index3 = data.label_Detail_index3 || null;

        this.label_index4 = data.label_index4 || null;
        this.rout_index4 = data.rout_index4 || null;
        this.isActive4 = data.isActive4 || false;
        this.img_index4 = data.img_index4 || null;
        this.label_Detail_index4 = data.label_Detail_index4 || null;

        this.label_index5 = data.label_index5 || null;
        this.rout_index5 = data.rout_index5 || null;
        this.isActive5 = data.isActive5 || false;
        this.img_index5 = data.img_index5 || null;
        this.label_Detail_index5 = data.label_Detail_index5 || null;

        this.label_index6 = data.label_index6 || null;
        this.rout_index6 = data.rout_index6 || null;
        this.isActive6 = data.isActive6 || false;
        this.img_index6 = data.img_index6 || null;
        this.label_Detail_index6 = data.label_Detail_index6 || null;
    }

    // متدهایی برای تغییر وضعیت فعال بودن
    toggleActive(index: number): void {
        if (this[`isActive${index}`] !== undefined) {
            this[`isActive${index}`] = !this[`isActive${index}`];
        }
    }

    // متدی برای دریافت تمام label ها در قالب یک آرایه
    getLabels(): string[] {
        return [
            this.label_index0,
            this.label_index1,
            this.label_index2,
            this.label_index3,
            this.label_index4,
            this.label_index5,
            this.label_index6
        ].filter(label => label !== null) as string[];
    }

    // متدی برای دریافت تمام routes
    getRoutes(): string[] {
        return [
            this.rout_index0,
            this.rout_index1,
            this.rout_index2,
            this.rout_index3,
            this.rout_index4,
            this.rout_index5,
            this.rout_index6
        ].filter(route => route !== null) as string[];
    }

    // متدی برای دریافت تصویر
    getImages(): string[] {
        return [
            this.img_index0,
            this.img_index1,
            this.img_index2,
            this.img_index3,
            this.img_index4,
            this.img_index5,
            this.img_index6
        ].filter(img => img !== null) as string[];
    }

    // متدی برای دریافت جزئیات label ها
    getLabelDetails(): string[] {
        return [
            this.label_Detail_index0,
            this.label_Detail_index1,
            this.label_Detail_index2,
            this.label_Detail_index3,
            this.label_Detail_index4,
            this.label_Detail_index5,
            this.label_Detail_index6
        ].filter(detail => detail !== null) as string[];
    }
}