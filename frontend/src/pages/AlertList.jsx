import { useState, useEffect } from 'react';
import { Container, Button, Card, Badge, Alert, Table } from 'react-bootstrap';
import { alertService } from '../services/alertService';
import { medicationService } from '../services/medicationService';
import LoadingSpinner from '../components/common/LoadingSpinner';

function AlertList({ user, onNavigate }) {
  const [alerts, setAlerts] = useState([]);
  const [medications, setMedications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadAlerts();
  }, [user]);

  const loadAlerts = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const [alertsData, medsData] = await Promise.all([
        alertService.getUserAlerts(user.userId),
        medicationService.getUserMedications(user.userId),
      ]);

      setAlerts(alertsData);
      // Create a map of medicationId -> medication name
      const medsMap = {};
      medsData.forEach(med => {
        medsMap[med.medicationId] = med.name;
      });
      setMedications(medsMap);
    } catch (err) {
      setError(err.message || 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (alertId) => {
    if (!window.confirm('Are you sure you want to delete this alert?')) {
      return;
    }

    try {
      await alertService.deleteAlert(alertId);
      setSuccess('Alert deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      loadAlerts();
    } catch (err) {
      setError(err.message || 'Failed to delete alert');
    }
  };

  const getSeverityBadge = (severity, isCritical) => {
    if (isCritical || severity === 'critical') {
      return <Badge bg="danger">Critical</Badge>;
    }
    if (severity === 'high') {
      return <Badge bg="warning" text="dark">High</Badge>;
    }
    if (severity === 'moderate') {
      return <Badge bg="info">Moderate</Badge>;
    }
    return <Badge bg="secondary">Low</Badge>;
  };

  if (loading) {
    return (
      <Container className="alert-list-container mt-5">
        <LoadingSpinner label="Loading alerts..." />
      </Container>
    );
  }

  return (
    <Container className="alert-list-container">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      <div className="alert-list-header mb-4">
        <div>
          <h1 className="alert-list-title">Interaction Alerts</h1>
          <p className="alert-list-count">
            {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'} active
          </p>
        </div>
        {alerts.length > 0 && (
          <Button variant="primary" size="lg" onClick={() => onNavigate('add-alert')}>
            + Add Alert
          </Button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <p className="empty-state-text">No interaction alerts</p>
          <p className="text-muted mb-3">Create alerts to track potential medication interactions</p>
          <Button variant="primary" onClick={() => onNavigate('add-alert')}>
            Create Your First Alert
          </Button>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Medication 1</th>
                  <th>Medication 2</th>
                  <th>Alert Message</th>
                  <th>Severity</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map(alert => (
                  <tr key={alert.alertId}>
                    <td>
                      <strong>{medications[alert.medication1Id] || `Medication #${alert.medication1Id}`}</strong>
                    </td>
                    <td>
                      <strong>{medications[alert.medication2Id] || `Medication #${alert.medication2Id}`}</strong>
                    </td>
                    <td>{alert.alertMessage}</td>
                    <td>{getSeverityBadge(alert.severity, alert.isCritical)}</td>
                    <td>
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onNavigate(`edit-alert-${alert.alertId}`)}
                        className="me-2"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(alert.alertId)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default AlertList;

