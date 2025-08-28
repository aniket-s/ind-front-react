import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import IconPicker from '../fields/IconPicker';
import { DealerLocatorSectionContent, DealerStat } from '@/types/section-content';

interface DealerLocatorSectionEditorProps {
    content: DealerLocatorSectionContent;
    onChange: (content: DealerLocatorSectionContent) => void;
}

const DealerLocatorSectionEditor: React.FC<DealerLocatorSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof DealerLocatorSectionContent>(
        field: K,
        value: DealerLocatorSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const stats = content?.stats || [];

    return (
        <div className="space-y-6">
            <div>
                <label className="label">Search Placeholder</label>
                <input
                    type="text"
                    value={content?.placeholder || ''}
                    onChange={(e) => updateContent('placeholder', e.target.value)}
                    className="input"
                    placeholder="e.g., Enter Pin Code To Locate Nearby Dealer"
                />
            </div>

            <div>
                <label className="label">Button Text</label>
                <input
                    type="text"
                    value={content?.buttonText || ''}
                    onChange={(e) => updateContent('buttonText', e.target.value)}
                    className="input"
                    placeholder="e.g., FIND DEALER"
                />
            </div>

            <ArrayFieldEditor<DealerStat>
                label="Statistics"
                items={stats}
                onAdd={() => {
                    updateContent('stats', [
                        ...stats,
                        { icon: 'fas fa-handshake', value: '', label: '' },
                    ]);
                }}
                onRemove={(index) => {
                    const newStats = stats.filter((_, i) => i !== index);
                    updateContent('stats', newStats);
                }}
                onUpdate={(index, value) => {
                    const newStats = [...stats];
                    newStats[index] = value;
                    updateContent('stats', newStats);
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
                                value={item.value || ''}
                                onChange={(e) => onChange({ ...item, value: e.target.value })}
                                className="input"
                                placeholder="e.g., 3000+"
                            />
                            <input
                                type="text"
                                value={item.label || ''}
                                onChange={(e) => onChange({ ...item, label: e.target.value })}
                                className="input"
                                placeholder="e.g., Dealers & Distributors"
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add Statistic"
            />
        </div>
    );
};

export default DealerLocatorSectionEditor;