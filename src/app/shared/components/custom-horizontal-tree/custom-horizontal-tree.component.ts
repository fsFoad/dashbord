import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { HorizontalTreeNodeComponent } from '../horizontal-tree-node/horizontal-tree-node.component';

@Component({
    selector: 'app-custom-horizontal-tree',
    standalone: true,
    imports: [CommonModule, HorizontalTreeNodeComponent],
    template: `
        <div class="overflow-auto p-4">
            <div class="flex items-start space-x-8">
                <app-horizontal-tree-node
                    *ngFor="let node of value"
                    [node]="node"
                    [selectionMode]="selectionMode"
                    [selection]="selection"
                    [rootNode]="node"
                    (selectionChange)="onNodeSelected($event)"
                ></app-horizontal-tree-node>
            </div>
        </div>
    `,
    styles: []
})
export class CustomHorizontalTreeComponent {
    @Input() value: TreeNode[] = [];
    @Input() selectionMode: 'single' | 'multiple' = 'single';
    @Input() selection: TreeNode | TreeNode[] | null = null;

    @Output() selectionChange = new EventEmitter<TreeNode | TreeNode[]>();
    @Output() onNodeSelect = new EventEmitter<{ node: TreeNode }>();

    onNodeSelected(node: TreeNode | TreeNode[]) {
        this.selection = node;
        this.selectionChange.emit(this.selection);

        const selectedNode = Array.isArray(node) ? node[node.length - 1] : node;
        if (selectedNode) {
            this.onNodeSelect.emit({ node: selectedNode });
        }
    }
}
