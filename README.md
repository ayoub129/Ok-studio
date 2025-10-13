# The OK Studios - Professional Podcast Recording Studio

A modern, full-stack web application for managing podcast recording studio bookings, services, and payments. Built with Next.js 14, TypeScript, MongoDB, and Square payment integration.

## 🎯 Features

### For Customers
- **Service Discovery**: Browse available podcast recording services
- **Online Booking**: Easy booking system with calendar and time slot selection
- **Secure Payments**: Integrated Square payment processing
- **Service Management**: View service details, pricing, and features
- **Responsive Design**: Beautiful, modern UI that works on all devices

### For Administrators
- **Dashboard**: Comprehensive admin dashboard with analytics
- **Service Management**: Add, edit, and manage studio services
- **Booking Management**: View and manage customer bookings
- **Payment Tracking**: Monitor payment status and revenue
- **Contact Management**: Handle customer inquiries and requests

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB with Mongoose ODM
- **Payments**: Square Web SDK
- **Deployment**: Vercel
- **Authentication**: JWT-based admin authentication

## 📁 Project Structure

```
├── app/                          # Next.js 14 App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── dashboard/           # Admin dashboard
│   │   ├── services/            # Service management
│   │   ├── bookings/            # Booking management
│   │   └── login/               # Admin login
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   ├── bookings/            # Booking API endpoints
│   │   ├── services/            # Service API endpoints
│   │   └── square/              # Payment processing
│   ├── booking/                 # Customer booking flow
│   ├── services/                # Services page
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
├── lib/                         # Utilities and configurations
│   ├── models/                  # MongoDB models
│   └── types.ts                 # TypeScript type definitions
└── public/                      # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Square developer account
- Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ok-studios
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Square Payment Integration
SQUARE_ACCESS_TOKEN=your_square_access_token
NEXT_PUBLIC_SQUARE_APPLICATION_ID=your_square_app_id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your_square_location_id

# Admin Authentication
ADMIN_EMAIL=admin@okstudios.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret

# Deployment (for production)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 4. Database Setup
The application will automatically create the necessary collections when you first run it. You can also seed the database with sample services:

```bash
node scripts/seed-services.js
```

### 5. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Key Features

### Service Management
- **Dynamic Services**: Services are managed through the admin panel and displayed dynamically on user pages
- **Pricing Control**: Set hourly rates and duration for each service
- **Feature Lists**: Define service features and benefits
- **Active/Inactive Status**: Control service visibility

### Booking System
- **Calendar Integration**: Visual calendar for date selection
- **Time Slot Management**: Available time slots with conflict detection
- **Service Selection**: Choose from available services with pricing
- **Customer Information**: Collect client details and special requests

### Payment Processing
- **Square Integration**: Secure payment processing with Square
- **Card Tokenization**: PCI-compliant card handling
- **Payment Confirmation**: Real-time payment status updates
- **Receipt Generation**: Automatic receipt and confirmation emails

### Admin Panel
- **Dashboard Analytics**: Revenue, booking statistics, and trends
- **Service CRUD**: Complete service management interface
- **Booking Management**: View and manage all customer bookings
- **Payment Tracking**: Monitor payment status and revenue

## 🔧 API Endpoints

### Public APIs
- `GET /api/services` - Get all active services
- `POST /api/bookings/create` - Create new booking
- `GET /api/bookings/available-times` - Get available time slots
- `POST /api/square/create-payment` - Initialize payment
- `POST /api/square/process-payment` - Process payment

### Admin APIs
- `GET /api/admin/services` - Get all services (admin view)
- `POST /api/admin/services` - Create new service
- `PUT /api/admin/services/[id]` - Update service
- `DELETE /api/admin/services/[id]` - Delete service
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/login` - Admin authentication

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:
- Database connection string
- Square API credentials
- Admin authentication details
- JWT secret

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🔒 Security Features

- **JWT Authentication**: Secure admin authentication
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: MongoDB with parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Secure data transmission
- **Environment Variables**: Sensitive data stored securely

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: ScrollReveal and hover effects
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant design
- **Dark/Light Mode**: Theme support (if implemented)

## 📊 Database Schema

### Services Collection
```javascript
{
  name: String,
  description: String,
  price_per_hour: Number,
  duration_hours: Number,
  features: [String],
  is_active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### Bookings Collection
```javascript
{
  client_name: String,
  client_email: String,
  client_phone: String,
  service_type: String,
  booking_date: String,
  booking_time: String,
  duration_hours: Number,
  total_price: Number,
  payment_status: String,
  payment_intent_id: String,
  notes: String,
  status: String,
  created_at: Date,
  updated_at: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@okstudios.com
- Documentation: [Link to documentation]
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🎯 Roadmap

- [ ] Email notifications for bookings
- [ ] Customer portal for booking history
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Integration with calendar systems
- [ ] Automated reminder system

---

**The OK Studios** - Professional Podcast Recording Studio Management System
