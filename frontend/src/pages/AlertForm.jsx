import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { alertService } from '../services/alertService';
import { medicationService } from '../services/medicationService';

function AlertForm({ user, alertId, onSuccess }) {
  const [formData, setFormData] = useState({
    medication1Id: '',
    medication2Id: '',
    alertMessage: '',
    severity: 'moderate',
  });
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMedications, setLoadingMedications] = useState(true);

  useEffect(() => {
    loadMedications();
    if (alertId) {
      loadAlert();
    }
  }, [alertId, user]);

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
      } else {
        setMedications([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load medications');
    } finally {
      setLoadingMedications(false);
    }
  };

  const loadAlert = async () => {
    try {
      const alert = await alertService.getAlertById(alertId);
      if (!alert) {
        setError('Alert not found');
        return;
      }
      setFormData({
        medication1Id: alert.medication1Id?.toString() || '',
        medication2Id: alert.medication2Id?.toString() || '',
        alertMessage: alert.alertMessage || '',
        severity: alert.severity || 'moderate',
      });
    } catch (err) {
      setError(err.message || 'Failed to load alert');
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
    if (!formData.medication1Id) {
      setError('Please select the first medication');
      return false;
    }
    if (!formData.medication2Id) {
      setError('Please select the second medication');
      return false;
    }
    if (formData.medication1Id === formData.medication2Id) {
      setError('Please select two different medications');
      return false;
    }
    if (!formData.alertMessage.trim()) {
      setError('Please enter an alert message');
      return false;
    }
    if (!formData.severity) {
      setError('Please select a severity level');
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
      const payload = {
        userId: user.userId,
        medication1Id: parseInt(formData.medication1Id, 10),
        medication2Id: parseInt(formData.medication2Id, 10),
        alertMessage: formData.alertMessage.trim(),
        severity: formData.severity,
      };

      if (alertId) {
        await alertService.updateAlert(alertId, {
          alert_message: formData.alertMessage.trim(),
          severity: formData.severity,
        });
        setSuccess('Alert updated successfully!');
      } else {
        await alertService.createAlert(payload);
        setSuccess('Alert created successfully!');
      }

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to save alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = !!alertId;

  return (
    <Container className="alert-form-container">
      <Card className="alert-form-card">
        <h1 className="alert-form-title">
          {isEditMode ? '✏️ Edit Alert' : '⚠️ Create Interaction Alert'}
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
              <Form.Label>First Medication *</Form.Label>
              <Form.Select
                name="medication1Id"
                value={formData.medication1Id}
                onChange={handleChange}
                disabled={loading || isEditMode}
                required
              >
                <option value="">Select first medication</option>
                {medications.map(med => (
                  <option key={med.medicationId} value={med.medicationId}>
                    {med.name} ({med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Second Medication *</Form.Label>
              <Form.Select
                name="medication2Id"
                value={formData.medication2Id}
                onChange={handleChange}
                disabled={loading || isEditMode}
                required
              >
                <option value="">Select second medication</option>
                {medications
                  .filter(med => med.medicationId.toString() !== formData.medication1Id)
                  .map(med => (
                    <option key={med.medicationId} value={med.medicationId}>
                      {med.name} ({med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''})
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alert Message *</Form.Label>
              <Form.Control
                as="textarea"
                name="alertMessage"
                value={formData.alertMessage}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., These medications may cause increased drowsiness when taken together"
                disabled={loading}
                required
              />
              <Form.Text className="text-muted">
                Describe the potential interaction or warning
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Severity *</Form.Label>
              <Form.Select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Select the severity level of this interaction
              </Form.Text>
            </Form.Group>

            <div className="form-actions">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                size="lg"
              >
                {loading ? 'Saving...' : (isEditMode ? '✓ Update Alert' : '✓ Create Alert')}
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

export default AlertForm;

