-- Create bookings table for The OK Studios
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  service_type VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 2,
  total_price DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(client_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_per_hour DECIMAL(10, 2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (name, description, price_per_hour, duration_hours, features) VALUES
  ('Podcast Recording', 'Professional podcast recording in our state-of-the-art studio', 150.00, 2, '["Professional microphones", "Soundproof booth", "Live monitoring", "Multi-track recording"]'),
  ('Audio Editing', 'Expert audio editing and post-production services', 100.00, 1, '["Noise reduction", "Audio enhancement", "Music & sound effects", "Final mastering"]'),
  ('Full Production Package', 'Complete podcast production from recording to final delivery', 500.00, 4, '["Recording session", "Professional editing", "Mixing & mastering", "Distribution support"]'),
  ('Studio Rental', 'Rent our premium studio space with all equipment included', 120.00, 2, '["All equipment included", "Technical support", "Flexible scheduling", "High-speed internet"]')
ON CONFLICT DO NOTHING;
