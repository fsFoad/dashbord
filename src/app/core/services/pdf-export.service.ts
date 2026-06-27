import { Injectable, inject } from '@angular/core';
import { SettingsStore } from './settings.store';
import { ToastService } from './toast.service';

/**
 * Exports a DOM element to a paginated A4 PDF. jsPDF + html2canvas are loaded
 * lazily (dynamic import) so they stay out of the initial bundle — the button
 * shows a loading state while they download on first use.
 *
 * Dark mode is temporarily neutralized during capture so the PDF is printable
 * (dark backgrounds waste ink and read poorly on paper).
 */
@Injectable({ providedIn: 'root' })
export class PdfExportService {
  private readonly settings = inject(SettingsStore);
  private readonly toast = inject(ToastService);

  async exportElement(el: HTMLElement, filename = 'export.pdf'): Promise<void> {
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const wasDark = this.settings.darkMode();
      if (wasDark) document.documentElement.classList.remove('app-dark');

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      if (wasDark) document.documentElement.classList.add('app-dark');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      const img = canvas.toDataURL('image/png');
      let heightLeft = imgH;
      let position = margin;

      pdf.addImage(img, 'PNG', margin, position, imgW, imgH);
      heightLeft -= pageH - margin * 2;

      // slice tall content across pages
      while (heightLeft > 0) {
        position = margin - (imgH - heightLeft);
        pdf.addPage();
        pdf.addImage(img, 'PNG', margin, position, imgW, imgH);
        heightLeft -= pageH - margin * 2;
      }

      pdf.save(filename);
      this.toast.success('pdf.done');
    } catch {
      this.toast.error('pdf.failed');
    }
  }
}
