import { Card } from 'react-bootstrap';

function StatsCard({ icon, label, value, trend, color = '#1e3c72', subtitle }) {
  return (
    <Card className="stat-card">
      <div className="stat-card-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-card-content">
        <div className="stat-number" style={{ color }}>
          {value}
        </div>
        <div className="stat-label">{label}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
        {trend && (
          <div className={`stat-trend ${trend.direction}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatsCard;
