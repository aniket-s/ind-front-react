// src/components/admin/Dashboard/CategoryProductChart.tsx
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface CategoryProductChartProps {
    data: Array<{
        name: string;
        productCount: number;
    }>;
}

const CategoryProductChart: React.FC<CategoryProductChartProps> = ({ data }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Products by Category</h3>
            </div>
            <div className="card-body">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="productCount" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CategoryProductChart;
