import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import IconPicker from '../fields/IconPicker';
import { StillHaveQuestionsSectionContent, ContactOption } from '@/types/section-content';

interface StillHaveQuestionsSectionEditorProps {
    content: StillHaveQuestionsSectionContent;
    onChange: (content: StillHaveQuestionsSectionContent) => void;
}

const StillHaveQuestionsSectionEditor: React.FC<StillHaveQuestionsSectionEditorProps> = ({ content, onChange }) => {
    const contactOptions = content?.contactOptions || [];

    const updateContent = <K extends keyof StillHaveQuestionsSectionContent>(
        field: K,
        value: StillHaveQuestionsSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <ArrayFieldEditor<ContactOption>
            label="Contact Options"
            items={contactOptions}
            onAdd={() => {
                updateContent('contactOptions', [
                    ...contactOptions,
                    { icon: 'fas fa-comments', text: '', style: 'primary' },
                ]);
            }}
            onRemove={(index) => {
                const newOptions = contactOptions.filter((_, i) => i !== index);
                updateContent('contactOptions', newOptions);
            }}
            onUpdate={(index, value) => {
                const newOptions = [...contactOptions];
                newOptions[index] = value;
                updateContent('contactOptions', newOptions);
            }}
            renderItem={(item, index, onChange) => (
                <div className="space-y-3">
                    <IconPicker
                        label="Icon"
                        value={item.icon || ''}
                        onChange={(icon) => onChange({ ...item, icon })}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={item.text || ''}
                            onChange={(e) => onChange({ ...item, text: e.target.value })}
                            className="input"
                            placeholder="Button Text"
                        />
                        <select
                            value={item.style || ''}
                            onChange={(e) => onChange({
                                ...item,
                                style: e.target.value as ContactOption['style']
                            })}
                            className="input"
                        >
                            <option value="primary">Primary (White)</option>
                            <option value="outline">Outline</option>
                            <option value="accent">Accent (Yellow)</option>
                        </select>
                    </div>
                </div>
            )}
            addButtonText="Add Contact Option"
        />
    );
};

export default StillHaveQuestionsSectionEditor;