CREATE TABLE IF NOT EXISTS appointment_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS appointment_requests_created_at
  ON appointment_requests (created_at);

CREATE TABLE IF NOT EXISTS request_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  window_started INTEGER NOT NULL,
  request_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS image_slots (
  slot TEXT PRIMARY KEY,
  object_key TEXT NOT NULL,
  content_type TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
