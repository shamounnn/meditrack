import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { medicationService } from '../services/medicationService';
import { voiceService } from '../services/voiceService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import VoiceControl from '../components/common/VoiceControl';

function UserDashboard({ user, onNavigate }) {
  const [stats, setStats] = useState({
    totalMeds: 0,
    lowStockCount: 0,
    todayIntakes: 0,
  });
  const [medications, setMedications] = useState([]);
  const [lowStockMeds, setLowStockMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const [medsData, lowStockData] = await Promise.all([
        medicationService.getUserMedications(user.userId),
        medicationService.getLowStockMedications(user.userId),
      ]);

      setMedications(medsData);
      setLowStockMeds(lowStockData);
      setStats(prev => ({
        ...prev,
        totalMeds: medsData.length,
        lowStockCount: lowStockData.length,
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <Container className="dashboard-container">
        <LoadingSpinner label="Loading dashboard..." />
      </Container>
    );
  }

  const handleVoiceCommand = (command) => {
    switch (command.action) {
      case 'list':
        voiceService.speak(`You have ${stats.totalMeds} medications tracked`);
        break;
      case 'help':
        voiceService.speak('You can say: take medication, refill, add medication, or show list');
        break;
      default:
        onNavigate('medications');
    }
  };

  return (
    <Container className="dashboard-container">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <VoiceControl onCommand={handleVoiceCommand} />

      <div className="dashboard-header">
        <h1 className="dashboard-greeting">
          {getGreeting()}, {user.username}!
        </h1>
        <p className="dashboard-time">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Row className="stats-grid mb-4">
        <Col>
          <Card className="stat-card">
            <div className="stat-number">{stats.totalMeds}</div>
            <div className="stat-label">Total Medications</div>
          </Card>
        </Col>
        <Col>
          <Card className="stat-card">
            <div className="stat-number" style={{ color: stats.lowStockCount > 0 ? '#f59e0b' : '#10b981' }}>
              {stats.lowStockCount}
            </div>
            <div className="stat-label">
              {stats.lowStockCount > 0 ? '⚠️ Low Stock Items' : '✓ All Stocked'}
            </div>
          </Card>
        </Col>
      </Row>

      {lowStockMeds.length > 0 && (
        <div className="low-stock-section">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                <span className="text-warning">⚠️</span> Low Stock Medications
              </Card.Title>
              {lowStockMeds.map(med => (
                <div key={med.medicationId} className="low-stock-item">
                  <div>
                    <div className="low-stock-item-name">{med.name}</div>
                    <small className="text-muted">{med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''}</small>
                  </div>
                  <Badge className="badge-warning">{med.currentPills} pills left</Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      )}

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title className="mb-0">Your Medications</Card.Title>
            {medications.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('add-medication')}
              >
                + Add Medication
              </Button>
            )}
          </div>
          {medications.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-state-icon">💊</div>
              <p className="empty-state-text">No medications added yet</p>
              <Button
                variant="primary"
                onClick={() => onNavigate('add-medication')}
              >
                Add Your First Medication
              </Button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Pills Remaining</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.slice(0, 5).map(med => (
                    <tr key={med.medicationId} style={{ cursor: 'pointer' }} onClick={() => onNavigate('medications')}>
                      <td className="text-bold">{med.name}</td>
                      <td>{med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''}</td>
                      <td>
                        <span>{med.currentPills}</span>
                        <span className="text-muted"> / {med.pillsPerBox}</span>
                      </td>
                      <td>
                        {med.currentPills <= med.lowStockThreshold ? (
                          <Badge className="badge-warning">Low Stock</Badge>
                        ) : (
                          <Badge className="badge-success">In Stock</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {medications.length > 5 && (
                <div className="text-center mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onNavigate('medications')}
                  >
                    View All {medications.length} Medications
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDashboard;
