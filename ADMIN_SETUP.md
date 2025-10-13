# Admin System Setup Guide

## 🎯 Overview

The OK Studios now has a complete admin system for managing bookings, contacts, and analytics. This guide will help you set up and use the admin panel.

## 🔐 Admin Login

### Test Account Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@theokstudios.com`
- **Password**: `admin123`

### Security Note
⚠️ **Important**: The admin user is now stored in MongoDB with hashed passwords. Change the default credentials in production!

## 🚀 Features

### 1. Admin Dashboard (`/admin/dashboard`)
- **Overview Statistics**: Total bookings, revenue, pending bookings, completed bookings
- **Recent Bookings**: Latest 5 bookings with client details
- **Quick Actions**: Direct links to manage bookings, contacts, and analytics

### 2. Bookings Management (`/admin/bookings`)
- **View All Bookings**: Complete list of all bookings with search and filter
- **Search Functionality**: Search by client name, email, or service type
- **Status Filtering**: Filter by payment status (pending, completed, failed)
- **Booking Details**: View client information, service details, pricing, and notes
- **Status Management**: Track booking and payment status

### 3. Contacts Management (`/admin/contacts`)
- **Contact Form Submissions**: View all contact form submissions
- **Status Tracking**: Mark contacts as new, read, replied, or archived
- **Search & Filter**: Find contacts by name, email, or subject
- **Contact Details**: View full message content and contact information

### 4. Analytics (`/admin/analytics`)
- **Revenue Tracking**: Total and monthly revenue statistics
- **Booking Trends**: 6-month booking and revenue trends
- **Popular Services**: Most requested services
- **Performance Metrics**: Key performance indicators

## 🛠️ Technical Setup

### Dependencies Added
```bash
npm install jsonwebtoken @types/jsonwebtoken bcryptjs
```

### Environment Variables
Add to your `.env.local` file:
```env
JWT_SECRET=your-secret-key-change-in-production
```

### Database Models
- **Booking Model**: Already exists for managing bookings
- **Contact Model**: New model for contact form submissions
- **Admin Model**: New model for admin user authentication

## 📁 File Structure

```
app/
├── admin/
│   ├── login/page.tsx          # Admin login page
│   ├── dashboard/page.tsx      # Admin dashboard
│   ├── bookings/page.tsx       # Bookings management
│   ├── contacts/page.tsx       # Contacts management
│   └── analytics/page.tsx      # Analytics page
├── api/
│   ├── admin/
│   │   ├── login/route.ts      # Admin authentication
│   │   ├── dashboard/route.ts  # Dashboard data
│   │   ├── bookings/route.ts   # Bookings management API
│   │   ├── contacts/route.ts   # Contacts management API
│   │   └── analytics/route.ts  # Analytics data API
│   └── contact/route.ts        # Contact form submission
lib/
└── models/
    ├── Contact.ts              # Contact model
    └── Admin.ts                # Admin model
scripts/
└── seed-admin.js              # Admin user seeding script
middleware.ts                   # Route protection
```

## 🔒 Security Features

### Authentication
- JWT-based authentication with MongoDB admin users
- Bcrypt password hashing
- Token expiration (24 hours)
- Protected admin routes
- Automatic logout on token expiry
- Admin user management in database

### Route Protection
- Middleware protects all `/admin/*` routes
- Automatic redirect to login for unauthorized access
- Token validation on every admin request

## 📊 Data Management

### Bookings
- View all bookings with detailed information
- Track payment status and booking status
- Search and filter functionality
- Client contact information

### Contacts
- Contact form submissions automatically saved
- Status management (new, read, replied, archived)
- Full message content and contact details
- Search and filter capabilities

### Analytics
- Real-time statistics
- Monthly trends and comparisons
- Popular services tracking
- Revenue analytics

## 🎨 UI Features

### Design Consistency
- Matches the main website design
- Responsive layout for all devices
- Smooth animations and transitions
- Professional admin interface

### User Experience
- Intuitive navigation
- Quick actions and shortcuts
- Search and filter capabilities
- Status indicators and badges

## 🚀 Getting Started

1. **Seed the admin user** (first time only):
   ```bash
   node scripts/seed-admin.js
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Navigate to admin login**:
   ```
   http://localhost:3000/admin/login
   ```

4. **Login with test credentials**:
   - Email: `admin@theokstudios.com`
   - Password: `admin123`

5. **Explore the admin panel**:
   - Dashboard: Overview of all data
   - Bookings: Manage client bookings
   - Contacts: Handle contact form submissions
   - Analytics: View performance metrics

## 🔧 Customization

### Adding New Admin Features
1. Create new page in `app/admin/`
2. Add corresponding API route in `app/api/admin/`
3. Update navigation in dashboard
4. Add route protection in middleware

### Modifying Admin Credentials
1. Update admin user in MongoDB directly
2. Or create a new admin user using the seeding script
3. Passwords are automatically hashed with bcrypt

### Database Schema Changes
1. Modify models in `lib/models/`
2. Update API routes to handle new fields
3. Update admin pages to display new data

## 📝 Notes

- All admin routes are protected by middleware
- Contact form submissions are automatically saved to database
- Analytics data is calculated in real-time
- JWT tokens expire after 24 hours
- All admin pages are responsive and mobile-friendly

## 🆘 Troubleshooting

### Common Issues
1. **Cannot access admin routes**: Check if JWT token is valid
2. **Login not working**: Verify credentials in API route
3. **Data not loading**: Check MongoDB connection
4. **Styling issues**: Ensure all UI components are imported

### Support
For technical issues, check:
- Browser console for errors
- Network tab for API failures
- MongoDB connection status
- Environment variables setup
