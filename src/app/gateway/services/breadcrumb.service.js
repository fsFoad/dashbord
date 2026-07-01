import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let BreadcrumbService = class BreadcrumbService {
    index;
    label_index0;
    rout_index0;
    isActive0;
    img_index0;
    label_Detail_index0;
    label_index1;
    rout_index1;
    isActive1;
    img_index1;
    label_Detail_index1;
    label_index2;
    rout_index2;
    isActive2;
    img_index2;
    label_Detail_index2;
    label_index3;
    rout_index3;
    isActive3;
    img_index3;
    label_Detail_index3;
    label_index4;
    rout_index4;
    isActive4;
    img_index4;
    label_Detail_index4;
    label_index5;
    rout_index5;
    isActive5;
    img_index5;
    label_Detail_index5;
    label_index6;
    rout_index6;
    isActive6;
    img_index6;
    label_Detail_index6;
    constructor(data) {
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
    toggleActive(index) {
        if (this[`isActive${index}`] !== undefined) {
            this[`isActive${index}`] = !this[`isActive${index}`];
        }
    }
    // متدی برای دریافت تمام label ها در قالب یک آرایه
    getLabels() {
        return [
            this.label_index0,
            this.label_index1,
            this.label_index2,
            this.label_index3,
            this.label_index4,
            this.label_index5,
            this.label_index6
        ].filter(label => label !== null);
    }
    // متدی برای دریافت تمام routes
    getRoutes() {
        return [
            this.rout_index0,
            this.rout_index1,
            this.rout_index2,
            this.rout_index3,
            this.rout_index4,
            this.rout_index5,
            this.rout_index6
        ].filter(route => route !== null);
    }
    // متدی برای دریافت تصویر
    getImages() {
        return [
            this.img_index0,
            this.img_index1,
            this.img_index2,
            this.img_index3,
            this.img_index4,
            this.img_index5,
            this.img_index6
        ].filter(img => img !== null);
    }
    // متدی برای دریافت جزئیات label ها
    getLabelDetails() {
        return [
            this.label_Detail_index0,
            this.label_Detail_index1,
            this.label_Detail_index2,
            this.label_Detail_index3,
            this.label_Detail_index4,
            this.label_Detail_index5,
            this.label_Detail_index6
        ].filter(detail => detail !== null);
    }
};
BreadcrumbService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BreadcrumbService);
export { BreadcrumbService };
