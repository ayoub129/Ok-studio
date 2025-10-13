const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Service schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price_per_hour: { type: Number, required: true },
  duration_hours: { type: Number, required: true },
  features: [{ type: String, trim: true }],
  is_active: { type: Boolean, default: true }
}, { timestamps: true })

const Service = mongoose.model('Service', serviceSchema)

// Default services data
const defaultServices = [
  {
    name: 'Podcast Recording',
    description: 'Professional podcast recording in our state-of-the-art studio',
    price_per_hour: 150.00,
    duration_hours: 2,
    features: ['Professional microphones', 'Soundproof booth', 'Live monitoring', 'Multi-track recording']
  },
  {
    name: 'Audio Editing',
    description: 'Expert audio editing and post-production services',
    price_per_hour: 100.00,
    duration_hours: 1,
    features: ['Noise reduction', 'Audio enhancement', 'Music & sound effects', 'Final mastering']
  },
  {
    name: 'Full Production Package',
    description: 'Complete podcast production from recording to final delivery',
    price_per_hour: 500.00,
    duration_hours: 4,
    features: ['Recording session', 'Professional editing', 'Mixing & mastering', 'Distribution support']
  },
  {
    name: 'Studio Rental',
    description: 'Rent our premium studio space with all equipment included',
    price_per_hour: 120.00,
    duration_hours: 2,
    features: ['All equipment included', 'Technical support', 'Flexible scheduling', 'High-speed internet']
  }
]

async function seedServices() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ok-studios'
    
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MONGODB_URI not found in .env.local, using default local connection')
      console.log('Please create .env.local with your MongoDB connection string')
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Clear existing services
    await Service.deleteMany({})
    console.log('🗑️  Cleared existing services')

    // Insert default services
    const services = await Service.insertMany(defaultServices)
    console.log(`✅ Inserted ${services.length} services:`)
    services.forEach(service => {
      console.log(`   - ${service.name}: $${service.price_per_hour}/hr`)
    })

    // Close connection
    await mongoose.connection.close()
    console.log('✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error seeding services:', error.message)
    process.exit(1)
  }
}

seedServices()