import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NgIf, NgForOf } from '@angular/common';

@Component({
    selector: 'app-horizontal-tree-node',
    standalone: true,
    imports: [NgIf, NgForOf],
    template: `
        <div class="tree-node-wrapper" *ngIf="node">
            <div class="node-wrapper">
                <div
                    class="node"
                    [class.selected]="isSelected"
                    (click)="onNodeClick($event)"
                >
          <span class="toggle" *ngIf="node?.children?.length" (click)="toggleExpand($event)">
            {{ isExpanded ? '−' : '+' }}
          </span>
                    {{ node.label }}
                </div>
            </div>

            <div class="children-wrapper" *ngIf="node && isExpanded && node.children?.length">
                <div class="connector-horizontal-to-vertical"></div>
                <div
                    class="connector-vertical"
                    *ngIf="node.children.length > 1"
                    [style.height.px]="node.children.length * 56"
                ></div>

                <div class="children">
                    <div class="child-node" *ngFor="let child of node.children">
                        <div class="connector-horizontal-from-vertical"></div>
                        <app-horizontal-tree-node
                            [node]="child"
                            [selectionMode]="selectionMode"
                            [selection]="selection"
                            [rootNode]="rootNode"
                            (selectionChange)="selectionChange.emit($event)"
                        ></app-horizontal-tree-node>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .tree-node-wrapper {
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
            }

            .node-wrapper {
                position: relative;
                z-index: 2;
            }

            .node {
                padding: 0.5rem 1rem;
                background-color: #f0f0f0;
                border-radius: 12px;
                border: 1px solid #ccc;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .node.selected {
                background-color: #7c3aed;
                color: white;
            }

            .toggle {
                margin-right: 8px;
                font-weight: bold;
                cursor: pointer;
            }

            .children-wrapper {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                //margin-left: 0.5rem;
                //padding-left: 1rem;
            }

            .connector-horizontal-to-vertical {
                width: 2px;
                height: 1px;
                background-color: #ccc;
            }

            .connector-vertical {
                width: 2px;
                background-color: #ccc;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                transform: none;
            }

            .children {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .child-node {
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
            }

            .connector-horizontal-from-vertical {
                width: 3rem;
                height: 2px;
                background-color: #ccc;
                position: relative;
                left: 0;
            }
        `
    ]
})
export class HorizontalTreeNodeComponent {
    @Input() node!: TreeNode;
    @Input() rootNode!: TreeNode;
    @Input() selectionMode: 'single' | 'multiple' = 'single';
    @Input() selection: TreeNode | TreeNode[] | null = null;
    @Output() selectionChange = new EventEmitter<TreeNode | TreeNode[]>();

    isExpanded = false;

    get isSelected(): boolean {
        return this.selectionMode === 'single'
            ? this.selection === this.node
            : Array.isArray(this.selection) && this.selection.includes(this.node);
    }

    toggleExpand(event: MouseEvent) {
        event.stopPropagation();
        this.isExpanded = !this.isExpanded;
    }

    onNodeClick(event: MouseEvent) {
        event.stopPropagation();
        if (this.selectionMode === 'single') {
            this.selectionChange.emit(this.node);
        } else {
            const selected = Array.isArray(this.selection) ? [...this.selection] : [];
            const index = selected.indexOf(this.node);
            if (index >= 0) {
                selected.splice(index, 1);
            } else {
                selected.push(this.node);
            }
            this.selectionChange.emit(selected);
        }
    }

    /** Optional helper to compute path - call manually if needed */
    getPath(node: TreeNode): string {
        if (!node?.key || !this.rootNode) return '*';

        const segments: string[] = [];
        let current: TreeNode | undefined = node;

        while (current) {
            segments.unshift(current.label || current.key);
            const lastSlash = current.key.lastIndexOf('/');
            if (lastSlash === -1) break;
            const parentKey = current.key.substring(0, lastSlash);
            current = this.findNodeByKey(parentKey, this.rootNode);
        }

        return '/' + segments.join('/');
    }

    private findNodeByKey(key: string, node: TreeNode): TreeNode | undefined {
        if (node.key === key) return node;
        if (!node.children) return undefined;
        for (const child of node.children) {
            const found = this.findNodeByKey(key, child);
            if (found) return found;
        }
        return undefined;
    }
}
