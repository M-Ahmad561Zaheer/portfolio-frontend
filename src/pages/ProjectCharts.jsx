import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'; // Removed defs and linearGradient from here

const ProjectCharts = ({ items }) => {
  const data = [
    { name: 'Jan', projects: 4 },
    { name: 'Feb', projects: 7 },
    { name: 'Mar', projects: 5 },
    { name: 'Apr', projects: 12 },
    { name: 'May', projects: 9 },
    { name: 'Jun', projects: 15 },
  ];

  return (
    <div className="bg-[#0b1120]/40 border border-white/5 p-8 rounded-[3rem] mb-12 backdrop-blur-md">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest text-white">Development Velocity</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Analytics</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* These are standard SVG tags, no import needed */}
            <defs>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#020617', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                fontSize: '10px',
                color: '#fff'
              }}
            />
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#475569', fontSize: 10, fontWeight: 800}}
                dy={10}
            />
            <YAxis hide />
            
            <Area 
                type="monotone" 
                dataKey="projects" 
                stroke="#06b6d4" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorProjects)" 
                animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectCharts;