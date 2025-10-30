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

    // Flatten the menu tree to get all menus with their parent relationships
    const flattenMenus = (menuList: Menu[], parentId: string | null = null): Array<{ menu: Menu; parentId: string | null }> => {
        let result: Array<{ menu: Menu; parentId: string | null }> = [];
        menuList.forEach(menu => {
            result.push({ menu, parentId });
            if (menu.children && menu.children.length > 0) {
                result = result.concat(flattenMenus(menu.children, menu.id));
            }
        });
        return result;
    };

    const handleDragStart = (e: React.DragEvent, menu: Menu, parentId?: string | null) => {
        setDraggedItem({
            id: menu.id,
            parentId: parentId || null,
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
        e.stopPropagation();
        setDragOverItem(null);

        if (!draggedItem || !onReorder || draggedItem.id === targetMenu.id) {
            setDraggedItem(null);
            return;
        }

        // Get all menus flattened with their parent relationships
        const flatMenus = flattenMenus(menus);

        // Find dragged and target items
        const draggedMenuData = flatMenus.find(m => m.menu.id === draggedItem.id);
        const targetMenuData = flatMenus.find(m => m.menu.id === targetMenu.id);

        if (!draggedMenuData || !targetMenuData) {
            setDraggedItem(null);
            return;
        }

        // Only allow reordering within the same parent level
        const normalizedTargetParentId = targetParentId === undefined ? null : targetParentId;

        // Get all siblings (menus with same parent)
        const siblings = flatMenus
            .filter(m => (m.parentId || null) === normalizedTargetParentId)
            .map(m => m.menu)
            .sort((a, b) => a.sortOrder - b.sortOrder);

        // Remove dragged item from its current position
        const draggedIndex = siblings.findIndex(m => m.id === draggedItem.id);
        const targetIndex = siblings.findIndex(m => m.id === targetMenu.id);

        if (draggedIndex === -1 || targetIndex === -1) {
            setDraggedItem(null);
            return;
        }

        // Reorder siblings
        const reorderedSiblings = [...siblings];
        const [removed] = reorderedSiblings.splice(draggedIndex, 1);
        reorderedSiblings.splice(targetIndex, 0, removed);

        // Build updates with new sort orders
        const updates = reorderedSiblings.map((menu, index) => ({
            id: menu.id,
            sortOrder: index,
            parentId: normalizedTargetParentId,
        }));

        onReorder(updates);
        setDraggedItem(null);
    };

    const renderMenu = (menu: Menu, level: number = 0, parentId?: string | null): React.ReactNode => {
        const hasChildren = menu.children && menu.children.length > 0;
        const isExpanded = expandedMenus.has(menu.id);
        const isDraggedOver = dragOverItem === menu.id;

        const typeIcons = {
            internal: LinkIcon,
            external: LinkIcon,
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
                        isDraggedOver && isReordering && 'bg-blue-50 border-2 border-blue-300',
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
                            <Bars2Icon className="h-5 w-5 text-gray-400 mr-3" />
                        )}

                        {hasChildren && !isReordering && (
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

                {hasChildren && (isExpanded || isReordering) && (
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