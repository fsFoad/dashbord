import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ToastService {
  success(msg: string): void {}
  error(msg: string): void {}
  warn(msg: string): void {}
  info(msg: string): void {}
  showSuccess(msg: string): void {}
  showError(msg: string): void {}
  showWarning(msg: string): void {}
  showInfo(msg: string): void {}
}
