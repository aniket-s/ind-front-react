import React from 'react';
import { PlusIcon, TrashIcon, Bars3Icon } from '@heroicons/react/24/outline';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ArrayFieldEditorProps<T> {
    label: string;
    items: T[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, value: T) => void;
    onReorder?: (items: T[]) => void;
    renderItem: (item: T, index: number, onChange: (value: T) => void) => React.ReactNode;
    addButtonText?: string;
}

interface SortableItemProps {
    id: string;
    index: number;
    onRemove: () => void;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, onRemove, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white border rounded-lg p-4 ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="flex items-start gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-move mt-1"
                >
                    <Bars3Icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">{children}</div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-900 mt-1"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

function ArrayFieldEditor<T>({
                                 label,
                                 items,
                                 onAdd,
                                 onRemove,
                                 onUpdate,
                                 onReorder,
                                 renderItem,
                                 addButtonText = 'Add Item',
                             }: ArrayFieldEditorProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id && onReorder) {
            const oldIndex = items.findIndex((_, i) => `item-${i}` === active.id);
            const newIndex = items.findIndex((_, i) => `item-${i}` === over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            onReorder(newItems);
        }
    };

    const itemsWithIds = items.map((_, index) => `item-${index}`);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="label">{label}</label>
                <button
                    type="button"
                    onClick={onAdd}
                    className="btn btn-outline btn-sm"
                >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    {addButtonText}
                </button>
            </div>

            {items.length > 0 ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={itemsWithIds}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <SortableItem
                                    key={`item-${index}`}
                                    id={`item-${index}`}
                                    index={index}
                                    onRemove={() => onRemove(index)}
                                >
                                    {renderItem(item, index, (value) => onUpdate(index, value))}
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm">No items added yet</p>
                </div>
            )}
        </div>
    );
}

export default ArrayFieldEditor;