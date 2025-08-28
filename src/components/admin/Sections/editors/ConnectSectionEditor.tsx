import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import IconPicker from '../fields/IconPicker';
import {
    ConnectSectionContent,
    ConnectTab,
    ConnectPost
} from '@/types/section-content';

interface ConnectSectionEditorProps {
    content: ConnectSectionContent;
    onChange: (content: ConnectSectionContent) => void;
}

const ConnectSectionEditor: React.FC<ConnectSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof ConnectSectionContent>(
        field: K,
        value: ConnectSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const tabs = content?.tabs || [];
    const posts = content?.posts || [];

    return (
        <div className="space-y-6">
            <div>
                <label className="label">View More Text</label>
                <input
                    type="text"
                    value={content?.viewMoreText || ''}
                    onChange={(e) => updateContent('viewMoreText', e.target.value)}
                    className="input"
                    placeholder="e.g., View More Post"
                />
            </div>

            <ArrayFieldEditor<ConnectTab>
                label="Social Media Tabs"
                items={tabs}
                onAdd={() => {
                    updateContent('tabs', [
                        ...tabs,
                        { id: '', label: '', icon: 'fas fa-globe' },
                    ]);
                }}
                onRemove={(index) => {
                    const newTabs = tabs.filter((_, i) => i !== index);
                    updateContent('tabs', newTabs);
                }}
                onUpdate={(index, value) => {
                    const newTabs = [...tabs];
                    newTabs[index] = value;
                    updateContent('tabs', newTabs);
                }}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={item.id || ''}
                                onChange={(e) => onChange({ ...item, id: e.target.value })}
                                className="input"
                                placeholder="Tab ID (e.g., facebook)"
                            />
                            <input
                                type="text"
                                value={item.label || ''}
                                onChange={(e) => onChange({ ...item, label: e.target.value })}
                                className="input"
                                placeholder="Tab Label"
                            />
                        </div>
                        <IconPicker
                            label="Icon"
                            value={item.icon || ''}
                            onChange={(icon) => onChange({ ...item, icon })}
                        />
                    </div>
                )}
                addButtonText="Add Tab"
            />

            <ArrayFieldEditor<ConnectPost>
                label="Social Media Posts"
                items={posts}
                onAdd={() => {
                    updateContent('posts', [
                        ...posts,
                        {
                            platform: 'facebook',
                            icon: 'fab fa-facebook',
                            iconColor: 'text-blue-600',
                            author: 'IndPower India',
                            date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
                            content: '',
                            engagement: { likes: 0, comments: 0, shares: 0 },
                        },
                    ]);
                }}
                onRemove={(index) => {
                    const newPosts = posts.filter((_, i) => i !== index);
                    updateContent('posts', newPosts);
                }}
                onUpdate={(index, value) => {
                    const newPosts = [...posts];
                    newPosts[index] = value;
                    updateContent('posts', newPosts);
                }}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                            <select
                                value={item.platform || ''}
                                onChange={(e) => onChange({ ...item, platform: e.target.value })}
                                className="input"
                            >
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="youtube">YouTube</option>
                            </select>
                            <input
                                type="text"
                                value={item.author || ''}
                                onChange={(e) => onChange({ ...item, author: e.target.value })}
                                className="input"
                                placeholder="Author"
                            />
                            <input
                                type="text"
                                value={item.date || ''}
                                onChange={(e) => onChange({ ...item, date: e.target.value })}
                                className="input"
                                placeholder="Date"
                            />
                        </div>
                        <textarea
                            value={item.content || ''}
                            onChange={(e) => onChange({ ...item, content: e.target.value })}
                            className="input"
                            rows={2}
                            placeholder="Post content"
                        />
                        <div className="grid grid-cols-3 gap-3">
                            <input
                                type="number"
                                value={item.engagement?.likes || 0}
                                onChange={(e) => onChange({
                                    ...item,
                                    engagement: { ...item.engagement, likes: parseInt(e.target.value) || 0 }
                                })}
                                className="input"
                                placeholder="Likes"
                            />
                            <input
                                type="number"
                                value={item.engagement?.comments || 0}
                                onChange={(e) => onChange({
                                    ...item,
                                    engagement: { ...item.engagement, comments: parseInt(e.target.value) || 0 }
                                })}
                                className="input"
                                placeholder="Comments"
                            />
                            <input
                                type="number"
                                value={item.engagement?.shares || item.engagement?.saves || 0}
                                onChange={(e) => onChange({
                                    ...item,
                                    engagement: { ...item.engagement, shares: parseInt(e.target.value) || 0 }
                                })}
                                className="input"
                                placeholder="Shares/Saves"
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add Post"
            />
        </div>
    );
};

export default ConnectSectionEditor;