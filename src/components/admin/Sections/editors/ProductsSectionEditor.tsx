import React from 'react';
import ArrayFieldEditor from '../fields/ArrayFieldEditor';
import MediaSelector from '../fields/MediaSelector';
import {
    ProductsSectionContent,
    ProductCategory,
    ProductDetails
} from '@/types/section-content';

interface ProductsSectionEditorProps {
    content: ProductsSectionContent;
    onChange: (content: ProductsSectionContent) => void;
}

const ProductsSectionEditor: React.FC<ProductsSectionEditorProps> = ({ content, onChange }) => {
    const updateContent = <K extends keyof ProductsSectionContent>(
        field: K,
        value: ProductsSectionContent[K]
    ) => {
        onChange({ ...content, [field]: value });
    };

    const features = content?.features || [];
    const product = content?.product || {} as ProductDetails;
    const categories = content?.categories || [];

    return (
        <div className="space-y-6">
            {/* Product Details */}
            <div className="card bg-gray-50">
                <div className="card-body">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Featured Product</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Category Label</label>
                            <input
                                type="text"
                                value={product.category || ''}
                                onChange={(e) => updateContent('product', { ...product, category: e.target.value })}
                                className="input"
                                placeholder="e.g., INVERTER"
                            />
                        </div>
                        <div>
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                value={product.name || ''}
                                onChange={(e) => updateContent('product', { ...product, name: e.target.value })}
                                className="input"
                                placeholder="e.g., Premium Power Inverter Series"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="label">Description</label>
                        <textarea
                            value={product.description || ''}
                            onChange={(e) => updateContent('product', { ...product, description: e.target.value })}
                            className="input"
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="label">Warranty Text</label>
                            <input
                                type="text"
                                value={product.warranty || ''}
                                onChange={(e) => updateContent('product', { ...product, warranty: e.target.value })}
                                className="input"
                                placeholder="e.g., 36 Months Standard Warranty"
                            />
                        </div>
                        <MediaSelector
                            label="Product Image"
                            value={product.image || ''}
                            onChange={(value) => updateContent('product', { ...product, image: value })}
                            folder="products"
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <ArrayFieldEditor<string>
                label="Product Features"
                items={features}
                onAdd={() => updateContent('features', [...features, ''])}
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
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => onChange(e.target.value)}
                        className="input"
                        placeholder="e.g., Pure Sine Wave Output"
                    />
                )}
                addButtonText="Add Feature"
            />

            {/* Categories */}
            <ArrayFieldEditor<ProductCategory>
                label="Product Categories"
                items={categories}
                onAdd={() => updateContent('categories', [...categories, { name: '', icon: 'fas fa-bolt' }])}
                onRemove={(index) => {
                    const newCategories = categories.filter((_, i) => i !== index);
                    updateContent('categories', newCategories);
                }}
                onUpdate={(index, value) => {
                    const newCategories = [...categories];
                    newCategories[index] = value;
                    updateContent('categories', newCategories);
                }}
                onReorder={(newCategories) => updateContent('categories', newCategories)}
                renderItem={(item, index, onChange) => (
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <input
                                type="text"
                                value={item.name || ''}
                                onChange={(e) => onChange({ ...item, name: e.target.value })}
                                className="input"
                                placeholder="Category Name"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={item.icon || ''}
                                onChange={(e) => onChange({ ...item, icon: e.target.value })}
                                className="input"
                                placeholder="Icon class"
                            />
                        </div>
                    </div>
                )}
                addButtonText="Add Category"
            />
        </div>
    );
};

export default ProductsSectionEditor;