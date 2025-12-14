function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="empty-state">
      <div className="loading">{label}</div>
    </div>
  );
}

export default LoadingSpinner;

