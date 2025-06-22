// src/components/admin/Menus/MenuTree.tsx
import React, { useState, useCallback } from 'react';
import { Menu } from '@/types';
import {
    PencilIcon,
    TrashIcon,
    Bars3Icon,
    ChevronRightIcon,
    ChevronDownIcon,
    LinkIcon,
    ExternalLinkIcon,
    Bars2Icon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface MenuTreeProps {
    menus: Menu[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isReordering?: boolean;
    onReorder?: (menus: Array<{ id: string; sortOrder: number; parentId?: string | null }>) => void;
}

interface DragItem {
    id: string;
    parentId?: string | null;
    sortOrder: number;
}

const MenuTree: React.FC<MenuTreeProps> = ({
                                               menus,
                                               onEdit,
                                               onDelete,
                                               isReordering = false,
                                               onReorder,
                                           }) => {
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
    const [dragOverItem, setDragOverItem] = useState<string | null>(null);

    const toggleExpand = useCallback((menuId: string) => {
        setExpandedMenus((prev) => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(menuId)) {
                newExpanded.delete(menuId);
            } else {
                newExpanded.add(menuId);
            }
            return newExpanded;
        });
    }, []);

    const handleDragStart = (e: React.DragEvent, menu: Menu, parentId?: string | null) => {
        setDraggedItem({
            id: menu.id,
            parentId,
            sortOrder: menu.sortOrder,
        });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (menuId: string) => {
        setDragOverItem(menuId);
    };

    const handleDragLeave = () => {
        setDragOverItem(null);
    };

    const handleDrop = (e: React.DragEvent, targetMenu: Menu, targetParentId?: string | null) => {
        e.preventDefault();
        setDragOverItem(null);

        if (!draggedItem || !onReorder || draggedItem.id === targetMenu.id) {
            return;
        }

        // Build the new order
        const updates: Array<{ id: string; sortOrder: number; parentId?: string | null }> = [];

        // This is a simplified reorder logic - you might need to adjust based on your needs
        const sourceIndex = menus.findIndex((m) => m.id === draggedItem.id);
        const targetIndex = menus.findIndex((m) => m.id === targetMenu.id);

        if (sourceIndex !== -1 && targetIndex !== -1) {
            const reorderedMenus = [...menus];
            const [removed] = reorderedMenus.splice(sourceIndex, 1);
            reorderedMenus.splice(targetIndex, 0, removed);

            reorderedMenus.forEach((menu, index) => {
                updates.push({
                    id: menu.id,
                    sortOrder: index,
                    parentId: targetParentId,
                });
            });

            onReorder(updates);
        }

        setDraggedItem(null);
    };

    const renderMenu = (menu: Menu, level: number = 0, parentId?: string | null): React.ReactNode => {
        const hasChildren = menu.children && menu.children.length > 0;
        const isExpanded = expandedMenus.has(menu.id);
        const isDraggedOver = dragOverItem === menu.id;

        const typeIcons = {
            internal: LinkIcon,
            external: ExternalLinkIcon,
            dropdown: Bars3Icon,
        };

        const TypeIcon = typeIcons[menu.type];

        return (
            <div key={menu.id} className="border-b last:border-b-0">
                <div
                    className={cn(
                        'flex items-center justify-between p-4 transition-colors',
                        'hover:bg-gray-50',
                        !menu.isActive && 'opacity-50',
                        isDraggedOver && 'bg-blue-50',
                        isReordering && 'cursor-move'
                    )}
                    style={{ paddingLeft: `${(level + 1) * 1}rem` }}
                    draggable={isReordering}
                    onDragStart={(e) => handleDragStart(e, menu, parentId)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(menu.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, menu, parentId)}
                    role="treeitem"
                    aria-expanded={hasChildren ? isExpanded : undefined}
                    aria-level={level + 1}
                >
                    <div className="flex items-center flex-1">
                        {isReordering && (
                            <Bars2Icon className="h-4 w-4 text-gray-400 mr-2" />
                        )}

                        {hasChildren && (
                            <button
                                onClick={() => toggleExpand(menu.id)}
                                className="mr-2 p-1 hover:bg-gray-200 rounded transition-colors"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                type="button"
                            >
                                {isExpanded ? (
                                    <ChevronDownIcon className="h-4 w-4" />
                                ) : (
                                    <ChevronRightIcon className="h-4 w-4" />
                                )}
                            </button>
                        )}

                        {!hasChildren && !isReordering && (
                            <div className="w-8" />
                        )}

                        <TypeIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <span
                                    className={cn(
                                        "text-sm font-medium text-gray-900",
                                        !menu.isActive && "text-gray-500"
                                    )}
                                >
                                    {menu.title}
                                </span>
                                {menu.url && (
                                    <span className="ml-2 text-xs text-gray-500 truncate">
                                        ({menu.url})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                        {!isReordering && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(menu.id);
                                    }}
                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Edit menu item"
                                    aria-label={`Edit ${menu.title}`}
                                    type="button"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm(`Are you sure you want to delete "${menu.title}"?`)) {
                                            onDelete(menu.id);
                                        }
                                    }}
                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                    title="Delete menu item"
                                    aria-label={`Delete ${menu.title}`}
                                    type="button"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="bg-gray-50" role="group">
                        {menu.children!.map((child) => renderMenu(child, level + 1, menu.id))}
                    </div>
                )}
            </div>
        );
    };

    if (menus.length === 0) {
        return (
            <div className="card-body text-center py-8">
                <p className="text-gray-500">No menu items yet</p>
            </div>
        );
    }

    return (
        <div className="divide-y" role="tree">
            {menus.map((menu) => renderMenu(menu))}
        </div>
    );
};

export default MenuTree;