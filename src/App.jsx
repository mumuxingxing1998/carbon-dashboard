import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine, PieChart, Pie
} from "recharts";
import {
    TrendingUp, TrendingDown, Droplets, PieChart as PieChartIcon, BarChart2, Leaf, AlertTriangle
} from "lucide-react";

// --- 数据源 ---
// 这是提供的项目原始数据。
const rawData = [
    { "项目名称": "上海市浦东新区进才实验中学南校", "初始垃圾处理量(吨)": 3.666666667, "项目-总排放(kg CO₂e)": 671.950496, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 3.103232, "项目-堆肥直接排放(kg CO₂e)": 668.58, "项目-总收益(kg CO₂e)": 370.6522573, "项目-替代化肥收益(kg CO₂e)": 278.893924, "项目-土壤固碳收益(kg CO₂e)": 91.75833333 },
    { "项目名称": "舟山市普陀区青浜海岛环保公益发展中心", "初始垃圾处理量(吨)": 5.5, "项目-总排放(kg CO₂e)": 739.50627, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 4.654848, "项目-堆肥直接排放(kg CO₂e)": 734.584158, "项目-总收益(kg CO₂e)": 1426.759819, "项目-替代化肥收益(kg CO₂e)": 1208.506069, "项目-土壤固碳收益(kg CO₂e)": 218.25375 },
    { "项目名称": "府城社区绿色环保队", "初始垃圾处理量(吨)": 5, "项目-总排放(kg CO₂e)": 5511.370794, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 4.23168, "项目-堆肥直接排放(kg CO₂e)": 5506.87185, "项目-总收益(kg CO₂e)": 663.2576372, "项目-替代化肥收益(kg CO₂e)": 538.1326372, "项目-土壤固碳收益(kg CO₂e)": 125.125 },
    { "项目名称": "宁波市奉化区大堰镇箭岭村低值", "初始垃圾处理量(吨)": 27.5, "项目-总排放(kg CO₂e)": 30347.2415, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 23.27424, "项目-堆肥直接排放(kg CO₂e)": 30323.7, "项目-总收益(kg CO₂e)": 9419.285766, "项目-替代化肥收益(kg CO₂e)": 8328.017016, "项目-土壤固碳收益(kg CO₂e)": 1091.26875 },
    { "项目名称": "宁波市奉化区大堰镇箭岭村", "初始垃圾处理量(吨)": 27.5, "项目-总排放(kg CO₂e)": 30347.2415, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 23.27424, "项目-堆肥直接排放(kg CO₂e)": 30323.7, "项目-总收益(kg CO₂e)": 6770.150569, "项目-替代化肥收益(kg CO₂e)": 5678.881819, "项目-土壤固碳收益(kg CO₂e)": 1091.26875 },
    { "项目名称": "宜昌市夷陵区爱邻环保公益服务中心", "初始垃圾处理量(吨)": 5.666666667, "项目-总排放(kg CO₂e)": 645.934778, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 4.795904, "项目-堆肥直接排放(kg CO₂e)": 640.87161, "项目-总收益(kg CO₂e)": 344.7662856, "项目-替代化肥收益(kg CO₂e)": 202.9579522, "项目-土壤固碳收益(kg CO₂e)": 141.8083333 },
    { "项目名称": "创智农园低值", "初始垃圾处理量(吨)": 3.3, "项目-总排放(kg CO₂e)": 5461.456259, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 2.7929088, "项目-堆肥直接排放(kg CO₂e)": 5458.396086, "项目-总收益(kg CO₂e)": 601.3114283, "项目-替代化肥收益(kg CO₂e)": 470.3591783, "项目-土壤固碳收益(kg CO₂e)": 130.95225 },
    { "项目名称": "创智农园", "初始垃圾处理量(吨)": 3.3, "项目-总排放(kg CO₂e)": 5461.456259, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 2.7929088, "项目-堆肥直接排放(kg CO₂e)": 5458.396086, "项目-总收益(kg CO₂e)": 459.995741, "项目-替代化肥收益(kg CO₂e)": 329.043491, "项目-土壤固碳收益(kg CO₂e)": 130.95225 },
    { "项目名称": "江山赋社区居委会", "初始垃圾处理量(吨)": 22, "项目-总排放(kg CO₂e)": 23917.48666, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 18.619392, "项目-堆肥直接排放(kg CO₂e)": 23898.6, "项目-总收益(kg CO₂e)": 4064.504289, "项目-替代化肥收益(kg CO₂e)": 3191.489289, "项目-土壤固碳收益(kg CO₂e)": 873.015 },
    { "项目名称": "北海中安止泊园", "初始垃圾处理量(吨)": 21, "项目-总排放(kg CO₂e)": 22830.34032, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 17.773056, "项目-堆肥直接排放(kg CO₂e)": 22812.3, "项目-总收益(kg CO₂e)": 1888.340653, "项目-替代化肥收益(kg CO₂e)": 1362.815653, "项目-土壤固碳收益(kg CO₂e)": 525.525 },
    { "项目名称": "涠洲岛低值", "初始垃圾处理量(吨)": 300, "项目-总排放(kg CO₂e)": 326144.1681, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 253.9008, "项目-堆肥直接排放(kg CO₂e)": 325890, "项目-总收益(kg CO₂e)": 8431.205621, "项目-替代化肥收益(kg CO₂e)": 1996.205621, "项目-土壤固碳收益(kg CO₂e)": 6435 },
    { "项目名称": "涠洲岛", "初始垃圾处理量(吨)": 300, "项目-总排放(kg CO₂e)": 326144.1681, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 253.9008, "项目-堆肥直接排放(kg CO₂e)": 325890, "项目-总收益(kg CO₂e)": 10936.49495, "项目-替代化肥收益(kg CO₂e)": 4501.494951, "项目-土壤固碳收益(kg CO₂e)": 6435 },
    { "项目名称": "北京市大兴区清源绿色生活社区服务发展中心", "初始垃圾处理量(吨)": 2.75, "项目-总排放(kg CO₂e)": 2989.919688, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 2.327424, "项目-堆肥直接排放(kg CO₂e)": 2987.325, "项目-总收益(kg CO₂e)": 509.8179782, "项目-替代化肥收益(kg CO₂e)": 400.6911032, "项目-土壤固碳收益(kg CO₂e)": 109.126875 },
    { "项目名称": "湖北恩施学院", "初始垃圾处理量(吨)": 12, "项目-总排放(kg CO₂e)": 12947.7433, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 10.156032, "项目-堆肥直接排放(kg CO₂e)": 12937.32, "项目-总收益(kg CO₂e)": 809.4077887, "项目-替代化肥收益(kg CO₂e)": 552.0077887, "项目-土壤固碳收益(kg CO₂e)": 257.4 },
    { "项目名称": "天津市津南区绿屏青少年自然体验服务中心", "初始垃圾处理量(吨)": 3.3, "项目-总排放(kg CO₂e)": 3587.850173, "项目-运输排放(kg CO₂e)": 0.267264, "项目-运营排放(kg CO₂e)": 2.7929088, "项目-堆肥直接排放(kg CO₂e)": 3584.79, "项目-总收益(kg CO₂e)": 261.0857967, "项目-替代化肥收益(kg CO₂e)": 154.9082967, "项目-土壤固碳收益(kg CO₂e)": 106.1775 }
];

// --- 数据处理 ---
// 将原始数据转换为更适合图表的格式。
const processedData = rawData.map(item => ({
    name: item['项目名称'],
    processedAmount: item['初始垃圾处理量(吨)'],
    totalEmissions: item['项目-总排放(kg CO₂e)'],
    transportEmissions: item['项目-运输排放(kg CO₂e)'],
    operationEmissions: item['项目-运营排放(kg CO₂e)'],
    compostEmissions: item['项目-堆肥直接排放(kg CO₂e)'],
    totalBenefits: item['项目-总收益(kg CO₂e)'],
    fertilizerBenefits: item['项目-替代化肥收益(kg CO₂e)'],
    soilBenefits: item['项目-土壤固碳收益(kg CO₂e)'],
    netImpact: item['项目-总收益(kg CO₂e)'] - item['项目-总排放(kg CO₂e)'],
}));


// --- 可复用组件 ---

// 统一样式的卡片组件。
const Card = ({ children, className = '' }) => (
    <div className={`bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm transition-shadow hover:shadow-md ${className}`}>
        {children}
    </div>
);

// 用于显示关键指标的摘要卡片。
const SummaryCard = ({ title, value, unit, icon, colorClass }) => (
    <Card>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-semibold text-gray-500">{title}</h3>
            <div className={`p-2 rounded-full ${colorClass.bg}`}>{icon}</div>
        </div>
        <div className="flex items-baseline space-x-2">
            <p className={`text-3xl md:text-4xl font-bold ${colorClass.text}`}>{value}</p>
            <span className={`text-lg font-medium ${colorClass.text} opacity-80`}>{unit}</span>
        </div>
    </Card>
);

// 主条形图的自定义工具提示。
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
                <p className="font-bold text-gray-900 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={`item-${index}`} style={{ color: entry.color }} className="font-semibold">
                        {`${entry.name}: ${entry.value.toFixed(2)} kg CO₂e`}
                    </p>
                ))}
                {payload[0]?.payload.processedAmount && (
                    <p className="text-gray-500 mt-1">
                        {`处理量: ${payload[0].payload.processedAmount.toFixed(2)} 吨`}
                    </p>
                )}
            </div>
        );
    }
    return null;
};

// 瀑布图的自定义工具提示。
const WaterfallTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const changeValue = data.labelValue;
        if (payload[0].dataKey === 'invisible') return null;
        return (
            <div className="bg-white/80 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
                <p className="font-bold text-gray-900">{data.name}</p>
                <p className={`font-semibold ${changeValue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {`变化量: ${changeValue.toFixed(2)} kg CO₂e`}
                </p>
            </div>
        );
    }
    return null;
};

// --- 主应用组件 ---
function App() {
    // 当前选定项目的状态
    const [selectedProject, setSelectedProject] = useState(null);
    // 瀑布图数据的状态
    const [waterfallData, setWaterfallData] = useState([]);

    // 当选定项目时，更新瀑布图数据的 Effect
    useEffect(() => {
        if (selectedProject) {
            const data = [];
            // 首先将总排放量作为负向变化
            data.push({ name: '总排放', change: -selectedProject.totalEmissions });
            // 然后将总收益作为正向变化
            data.push({ name: '总收益', change: selectedProject.totalBenefits });
            // 最后一栏是净影响
            data.push({ name: '净影响', isTotal: true, value: selectedProject.netImpact });

            let cumulative = 0;
            const chartData = data.map(item => {
                if (item.isTotal) {
                    return {
                        name: item.name,
                        invisible: 0,
                        visible: item.value,
                        color: item.value > 0 ? '#16a34a' : '#dc2626', // 对净影响使用更醒目的颜色
                        labelValue: item.value
                    };
                }
                const isNegative = item.change < 0;
                const start = cumulative;
                cumulative += item.change;
                return {
                    name: item.name,
                    invisible: isNegative ? cumulative : start,
                    visible: Math.abs(item.change),
                    color: isNegative ? '#f87171' : '#4ade80', // 红色代表排放，绿色代表收益
                    labelValue: item.change
                };
            });
            setWaterfallData(chartData);
        }
    }, [selectedProject]);

    // 主图表条形图的点击处理函数
    const handleBarClick = (data) => {
        // 切换选择：如果点击同一个项目，则取消选择。
        if (selectedProject && selectedProject.name === data.name) {
            setSelectedProject(null);
        } else {
            setSelectedProject(data);
        }
    };

    // 计算总体摘要指标
    const totalEmissionsOverall = processedData.reduce((sum, item) => sum + item.totalEmissions, 0);
    const totalBenefitsOverall = processedData.reduce((sum, item) => sum + item.totalBenefits, 0);
    const netImpactOverall = totalBenefitsOverall - totalEmissionsOverall;

    // 根据选定项目准备饼图数据
    const emissionBreakdown = selectedProject ? [
        { name: '运输排放', value: selectedProject.transportEmissions },
        { name: '运营排放', value: selectedProject.operationEmissions },
        { name: '堆肥排放', value: selectedProject.compostEmissions }
    ] : [];
    const benefitBreakdown = selectedProject ? [
        { name: '替代化肥', value: selectedProject.fertilizerBenefits },
        { name: '土壤固碳', value: selectedProject.soilBenefits }
    ] : [];

    // 定义饼图颜色
    const PIE_COLORS_EMISSION = ['#f87171', '#fb923c', '#facc15']; // 红色和橙色系
    const PIE_COLORS_BENEFIT = ['#4ade80', '#a3e635']; // 绿色系

    return (
        <>
            {/* 注入动画和图表刻度的自定义样式 */}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                .recharts-text.recharts-cartesian-axis-tick-value { font-size: 12px; }
            `}</style>

            <div className="bg-gray-50 font-sans text-gray-800 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-screen-xl mx-auto">
                    {/* --- 顶部标题区域 --- */}
                    <header className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">垃圾处理项目碳足迹分析看板</h1>
                        <p className="text-md text-gray-600">基于您提供的数据，对各项目的碳排放与碳收益进行交互式可视化分析。</p>
                    </header>

                    {/* --- 总体摘要卡片 --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <SummaryCard
                            title="总排放量"
                            value={(totalEmissionsOverall / 1000).toFixed(2)}
                            unit="吨 CO₂e"
                            icon={<AlertTriangle className="w-6 h-6 text-red-600"/>}
                            colorClass={{ bg: 'bg-red-100', text: 'text-red-600' }}
                        />
                        <SummaryCard
                            title="总收益量"
                            value={(totalBenefitsOverall / 1000).toFixed(2)}
                            unit="吨 CO₂e"
                            icon={<Leaf className="w-6 h-6 text-green-600"/>}
                            colorClass={{ bg: 'bg-green-100', text: 'text-green-600' }}
                        />
                        <SummaryCard
                            title="净碳影响"
                            value={`${netImpactOverall > 0 ? '+' : ''}${(netImpactOverall / 1000).toFixed(2)}`}
                            unit="吨 CO₂e"
                            icon={netImpactOverall > 0 ? <TrendingUp className="w-6 h-6 text-indigo-600" /> : <TrendingDown className="w-6 h-6 text-indigo-600" />}
                            colorClass={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }}
                        />
                    </div>

                    {/* --- 主要内容区域 --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* --- 主要图表区域 (左侧) --- */}
                        <main className="lg:col-span-3 space-y-8">
                            <Card>
                                <h2 className="text-xl font-bold mb-1">各项目净碳影响 (收益 - 排放)</h2>
                                <p className="text-sm text-gray-500 mb-4">正值表示碳正效益，负值反之。点击柱状图查看详情。</p>
                                <div className="h-96 -ml-4">
                                    <ResponsiveContainer>
                                        <BarChart data={processedData} margin={{ top: 5, right: 10, left: 10, bottom: 80 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={10} dy={10} />
                                            <YAxis unit="kg" allowDecimals={false} label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'} }} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }} />
                                            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                                            <ReferenceLine y={0} stroke="#6b7280" strokeWidth={1} />
                                            <Bar dataKey="netImpact" name="净碳影响" onClick={handleBarClick}>
                                                {processedData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`}
                                                          fill={entry.netImpact > 0 ? '#4ade80' : '#f87171'}
                                                          stroke={selectedProject && selectedProject.name === entry.name ? '#4f46e5' : 'none'}
                                                          strokeWidth={4} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* 瀑布图, 选择项目后出现 */}
                            {selectedProject && (
                                <Card className="animate-fade-in">
                                    <h2 className="text-xl font-bold mb-1 flex items-center">
                                        <Droplets className="w-6 h-6 mr-2 text-indigo-500" />
                                        {`净影响瀑布图: ${selectedProject.name}`}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4">展示“排放”和“收益”如何构成最终的“净影响”。</p>
                                    <div className="h-80 -ml-4">
                                        <ResponsiveContainer>
                                            <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis type="category" dataKey="name" />
                                                <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
                                                <Tooltip content={<WaterfallTooltip />} />
                                                <Bar dataKey="invisible" stackId="a" fill="transparent" />
                                                <Bar dataKey="visible" stackId="a">
                                                    {waterfallData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            )}
                        </main>

                        {/* --- 详情侧边栏 (右侧) --- */}
                        <aside className="lg:col-span-2">
                            <div className="sticky top-8">
                                <Card className="min-h-[40rem]">
                                    <h2 className="text-xl font-bold mb-4 border-b pb-2">项目详情分析</h2>
                                    {!selectedProject ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 pt-16">
                                            <BarChart2 className="w-20 h-20 mb-4 text-gray-300" />
                                            <p className="font-semibold text-lg">请选择一个项目</p>
                                            <p className="text-sm">在左侧图表中点击一个项目以查看其详细构成。</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-fade-in">
                                            <h3 className="text-lg font-bold text-indigo-600 break-words">{selectedProject.name}</h3>

                                            {/* --- 关键指标 --- */}
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div className="bg-gray-100 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-500 font-semibold">净影响 (kg)</p>
                                                    <p className={`font-bold text-xl ${selectedProject.netImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>{selectedProject.netImpact.toFixed(1)}</p>
                                                </div>
                                                <div className="bg-gray-100 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-500 font-semibold">处理量 (吨)</p>
                                                    <p className="font-bold text-xl text-gray-800">{selectedProject.processedAmount.toFixed(1)}</p>
                                                </div>
                                            </div>

                                            {/* --- 排放构成饼图 --- */}
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center"><PieChartIcon className="w-5 h-5 mr-2 text-red-500" />排放构成</h4>
                                                <div className="h-56 w-full">
                                                    <ResponsiveContainer>
                                                        <PieChart>
                                                            <Pie data={emissionBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                                                                {emissionBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS_EMISSION[index % PIE_COLORS_EMISSION.length]} stroke={PIE_COLORS_EMISSION[index % PIE_COLORS_EMISSION.length]}/>)}
                                                            </Pie>
                                                            <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
                                                            <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '14px', paddingLeft: '20px' }}/>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            {/* --- 收益构成饼图 --- */}
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center"><PieChartIcon className="w-5 h-5 mr-2 text-green-500" />收益构成</h4>
                                                <div className="h-56 w-full">
                                                    <ResponsiveContainer>
                                                        <PieChart>
                                                            <Pie data={benefitBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                                                                {benefitBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS_BENEFIT[index % PIE_COLORS_BENEFIT.length]} stroke={PIE_COLORS_BENEFIT[index % PIE_COLORS_BENEFIT.length]}/>)}
                                                            </Pie>
                                                            <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
                                                            <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '14px', paddingLeft: '20px' }}/>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </aside>
                    </div>

                    {/* --- 原始数据表格 --- */}
                    <div className="mt-8">
                        <Card>
                            <h2 className="text-xl font-bold mb-4">原始数据表</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-600">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-lg">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 rounded-l-lg">项目名称</th>
                                        <th scope="col" className="px-6 py-3">总排放 (kg)</th>
                                        <th scope="col" className="px-6 py-3">总收益 (kg)</th>
                                        <th scope="col" className="px-6 py-3 rounded-r-lg">净影响 (kg)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {processedData.map((item, index) => (
                                        <tr key={index} className={`border-b dark:border-gray-200 hover:bg-gray-50 ${selectedProject?.name === item.name ? 'bg-indigo-50' : ''}`}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</th>
                                            <td className="px-6 py-4 text-red-500 font-medium">{item.totalEmissions.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-green-500 font-medium">{item.totalBenefits.toFixed(2)}</td>
                                            <td className={`px-6 py-4 font-bold ${item.netImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.netImpact.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
