import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
    const data = [
        { name: 'A', value: 400 },
        { name: 'B', value: 300 },
        { name: 'C', value: 200 },
    ];
    return (
        <div className="p-8">
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default App;