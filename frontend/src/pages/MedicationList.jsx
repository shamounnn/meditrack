import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Badge, Alert, Card, Form, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useMedications } from '../hooks/useMedications';
import { medicationService } from '../services/medicationService';
import { scheduleService } from '../services/scheduleService';
import { voiceService } from '../services/voiceService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { fetchMedicationsByUser } from '../store/slices/medicationSlice';

function MedicationList({ user, onRefresh, onNavigate }) {
  if (!user) {
    return (
      <Container className="medication-list-container mt-5">
        <Alert variant="warning">Please log in to view medications</Alert>
      </Container>
    );
  }

  const userId = user?.userId;
  const { medications, loading, error, refresh } = useMedications(userId);
  const [schedules, setSchedules] = useState({});
  const [success, setSuccess] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const dispatch = useDispatch();
  const gqlMeds = useSelector((state) => state.medications.items);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMedicationsByUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    async function loadSchedules() {
      if (!userId || medications.length === 0) {
        setSchedules({});
        return;
      }

      const entries = await Promise.all(
        medications.map(async (med) => {
          try {
            const data = await scheduleService.getMedicationSchedules(med.medicationId);
            const doseQuantity = data && data.length > 0 ? data[0].doseQuantity : 1;
            return [med.medicationId, doseQuantity];
          } catch (err) {
            console.error('Error fetching schedules:', err);
            return [med.medicationId, 1];
          }
        }),
      );

      setSchedules(Object.fromEntries(entries));
    }

    loadSchedules();
  }, [medications, userId]);

  const handleDeductPill = async (medicationId) => {
    if (!medicationId) {
      setLocalError('Invalid medication');
      return;
    }

    try {
      const doseQuantity = schedules[medicationId] || 1;
      const medication = medications.find((m) => m.medicationId === medicationId);

      if (!medication) {
        setLocalError('Medication not found');
        return;
      }

      if (medication.currentPills < doseQuantity) {
        setLocalError(`Not enough pills. Only ${medication.currentPills} remaining.`);
        setTimeout(() => setLocalError(null), 3000);
        return;
      }

      await medicationService.deductMedication(medicationId, doseQuantity);
      setSuccess(`Marked ${doseQuantity} pill(s) as taken for ${medication.name}`);
      voiceService.confirmAction(`${medication.name} taken`);
      setTimeout(() => setSuccess(null), 3000);
      refresh();
    } catch (err) {
      console.error('Error deducting pill:', err);
      setLocalError(err.message || 'Failed to update pills');
      setTimeout(() => setLocalError(null), 3000);
    }
  };

  const handleRefill = async (medicationId) => {
    try {
      const medication = medications.find((m) => m.medicationId === medicationId);
      if (!medication) return;

      await medicationService.updateMedication(medicationId, {
        currentPills: medication.pillsPerBox,
      });

      setSuccess(`${medication.name} refilled successfully!`);
      voiceService.confirmAction(`${medication.name} refilled`);
      setTimeout(() => setSuccess(null), 3000);
      refresh();
    } catch (err) {
      console.error('Error refilling medication:', err);
      setLocalError(err.message || 'Failed to refill medication');
    }
  };

  const handleDelete = async (medicationId) => {
    const medication = medications.find((m) => m.medicationId === medicationId);
    if (!medication) return;

    if (!window.confirm(`Are you sure you want to delete ${medication.name}?`)) {
      return;
    }

    try {
      await medicationService.deleteMedication(medicationId);
      setSuccess('Medication deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      refresh();
    } catch (err) {
      console.error('Error deleting medication:', err);
      setLocalError(err.message || 'Failed to delete medication');
    }
  };

  const filteredMedications = medications
    .filter((med) => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'low-stock' && med.currentPills <= med.lowStockThreshold) ||
        (filterStatus === 'in-stock' && med.currentPills > med.lowStockThreshold);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return (
      <Container className="medication-list-container mt-5">
        <LoadingSpinner label="Loading medications..." />
      </Container>
    );
  }

  return (
    <Container className="medication-list-container">
      {(error || localError) && (
        <Alert variant="danger" onClose={() => setLocalError(null)} dismissible>
          {error || localError}
        </Alert>
      )}

      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      <div className="medication-list-header mb-4">
        <div>
          <h1 className="medication-list-title">Your Medications</h1>
          <p className="medication-list-count">
            {filteredMedications.length} {filteredMedications.length === 1 ? 'medication' : 'medications'} 
            {searchTerm || filterStatus !== 'all' ? ' found' : ' tracked'}
          </p>
        </div>
        {medications.length > 0 && (
          <Button variant="primary" size="lg" onClick={() => onNavigate?.('add-medication')}>
            + Add Medication
          </Button>
        )}
      </div>

      {gqlMeds && gqlMeds.length > 0 && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Recent Medications</Card.Title>
            <div className="d-flex flex-wrap gap-3">
              {gqlMeds.slice(0, 3).map((med) => (
                <Badge key={med.id || med.medicationId} bg="info" className="p-3">
                  <div>{med.name}</div>
                  <small>{med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''}</small>
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {medications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💊</div>
          <p className="empty-state-text">No medications added yet</p>
          <p className="text-muted mb-3">Start by adding your first medication to get tracked</p>
          <Button variant="primary" onClick={() => onNavigate?.('add-medication')}>
            Add Your First Medication
          </Button>
        </div>
      ) : (
        <>
          <div className="medication-filters mb-4">
            <InputGroup style={{ maxWidth: '400px' }}>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                  ✕
                </Button>
              )}
            </InputGroup>
            <Dropdown as={ButtonGroup}>
              <Button variant="outline-secondary">
                📊 {filterStatus === 'all' ? 'All' : filterStatus === 'low-stock' ? 'Low Stock' : 'In Stock'}
              </Button>
              <Dropdown.Toggle split variant="outline-secondary" />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus('all')}>All Medications</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterStatus('low-stock')}>Low Stock Only</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterStatus('in-stock')}>In Stock Only</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {filteredMedications.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p className="text-muted mb-0">No medications match your filters</p>
              </Card.Body>
            </Card>
          ) : (
            <div className="medications-grid">
              {filteredMedications.map((med) => (
            <Card key={med.medicationId} className="medication-card">
              <Card.Body>
                <div className="medication-header">
                  <h3 className="medication-name">{med.name}</h3>
                  {med.currentPills <= med.lowStockThreshold && (
                    <Badge bg="warning" className="medication-badge">
                      Low Stock
                    </Badge>
                  )}
                </div>

                <div className="medication-dosage">{med.dosage}{typeof med.dosage === 'number' ? ' mg' : ''}</div>

                <div className="medication-details">
                  <div className="medication-detail-item">
                    <span className="medication-detail-label">Pills Remaining:</span>
                    <span className="medication-detail-value">
                      {med.currentPills} / {med.pillsPerBox}
                    </span>
                  </div>
                  
                  <div className="pill-progress-bar">
                    <div
                      className="pill-progress-fill"
                      style={{
                        width: `${Math.min((med.currentPills / med.pillsPerBox) * 100, 100)}%`,
                        backgroundColor: med.currentPills <= med.lowStockThreshold ? '#f59e0b' : '#10b981',
                      }}
                    />
                  </div>

                  {med.sideEffects && (
                    <div className="medication-detail-item" style={{ marginTop: '1rem' }}>
                      <span className="medication-detail-label">Side Effects:</span>
                      <span className="medication-detail-value text-muted">{med.sideEffects}</span>
                    </div>
                  )}
                </div>

                <div className="medication-actions">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleDeductPill(med.medicationId)}
                    disabled={med.currentPills === 0}
                  >
                    Take
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleRefill(med.medicationId)}
                    disabled={med.currentPills === med.pillsPerBox}
                  >
                    Refill
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onNavigate?.('add-schedule', { medicationId: med.medicationId })}
                  >
                    Schedule
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(med.medicationId)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
          )}
        </>
      )}
    </Container>
  );
}

export default MedicationList;
