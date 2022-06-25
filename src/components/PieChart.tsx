import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';

type Props = {
    data: {
        name: string,
        value: number,
        color: string
    }[],
    radius: number
}

export default function ChartPie({ data, radius }: Props) {
    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={radius}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={data[index].color} />
                    ))}
                    <LabelList dataKey="name" position="top" />
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}
