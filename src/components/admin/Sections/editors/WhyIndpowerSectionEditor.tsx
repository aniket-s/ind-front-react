import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import IconPicker from '../fields/IconPicker';
import { WhyIndpowerSectionContent, WhyIndpowerFeature } from '@/types/section-content';

interface WhyIndpowerSectionEditorProps {
    content: WhyIndpowerSectionContent;
    onChange: (content: WhyIndpowerSectionContent) => void;
}

const WhyIndpowerSectionEditor: React.FC<WhyIndpowerSectionEditorProps> = ({ content, onChange }) => {
    const features = content?.features || [];

    const updateFeatures = (newFeatures: WhyIndpowerFeature[]) => {
        onChange({ ...content, features: newFeatures });
    };

    return (
        <div>
            <ArrayFieldEditor<WhyIndpowerFeature>
                label="Features"
                items={features}
                onAdd={() => {
                    updateFeatures([
                        ...features,
                        {
                            icon: 'fas fa-users',
                            title: '',
                            description: '',
                        },
                    ]);
                }}
                onRemove={(index) => {
                    const newFeatures = features.filter((_, i) => i !== index);
                    updateFeatures(newFeatures);
                }}
                onUpdate={(index, value) => {
                    const newFeatures = [...features];
                    newFeatures[index] = value;
                    updateFeatures(newFeatures);
                }}
                onReorder={updateFeatures}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <IconPicker
                            label="Icon"
                            value={item.icon || ''}
                            onChange={(icon) => onChange({ ...item, icon })}
                        />
                        <div>
                            <label className="label">Title</label>
                            <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => onChange({ ...item, title: e.target.value })}
                                className="input"
                                placeholder="e.g., Expert Staff"
                            />
                        </div>
                        <div>
                            <label className="label">Description</label>
                            <textarea
                                value={item.description || ''}
                                onChange={(e) => onChange({ ...item, description: e.target.value })}
                                className="input"
                                rows={2}
                                placeholder="Feature description..."
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add Feature"
            />
        </div>
    );
};

export default WhyIndpowerSectionEditor;