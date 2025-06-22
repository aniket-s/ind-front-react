// src/components/admin/Menus/MenuTree.tsx
import React, { useState } from 'react';
import { Menu } from '@/types';
import {
    PencilIcon,
    TrashIcon,
    Bars3Icon,
    ChevronRightIcon,
    ChevronDownIcon,
    LinkIcon,
    ExternalLinkIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface MenuTreeProps {
    menus: Menu[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isReordering?: boolean;
    onReorder?: (menus: Array<{ id: string; sortOrder: number; parentId?: string | null }>) => void;
}

const MenuTree: React.FC<MenuTreeProps> = ({
                                               menus,
                                               onEdit,
                                               onDelete,
                                               isReordering = false,
                                               onReorder,
                                           }) => {
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

    const toggleExpand = (menuId: string) => {
        const newExpanded = new Set(expandedMenus);
        if (newExpanded.has(menuId)) {
            newExpanded.delete(menuId);
        } else {
            newExpanded.add(menuId);
        }
        setExpandedMenus(newExpanded);
    };

    const renderMenu = (menu: Menu, level: number = 0) => {
        const hasChildren = menu.children && menu.children.length > 0;
        const isExpanded = expandedMenus.has(menu.id);

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
                        'flex items-center justify-between p-4 hover:bg-gray-50',
                        !menu.isActive && 'opacity-50'
                    )}
                    style={{ paddingLeft: `${(level + 1) * 1rem}` }}
                >
                    <div className="flex items-center flex-1">
                        {hasChildren && (
                            <button
                                onClick={() => toggleExpand(menu.id)}
                                className="mr-2 p-1 hover:bg-gray-200 rounded"
                            >
                                {isExpanded ? (
                                    <ChevronDownIcon className="h-4 w-4" />
                                ) : (
                                    <ChevronRightIcon className="h-4 w-4" />
                                )}
                            </button>
                        )}

                        <TypeIcon className="h-4 w-4 text-gray-400 mr-2" />

                        <div className="flex-1">
                            <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {menu.title}
                </span>
                                {menu.url && (
                                    <span className="ml-2 text-xs text-gray-500">
                    ({menu.url})
                  </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {!isReordering && (
                            <>
                                <button
                                    onClick={() => onEdit(menu.id)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                    title="Edit"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(menu.id)}
                                    className="p-1 text-red-400 hover:text-red-600"
                                    title="Delete"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="bg-gray-50">
                        {menu.children!.map((child) => renderMenu(child, level + 1))}
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
        <div className="divide-y">
            {menus.map((menu) => renderMenu(menu))}
        </div>
    );
};

export default MenuTree;
