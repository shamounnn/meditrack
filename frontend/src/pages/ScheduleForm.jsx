import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';

function ScheduleForm({ user, medicationId, scheduleId, onSuccess }) {
  const [formData, setFormData] = useState({
    medicationId: medicationId || '',
    intakeTime: '',
    frequency: 'daily',
    doseQuantity: '1',
  });
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMedications, setLoadingMedications] = useState(true);

  useEffect(() => {
    loadMedications();
    if (scheduleId) {
      loadSchedule();
    }
  }, [scheduleId, user]);

  const loadMedications = async () => {
    if (!user || !user.userId) {
      setError('User not authenticated');
      setLoadingMedications(false);
      return;
    }
    try {
      const data = await medicationService.getUserMedications(user.userId);
      if (Array.isArray(data)) {
        setMedications(data);
        if (medicationId && !formData.medicationId) {
          setFormData(prev => ({ ...prev, medicationId: medicationId.toString() }));
        }
      } else {
        setMedications([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load medications');
    } finally {
      setLoadingMedications(false);
    }
  };

  const loadSchedule = async () => {
    try {
      const schedule = await scheduleService.getScheduleById(scheduleId);
      if (!schedule) {
        setError('Schedule not found');
        return;
      }
      // Convert time from HH:MM:SS to HH:MM for input
      const time = schedule.intakeTime ? schedule.intakeTime.substring(0, 5) : '';
      setFormData({
        medicationId: schedule.medicationId?.toString() || '',
        intakeTime: time,
        frequency: schedule.frequency || 'daily',
        doseQuantity: schedule.doseQuantity?.toString() || '1',
      });
    } catch (err) {
      setError(err.message || 'Failed to load schedule');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.medicationId) {
      setError('Please select a medication');
      return false;
    }
    if (!formData.intakeTime) {
      setError('Please select a time');
      return false;
    }
    if (!formData.frequency) {
      setError('Please select a frequency');
      return false;
    }
    if (!formData.doseQuantity || parseInt(formData.doseQuantity) < 1) {
      setError('Dose quantity must be at least 1');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Convert time from HH:MM to HH:MM:SS
      if (!formData.intakeTime || !formData.intakeTime.includes(':')) {
        setError('Please enter a valid time');
        setLoading(false);
        return;
      }
      const timeParts = formData.intakeTime.split(':');
      if (timeParts.length < 2 || !timeParts[0] || !timeParts[1]) {
        setError('Please enter a valid time format (HH:MM)');
        setLoading(false);
        return;
      }
      const intakeTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:00`;

      const payload = {
        medicationId: parseInt(formData.medicationId, 10),
        intakeTime,
        frequency: formData.frequency,
        doseQuantity: parseInt(formData.doseQuantity, 10),
      };

      if (scheduleId) {
        await scheduleService.updateSchedule(scheduleId, {
          intake_time: intakeTime,
          frequency: formData.frequency,
          dose_quantity: parseInt(formData.doseQuantity, 10),
        });
        setSuccess('Schedule updated successfully!');
      } else {
        await scheduleService.createSchedule(payload);
        setSuccess('Schedule created successfully!');
      }

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to save schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = !!scheduleId;

  return (
    <Container className="schedule-form-container">
      <Card className="schedule-form-card">
        <h1 className="schedule-form-title">
          {isEditMode ? '✏️ Edit Schedule' : '⏰ Add New Schedule'}
        </h1>

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" onClose={() => setSuccess('')} dismissible>
            {success}
          </Alert>
        )}

        {loadingMedications ? (
          <div className="text-center p-4">Loading medications...</div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Medication *</Form.Label>
              <Form.Select
                name="medicationId"
                value={formData.medicationId}
                onChange={handleChange}
                disabled={loading || isEditMode}
                required
              >
                <option value="">Select a medication</option>
                {medications.map(med => (
                  <option key={med.medicationId} value={med.medicationId}>
                    {med.name} ({med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time *</Form.Label>
              <Form.Control
                type="time"
                name="intakeTime"
                value={formData.intakeTime}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <Form.Text className="text-muted">
                Select the time you should take this medication
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Frequency *</Form.Label>
              <Form.Select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="daily">Daily</option>
                <option value="twice daily">Twice Daily</option>
                <option value="three times daily">Three Times Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as needed">As Needed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dose Quantity (pills) *</Form.Label>
              <Form.Control
                type="number"
                name="doseQuantity"
                value={formData.doseQuantity}
                onChange={handleChange}
                min="1"
                disabled={loading}
                required
              />
              <Form.Text className="text-muted">
                Number of pills to take at this time
              </Form.Text>
            </Form.Group>

            <div className="form-actions">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                size="lg"
              >
                {loading ? 'Saving...' : (isEditMode ? '✓ Update Schedule' : '✓ Create Schedule')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => onSuccess()}
                disabled={loading}
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </Container>
  );
}

export default ScheduleForm;

