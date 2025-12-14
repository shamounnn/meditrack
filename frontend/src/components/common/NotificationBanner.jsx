function NotificationBanner({ variant = 'info', message, onClose }) {
  if (!message) {
    return null;
  }

  const classes = ['alert', `alert-${variant}`, 'alert-dismissible', 'fade', 'show'];

  return (
    <div className={classes.join(' ')} role="alert">
      {message}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      )}
    </div>
  );
}

export default NotificationBanner;

