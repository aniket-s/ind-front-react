import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import IconPicker from '../fields/IconPicker';
import {
    ViewDetailsSectionContent,
    ViewDetailsButton,
    ViewDetailsIcon
} from '@/types/section-content';

interface ViewDetailsSectionEditorProps {
    content: ViewDetailsSectionContent;
    onChange: (content: ViewDetailsSectionContent) => void;
}

const ViewDetailsSectionEditor: React.FC<ViewDetailsSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof ViewDetailsSectionContent>(
        field: K,
        value: ViewDetailsSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const buttons = content?.buttons || [];
    const floatingIcons = content?.floatingIcons || [];

    return (
        <div className="space-y-6">
            <ArrayFieldEditor<ViewDetailsButton>
                label="Action Buttons"
                items={buttons}
                onAdd={() => {
                    updateContent('buttons', [
                        ...buttons,
                        { link: '', text: '', style: 'primary', icon: '' },
                    ]);
                }}
                onRemove={(index) => {
                    const newButtons = buttons.filter((_, i) => i !== index);
                    updateContent('buttons', newButtons);
                }}
                onUpdate={(index, value) => {
                    const newButtons = [...buttons];
                    newButtons[index] = value;
                    updateContent('buttons', newButtons);
                }}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={item.text || ''}
                                onChange={(e) => onChange({ ...item, text: e.target.value })}
                                className="input"
                                placeholder="Button Text"
                            />
                            <input
                                type="text"
                                value={item.link || ''}
                                onChange={(e) => onChange({ ...item, link: e.target.value })}
                                className="input"
                                placeholder="Button Link"
                            />
                        </div>
                        <IconPicker
                            label="Icon (optional)"
                            value={item.icon || ''}
                            onChange={(icon) => onChange({ ...item, icon })}
                        />
                    </div>
                )}
                addButtonText="Add Button"
            />

            <ArrayFieldEditor<ViewDetailsIcon>
                label="Floating Icons"
                items={floatingIcons}
                onAdd={() => {
                    updateContent('floatingIcons', [
                        ...floatingIcons,
                        { icon: 'fas fa-bolt', position: 'top-left' },
                    ]);
                }}
                onRemove={(index) => {
                    const newIcons = floatingIcons.filter((_, i) => i !== index);
                    updateContent('floatingIcons', newIcons);
                }}
                onUpdate={(index, value) => {
                    const newIcons = [...floatingIcons];
                    newIcons[index] = value;
                    updateContent('floatingIcons', newIcons);
                }}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <IconPicker
                            label="Icon"
                            value={item.icon || ''}
                            onChange={(icon) => onChange({ ...item, icon })}
                        />
                        <div>
                            <label className="label">Position</label>
                            <select
                                value={item.position || ''}
                                onChange={(e) => onChange({
                                    ...item,
                                    position: e.target.value as ViewDetailsIcon['position']
                                })}
                                className="input"
                            >
                                <option value="top-left">Top Left</option>
                                <option value="top-right">Top Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="bottom-right">Bottom Right</option>
                            </select>
                        </div>
                    </div>
                )}
                addButtonText="Add Floating Icon"
            />
        </div>
    );
};

export default ViewDetailsSectionEditor;