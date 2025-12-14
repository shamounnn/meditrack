import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { medicationService } from '../services/medicationService';

function MedicationForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    pillsPerBox: '',
    currentPills: '',
    sideEffects: '',
    lowStockThreshold: '5',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Medication name is required');
      return false;
    }
    if (!formData.dosage.trim()) {
      setError('Dosage is required');
      return false;
    }
    if (!formData.pillsPerBox || formData.pillsPerBox <= 0) {
      setError('Pills per box must be a positive number');
      return false;
    }
    if (!formData.currentPills || formData.currentPills < 0) {
      setError('Current pills must be a non-negative number');
      return false;
    }
    if (parseInt(formData.currentPills) > parseInt(formData.pillsPerBox)) {
      setError('Current pills cannot exceed pills per box');
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

    if (!user) {
      setError('You must be logged in to add medications.');
      return;
    }

    setLoading(true);

    try {
      await medicationService.createMedication({
        userId: user.userId,
        name: formData.name.trim(),
        dosage: formData.dosage.trim(),
        pillsPerBox: parseInt(formData.pillsPerBox, 10),
        currentPills: parseInt(formData.currentPills, 10),
        sideEffects: formData.sideEffects.trim() || 'None',
        lowStockThreshold: parseInt(formData.lowStockThreshold, 10),
      });

      setSuccess('✓ Medication added successfully!');
      setFormData({
        name: '',
        dosage: '',
        pillsPerBox: '',
        currentPills: '',
        sideEffects: '',
        lowStockThreshold: '5',
      });
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to add medication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      pillsPerBox: '',
      currentPills: '',
      sideEffects: '',
      lowStockThreshold: '5',
    });
    setError('');
    setSuccess('');
  };

  return (
    <Container className="medication-form-container">
      <Card className="medication-form-card">
        <h1 className="medication-form-title">
          💊 Add New Medication
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

        <Form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="form-section">
            <div className="form-section-title">Basic Information</div>

            <Form.Group className="mb-3">
              <Form.Label>Medication Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="e.g., Ibuprofen, Amoxicillin"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dosage *</Form.Label>
              <Form.Control
                type="text"
                name="dosage"
                placeholder="e.g., 500mg, 2 tablets"
                value={formData.dosage}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>
          </div>

          {/* Pill Information Section */}
          <div className="form-section">
            <div className="form-section-title">Pill Information</div>

            <div className="form-row">
              <Form.Group>
                <Form.Label>Pills Per Box *</Form.Label>
                <Form.Control
                  type="number"
                  name="pillsPerBox"
                  placeholder="e.g., 30"
                  value={formData.pillsPerBox}
                  onChange={handleChange}
                  min="1"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Current Pills *</Form.Label>
                <Form.Control
                  type="number"
                  name="currentPills"
                  placeholder="e.g., 25"
                  value={formData.currentPills}
                  onChange={handleChange}
                  min="0"
                  disabled={loading}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Low Stock Alert Threshold (pills)</Form.Label>
              <Form.Control
                type="number"
                name="lowStockThreshold"
                placeholder="e.g., 5"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="1"
                disabled={loading}
              />
              <Form.Text className="text-muted">
                You'll get a warning when pills fall below this number
              </Form.Text>
            </Form.Group>
          </div>

          {/* Additional Information Section */}
          <div className="form-section">
            <div className="form-section-title">Additional Information</div>

            <Form.Group className="mb-3">
              <Form.Label>Possible Side Effects</Form.Label>
              <Form.Control
                as="textarea"
                name="sideEffects"
                placeholder="e.g., Drowsiness, Nausea, Headache"
                value={formData.sideEffects}
                onChange={handleChange}
                rows={3}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Separate multiple effects with commas
              </Form.Text>
            </Form.Group>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              size="lg"
            >
              {loading ? 'Adding...' : '✓ Add Medication'}
            </Button>
            <Button
              variant="secondary"
              onClick={resetForm}
              disabled={loading}
              size="lg"
            >
              Clear Form
            </Button>
          </div>
        </Form>

        {/* Helper Text */}
        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="text-muted mb-2">💡 Tips:</h6>
          <ul className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            <li>Fill in all required fields (*) to add a medication</li>
            <li>Current pills should not exceed pills per box</li>
            <li>Low stock threshold helps you remember to refill</li>
            <li>Side effects are helpful for tracking interactions</li>
          </ul>
        </div>
      </Card>
    </Container>
  );
}

export default MedicationForm;
