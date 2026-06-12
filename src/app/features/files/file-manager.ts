import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Tooltip } from 'primeng/tooltip';
import { FileNode } from '../../core/models/api.model';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';

interface Listing {
  items: FileNode[];
  trail: { id: number; name: string }[];
}

/** File manager: folder navigation + breadcrumb, grid/list views, create folder, upload (mock), rename, recursive delete. */
@Component({
  selector: 'app-file-manager',
  imports: [
    FormsModule, TranslocoModule, ButtonModule, InputTextModule, Dialog, Tooltip,
    LocalizedDatePipe, SkeletonCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-manager.html',
})
export class FileManager {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly parentId = signal<number | null>(null);
  protected readonly listing = signal<Listing | null>(null);
  protected readonly view = signal<'grid' | 'list'>('grid');
  protected q = '';
  protected readonly query = signal('');

  protected readonly items = computed(() => {
    const all = this.listing()?.items ?? [];
    const q = this.query().trim();
    const filtered = q ? all.filter((f) => f.name.includes(q)) : all;
    return [...filtered].sort((a, b) =>
      a.type === b.type ? a.name.localeCompare(b.name, 'fa') : a.type === 'folder' ? -1 : 1,
    );
  });

  // rename dialog
  protected readonly renameOpen = signal(false);
  protected renameTarget: FileNode | null = null;
  protected renameValue = '';

  // new folder
  protected readonly folderOpen = signal(false);
  protected folderName = '';
  protected readonly busy = signal(false);

  constructor() {
    effect(() => {
      const parent = this.parentId();
      this.listing.set(null);
      const url = parent === null ? '/api/files' : `/api/files?parent=${parent}`;
      this.http.get<Listing>(url).subscribe({ next: (l) => this.listing.set(l) });
    });
  }

  protected open(node: FileNode): void {
    if (node.type === 'folder') this.parentId.set(node.id);
  }

  protected goTo(id: number | null): void {
    this.parentId.set(id);
  }

  protected reload(): void {
    const p = this.parentId();
    this.parentId.set(p === null ? null : p); // no-op set won't re-trigger; force:
    const url = p === null ? '/api/files' : `/api/files?parent=${p}`;
    this.http.get<Listing>(url).subscribe({ next: (l) => this.listing.set(l) });
  }

  protected createFolder(): void {
    const name = this.folderName.trim();
    if (!name) return;
    this.busy.set(true);
    this.http
      .post<FileNode>('/api/files', { name, type: 'folder', parentId: this.parentId() })
      .subscribe({
        next: (node) => {
          this.listing.update((l) => (l ? { ...l, items: [...l.items, node] } : l));
          this.busy.set(false);
          this.folderOpen.set(false);
          this.folderName = '';
        },
        error: () => this.busy.set(false),
      });
  }

  /** Mock "upload": picks real files, stores name+size entries. */
  protected onUpload(e: Event): void {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    for (const f of files) {
      this.http
        .post<FileNode>('/api/files', {
          name: f.name, type: 'file', size: f.size, parentId: this.parentId(),
        })
        .subscribe({
          next: (node) =>
            this.listing.update((l) => (l ? { ...l, items: [...l.items, node] } : l)),
        });
    }
    if (files.length) this.toast.success('files.uploaded', { n: files.length });
  }

  protected openRename(node: FileNode, ev: Event): void {
    ev.stopPropagation();
    this.renameTarget = node;
    this.renameValue = node.name;
    this.renameOpen.set(true);
  }

  protected rename(): void {
    const t = this.renameTarget;
    const name = this.renameValue.trim();
    if (!t || !name) return;
    this.busy.set(true);
    this.http.put<FileNode>(`/api/files/${t.id}`, { name }).subscribe({
      next: (node) => {
        this.listing.update((l) =>
          l ? { ...l, items: l.items.map((x) => (x.id === node.id ? node : x)) } : l,
        );
        this.busy.set(false);
        this.renameOpen.set(false);
      },
      error: () => this.busy.set(false),
    });
  }

  protected async remove(node: FileNode, ev: Event): Promise<void> {
    ev.stopPropagation();
    if (!(await this.confirm.delete(node.name))) return;
    const previous = this.listing();
    this.listing.update((l) =>
      l ? { ...l, items: l.items.filter((x) => x.id !== node.id) } : l,
    ); // optimistic
    this.http.delete(`/api/files/${node.id}`).subscribe({
      next: () => this.toast.success('files.deleted'),
      error: () => this.listing.set(previous),
    });
  }

  protected icon(node: FileNode): string {
    if (node.type === 'folder') return 'pi pi-folder';
    const ext = node.name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'pi pi-file-pdf';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'pi pi-image';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return 'pi pi-file-excel';
    if (['doc', 'docx'].includes(ext)) return 'pi pi-file-word';
    return 'pi pi-file';
  }

  protected iconColor(node: FileNode): string {
    if (node.type === 'folder') return 'text-amber-500';
    const i = this.icon(node);
    if (i.includes('pdf')) return 'text-red-500';
    if (i.includes('image')) return 'text-violet-500';
    if (i.includes('excel')) return 'text-green-600';
    if (i.includes('word')) return 'text-blue-500';
    return 'text-muted-color';
  }

  protected humanSize(bytes: number | null): string {
    if (bytes === null) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  }
}
