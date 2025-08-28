import React from 'react';
import { JoinDealerSectionContent } from '@/types/section-content';

interface JoinDealerSectionEditorProps {
    content: JoinDealerSectionContent;
    onChange: (content: JoinDealerSectionContent) => void;
}

const JoinDealerSectionEditor: React.FC<JoinDealerSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof JoinDealerSectionContent>(
        field: K,
        value: JoinDealerSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="label">Button Link</label>
                <input
                    type="text"
                    value={content?.buttonLink || ''}
                    onChange={(e) => updateContent('buttonLink', e.target.value)}
                    className="input"
                    placeholder="e.g., /dealer-application"
                />
            </div>

            <div>
                <label className="label">Button Text</label>
                <input
                    type="text"
                    value={content?.buttonText || ''}
                    onChange={(e) => updateContent('buttonText', e.target.value)}
                    className="input"
                    placeholder="e.g., APPLY NOW"
                />
            </div>
        </div>
    );
};

export default JoinDealerSectionEditor;