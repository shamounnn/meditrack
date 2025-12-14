-- MediTrack NestJS schema (useful when not using TypeORM sync)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medications (
    medication_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    pills_per_box INT,
    current_pills INT,
    side_effects TEXT,
    low_stock_threshold INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medication_schedules (
    schedule_id SERIAL PRIMARY KEY,
    medication_id INT NOT NULL REFERENCES medications(medication_id) ON DELETE CASCADE,
    intake_time TIME,
    frequency VARCHAR(50),
    dose_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interaction_alerts (
    alert_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    medication1_id INT NOT NULL REFERENCES medications(medication_id) ON DELETE CASCADE,
    medication2_id INT NOT NULL REFERENCES medications(medication_id) ON DELETE CASCADE,
    alert_message TEXT,
    severity VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_schedules_medication_id ON medication_schedules(medication_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON interaction_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_medications ON interaction_alerts(medication1_id, medication2_id);
