import { Card, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

function UpcomingDoses({ schedules = [], medications = [], onTakeDose }) {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  const getScheduleStatus = (intakeTime) => {
    if (!intakeTime) return 'pending';
    return intakeTime <= currentTime ? 'due' : 'upcoming';
  };

  const getMedication = (medicationId) => {
    return medications.find(m => m.medicationId === medicationId);
  };

  const sortedSchedules = [...schedules].sort((a, b) => {
    const timeA = a.intakeTime || '23:59';
    const timeB = b.intakeTime || '23:59';
    return timeA.localeCompare(timeB);
  });

  return (
    <Card className="upcoming-doses-card">
      <Card.Body>
        <Card.Title className="mb-3">
          <FiClock className="me-2" />
          Today's Schedule
        </Card.Title>
        {sortedSchedules.length === 0 ? (
          <div className="empty-state-small">
            <FiCheckCircle size={32} color="#10b981" />
            <p className="mt-2 mb-0">No scheduled doses for today</p>
          </div>
        ) : (
          <div className="doses-list">
            {sortedSchedules.map(schedule => {
              const med = getMedication(schedule.medicationId);
              const status = getScheduleStatus(schedule.intakeTime);
              
              return (
                <div key={schedule.scheduleId} className={`dose-item ${status}`}>
                  <div className="dose-time">
                    {schedule.intakeTime ? format(new Date(`2000-01-01T${schedule.intakeTime}`), 'h:mm a') : 'As needed'}
                  </div>
                  <div className="dose-details">
                    <div className="dose-medication">{med?.name || 'Unknown'}</div>
                    <div className="dose-dosage">{schedule.doseQuantity || 1} × {med?.dosage}{typeof med?.dosage === 'number' ? ' mg' : ''}</div>
                  </div>
                  <div className="dose-status">
                    {status === 'due' ? (
                      <Badge bg="warning" className="d-flex align-items-center gap-1">
                        <FiAlertCircle size={14} />
                        Due
                      </Badge>
                    ) : (
                      <Badge bg="secondary">Upcoming</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default UpcomingDoses;
