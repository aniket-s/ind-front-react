import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import { FAQSectionContent, FAQCategory, FAQItem } from '@/types/section-content';

interface FAQSectionEditorProps {
    content: FAQSectionContent;
    onChange: (content: FAQSectionContent) => void;
}

const FAQSectionEditor: React.FC<FAQSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof FAQSectionContent>(
        field: K,
        value: FAQSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const categories = content?.categories || [];
    const faqs = content?.faqs || [];

    return (
        <div className="space-y-6">
            <ArrayFieldEditor<FAQCategory>
                label="FAQ Categories"
                items={categories}
                onAdd={() => {
                    updateContent('categories', [
                        ...categories,
                        { id: `cat-${Date.now()}`, label: '' },
                    ]);
                }}
                onRemove={(index) => {
                    const newCategories = categories.filter((_, i) => i !== index);
                    updateContent('categories', newCategories);
                }}
                onUpdate={(index, value) => {
                    const newCategories = [...categories];
                    newCategories[index] = value;
                    updateContent('categories', newCategories);
                }}
                renderItem={(item, index, onChange) => (
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={item.id || ''}
                            onChange={(e) => onChange({ ...item, id: e.target.value })}
                            className="input"
                            placeholder="Category ID (e.g., products)"
                        />
                        <input
                            type="text"
                            value={item.label || ''}
                            onChange={(e) => onChange({ ...item, label: e.target.value })}
                            className="input"
                            placeholder="Category Label"
                        />
                    </div>
                )}
                addButtonText="Add Category"
            />

            <ArrayFieldEditor<FAQItem>
                label="FAQ Items"
                items={faqs}
                onAdd={() => {
                    updateContent('faqs', [
                        ...faqs,
                        { category: '', question: '', answer: '' },
                    ]);
                }}
                onRemove={(index) => {
                    const newFaqs = faqs.filter((_, i) => i !== index);
                    updateContent('faqs', newFaqs);
                }}
                onUpdate={(index, value) => {
                    const newFaqs = [...faqs];
                    newFaqs[index] = value;
                    updateContent('faqs', newFaqs);
                }}
                onReorder={(newFaqs) => updateContent('faqs', newFaqs)}
                renderItem={(item, index, onChange) => (
                    <div className="space-y-3">
                        <div>
                            <label className="label">Category</label>
                            <select
                                value={item.category || ''}
                                onChange={(e) => onChange({ ...item, category: e.target.value })}
                                className="input"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Question</label>
                            <input
                                type="text"
                                value={item.question || ''}
                                onChange={(e) => onChange({ ...item, question: e.target.value })}
                                className="input"
                                placeholder="FAQ question"
                            />
                        </div>
                        <div>
                            <label className="label">Answer</label>
                            <textarea
                                value={item.answer || ''}
                                onChange={(e) => onChange({ ...item, answer: e.target.value })}
                                className="input"
                                rows={3}
                                placeholder="FAQ answer"
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add FAQ"
            />
        </div>
    );
};

export default FAQSectionEditor;