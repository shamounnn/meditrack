import { Card } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MedicationTrendChart({ data = [], title }) {
  if (!data || data.length === 0) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No data available
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="chart-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3c72" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1e3c72" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="pills" 
              stroke="#1e3c72" 
              fillOpacity={1} 
              fill="url(#colorStock)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default MedicationTrendChart;
