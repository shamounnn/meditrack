import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import UserAuth from './pages/UserAuth';
import UserDashboard from './pages/UserDashboard';
import MedicationList from './pages/MedicationList';
import MedicationForm from './pages/MedicationForm';
import ScheduleList from './pages/ScheduleList';
import ScheduleForm from './pages/ScheduleForm';
import AlertList from './pages/AlertList';
import AlertForm from './pages/AlertForm';
import { logout } from './store/slices/userSlice';
import { fetchMedicationsByUser } from './store/slices/medicationSlice';

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({});

  useEffect(() => {
    if (user?.userId && token) {
      dispatch(fetchMedicationsByUser(user.userId));
    }
  }, [user, token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setCurrentPage('auth');
    setPageParams({});
  };

  const handleNavigate = (page, params = {}) => {
    setPageParams(params);
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!user) {
      return <UserAuth />;
    }

    if (currentPage.startsWith('edit-schedule-')) {
      const scheduleId = currentPage.replace('edit-schedule-', '');
      return <ScheduleForm user={user} scheduleId={scheduleId} onSuccess={() => handleNavigate('schedules')} />;
    }

    if (currentPage.startsWith('edit-alert-')) {
      const alertId = currentPage.replace('edit-alert-', '');
      return <AlertForm user={user} alertId={alertId} onSuccess={() => handleNavigate('alerts')} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <UserDashboard user={user} onNavigate={handleNavigate} />;
      case 'medications':
        return <MedicationList user={user} onRefresh={() => handleNavigate('medications')} onNavigate={handleNavigate} />;
      case 'add-medication':
        return <MedicationForm user={user} onSuccess={() => handleNavigate('medications')} />;
      case 'schedules':
        return <ScheduleList user={user} onNavigate={handleNavigate} />;
      case 'add-schedule':
        return (
          <ScheduleForm
            user={user}
            medicationId={pageParams.medicationId}
            onSuccess={() => handleNavigate('schedules')}
          />
        );
      case 'alerts':
        return <AlertList user={user} onNavigate={handleNavigate} />;
      case 'add-alert':
        return <AlertForm user={user} onSuccess={() => handleNavigate('alerts')} />;
      default:
        return <UserDashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`app-container ${!user ? 'auth-mode' : ''}`}>
      {user && (
        <Navbar bg="primary" expand="lg" sticky="top" className="navbar-app">
          <Container fluid>
            <Navbar.Brand className="brand" onClick={() => handleNavigate('dashboard')}>
              <span className="brand-icon">MT</span>
              <span className="brand-text">MediTrack</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto gap-2">
                <Nav.Link className="nav-link-app" onClick={() => handleNavigate('dashboard')}>
                  Dashboard
                </Nav.Link>
                <Nav.Link className="nav-link-app" onClick={() => handleNavigate('medications')}>
                  Medications
                </Nav.Link>
                <Nav.Link className="nav-link-app" onClick={() => handleNavigate('schedules')}>
                  Schedules
                </Nav.Link>
                <Nav.Link className="nav-link-app" onClick={() => handleNavigate('alerts')}>
                  Alerts
                </Nav.Link>
                <Nav.Link className="nav-link-app" onClick={handleLogout}>
                  Logout ({user.username})
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <div className={`page-content ${!user ? 'auth-page' : ''}`}>{renderPage()}</div>
    </div>
  );
}

export default App;
