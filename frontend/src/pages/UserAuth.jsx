import { useEffect, useState } from 'react';
import { Alert, Button, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/userSlice';

function UserAuth() {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  useEffect(() => {
    setLocalError('');
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username || username.length < 3) {
      setLocalError('Username must be at least 3 characters');
      return;
    }

    if (!password || password.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    if (activeTab === 'register') {
      if (!email.includes('@')) {
        setLocalError('Valid email is required');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }
      dispatch(registerUser({ username, email, password }));
    } else {
      dispatch(loginUser({ username, password }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">MediTrack</h1>
          <p className="auth-subtitle">Your Personal Medication Manager</p>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k);
            setLocalError('');
          }}
          className="mb-4"
        >
          <Tab eventKey="login" title="Login">
            <form onSubmit={handleSubmit}>
              {(localError || error) && (
                <Alert variant="danger" onClose={() => setLocalError('')} dismissible>
                  {localError || error}
                </Alert>
              )}

              <div className="form-group mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block w-100"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </Tab>

          <Tab eventKey="register" title="Register">
            <form onSubmit={handleSubmit}>
              {(localError || error) && (
                <Alert variant="danger" onClose={() => setLocalError('')} dismissible>
                  {localError || error}
                </Alert>
              )}

              <div className="form-group mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose username"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block w-100"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Registering...' : 'Register'}
              </button>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default UserAuth;
