import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import MediaSelector from '../fields/MediaSelector';
import IconPicker from '../fields/IconPicker';
import { AboutSectionContent, AboutFeature } from '@/types/section-content';

interface AboutSectionEditorProps {
    content: AboutSectionContent;
    onChange: (content: AboutSectionContent) => void;
}

const AboutSectionEditor: React.FC<AboutSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof AboutSectionContent>(
        field: K,
        value: AboutSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const features = content?.features || [];

    return (
        <div className="space-y-6">
            <MediaSelector
                label="About Image"
                value={content?.image || ''}
                onChange={(value) => updateContent('image', value)}
                folder="misc"
            />

            <div>
                <label className="label">Button Text</label>
                <input
                    type="text"
                    value={content?.buttonText || ''}
                    onChange={(e) => updateContent('buttonText', e.target.value)}
                    className="input"
                    placeholder="e.g., About Us"
                />
            </div>

            <div>
                <label className="label">Description</label>
                <textarea
                    value={content?.description || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="input"
                    rows={4}
                    placeholder="Company description..."
                />
            </div>

            <ArrayFieldEditor<AboutFeature>
                label="Features"
                items={features}
                onAdd={() => {
                    updateContent('features', [
                        ...features,
                        { icon: 'fas fa-tools', title: '', description: '' },
                    ]);
                }}
                onRemove={(index) => {
                    const newFeatures = features.filter((_, i) => i !== index);
                    updateContent('features', newFeatures);
                }}
                onUpdate={(index, value) => {
                    const newFeatures = [...features];
                    newFeatures[index] = value;
                    updateContent('features', newFeatures);
                }}
                onReorder={(newFeatures) => updateContent('features', newFeatures)}
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
                                value={item.title || ''}
                                onChange={(e) => onChange({ ...item, title: e.target.value })}
                                className="input"
                                placeholder="Feature title"
                            />
                            <input
                                type="text"
                                value={item.description || ''}
                                onChange={(e) => onChange({ ...item, description: e.target.value })}
                                className="input"
                                placeholder="Feature description"
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add Feature"
            />
        </div>
    );
};

export default AboutSectionEditor;