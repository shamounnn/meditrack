import { useState, useEffect } from 'react';
import { Container, Button, Card, Badge, Alert, Table } from 'react-bootstrap';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';
import LoadingSpinner from '../components/common/LoadingSpinner';

function ScheduleList({ user, onNavigate }) {
  const [schedules, setSchedules] = useState([]);
  const [medications, setMedications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadSchedules();
  }, [user]);

  const loadSchedules = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const [schedulesData, medsData] = await Promise.all([
        scheduleService.getUserSchedules(user.userId),
        medicationService.getUserMedications(user.userId),
      ]);

      setSchedules(schedulesData);
      // Create a map of medicationId -> medication name
      const medsMap = {};
      medsData.forEach(med => {
        medsMap[med.medicationId] = med.name;
      });
      setMedications(medsMap);
    } catch (err) {
      setError(err.message || 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (scheduleId) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    try {
      await scheduleService.deleteSchedule(scheduleId);
      setSuccess('Schedule deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      loadSchedules();
    } catch (err) {
      setError(err.message || 'Failed to delete schedule');
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    // Convert HH:MM:SS to HH:MM AM/PM
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <Container className="schedule-list-container mt-5">
        <LoadingSpinner label="Loading schedules..." />
      </Container>
    );
  }

  return (
    <Container className="schedule-list-container">
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

      <div className="schedule-list-header mb-4">
        <div>
          <h1 className="schedule-list-title">Medication Schedules</h1>
          <p className="schedule-list-count">
            {schedules.length} {schedules.length === 1 ? 'schedule' : 'schedules'} active
          </p>
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏰</div>
          <p className="empty-state-text">No schedules created yet</p>
          <p className="text-muted mb-3">Go to Medications page and click "Schedule" on any medication to create a schedule</p>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Time</th>
                  <th>Frequency</th>
                  <th>Dose Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.scheduleId}>
                    <td>
                      <strong>{medications[schedule.medicationId] || `Medication #${schedule.medicationId}`}</strong>
                    </td>
                    <td>
                      <Badge bg="info" style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}>
                        {formatTime(schedule.intakeTime)}
                      </Badge>
                    </td>
                    <td>{schedule.frequency}</td>
                    <td>{schedule.doseQuantity} pill{schedule.doseQuantity !== 1 ? 's' : ''}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onNavigate(`edit-schedule-${schedule.scheduleId}`)}
                        className="me-2"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(schedule.scheduleId)}
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

export default ScheduleList;

