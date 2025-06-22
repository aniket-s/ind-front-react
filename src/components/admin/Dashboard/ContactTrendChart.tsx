// src/components/admin/Dashboard/ContactTrendChart.tsx
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface ContactTrendChartProps {
    data: Array<{
        date: string;
        count: number;
    }>;
}

const ContactTrendChart: React.FC<ContactTrendChartProps> = ({ data }) => {
    const formattedData = data.map(item => ({
        ...item,
        date: format(new Date(item.date), 'MMM dd'),
    }));

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Contact Trend</h3>
            </div>
            <div className="card-body">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: '#3b82f6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ContactTrendChart;
