# ServiceSphere Admin Panel - API Integration Documentation

This document provides a comprehensive mapping of all API endpoints used in the ServiceSphere platform admin panel and their role in managing the entire ServiceSphere ecosystem.

## Table of Contents

1. [Admin Authentication APIs](#admin-authentication-apis)
2. [Dashboard & Analytics APIs](#dashboard--analytics-apis)
3. [Location Management APIs](#location-management-apis)
4. [Pincode Management APIs](#pincode-management-apis)
5. [Service Management APIs](#service-management-apis)
6. [Common Services Management APIs](#common-services-management-apis)
7. [Customer Management APIs](#customer-management-apis)
8. [Service Provider Management APIs](#service-provider-management-apis)
9. [Order Management APIs](#order-management-apis)
10. [Sub-Admin Management APIs](#sub-admin-management-apis)
11. [Smart Messages Management APIs](#smart-messages-management-apis)
12. [Feedback Management APIs](#feedback-management-apis)
13. [Video Management APIs](#video-management-apis)
14. [Settings Management APIs](#settings-management-apis)
15. [Notification & Preferences APIs](#notification--preferences-apis)
16. [File Management APIs](#file-management-apis)
17. [Profile & Account APIs](#profile--account-apis)

---

## Admin Authentication APIs

### 1. Admin Sign In

**Endpoint**: `POST /admin/signin`

**Purpose**: Authenticate admin users (Super Admin or Sub Admin)

**Used In**: `SignIn.tsx`

**Request Body**:
```json
{
  "email": "admin@servicesphere.de",
  "password": "secureAdminPassword"
}
```

**Response**:
```json
{
  "token": "jwt_admin_token_here",
  "user": {
    "id": 1,
    "email": "admin@servicesphere.de",
    "firstName": "Admin",
    "lastName": "User",
    "roleId": 1
  },
  "message": "Login successful"
}
```

**Role IDs**:
- `1` = Super Admin (full access)
- `2` = Sub Admin (limited access)

---

### 2. Change Admin Password

**Endpoint**: `POST /admin/updatepassword`

**Purpose**: Update admin user password

**Used In**: `ChangePassword.tsx`

**Request Body**:
```json
{
  "userId": 1,
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

**Role Access**: Both Super Admin and Sub Admin

---

## Dashboard & Analytics APIs

These endpoints provide statistical data for the admin dashboard. All require POST requests with filters.

### 1. Total Sales

**Endpoint**: `POST /admin/total-sales`

**Purpose**: Get total sales/revenue statistics

**Used In**: `DashboardPartners.tsx`

**Request Body**:
```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-11-28",
  "cityId": null
}
```

**Response**:
```json
{
  "fetchedData": {
    "finalAmount": 125000.00,
    "count": 450,
    "currency": "EUR"
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Total Services

**Endpoint**: `POST /admin/total-services`

**Purpose**: Get count of total services

**Used In**: `DashboardCustomers.tsx`

**Request Body**:
```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-11-28"
}
```

**Response**:
```json
{
  "fetchedData": 15
}
```

---

### 3. Total Services by Status

**Endpoint**: `POST /admin/total-services/by-status`

**Purpose**: Get service count grouped by status

**Used In**: `DashboardPartners.tsx`

**Response**:
```json
{
  "fetchedData": [
    { "status": "active", "count": 12 },
    { "status": "inactive", "count": 3 }
  ]
}
```

---

### 4. Total Customers

**Endpoint**: `POST /admin/total-customers`

**Purpose**: Get total customer count

**Used In**: `DashboardCustomers.tsx`

**Response**:
```json
{
  "fetchedData": 1250
}
```

---

### 5. Total Customers by Status

**Endpoint**: `POST /admin/total-customers/by-status`

**Purpose**: Get customer count by verification status

**Used In**: `DashboardCustomers.tsx`

**Response**:
```json
{
  "fetchedData": [
    { "status": "verified", "count": 1100 },
    { "status": "unverified", "count": 150 }
  ]
}
```

---

### 6. Total Service Providers

**Endpoint**: `POST /admin/total-serviceproviders`

**Purpose**: Get total service provider count

**Used In**: `DashboardPartners.tsx`

**Response**:
```json
{
  "fetchedData": 340
}
```

---

### 7. Top Customers

**Endpoint**: `POST /admin/top-customers`

**Purpose**: Get list of top customers by spending/bookings

**Used In**: `DashboardCustomers.tsx`

**Request Body**:
```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-11-28",
  "limit": 10
}
```

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "totalBookings": 15,
      "totalSpent": 2500.00
    }
  ]
}
```

---

### 8. Top Service Providers

**Endpoint**: `POST /admin/top-serviceproviders`

**Purpose**: Get list of top service providers by earnings/jobs

**Used In**: `DashboardPartners.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 456,
      "companyName": "Smith Services GmbH",
      "email": "jane@smith-services.de",
      "totalJobs": 85,
      "totalEarnings": 15000.00,
      "rating": 4.8
    }
  ]
}
```

---

### 9. Top Services

**Endpoint**: `POST /admin/top-services`

**Purpose**: Get most popular services by booking count

**Used In**: `DashboardCustomers.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "name": "Electrical Services",
      "bookingCount": 280,
      "revenue": 45000.00
    }
  ]
}
```

---

### 10. Top Services by Sales

**Endpoint**: `POST /admin/top-services/by-sales`

**Purpose**: Get services ranked by revenue generated

**Used In**: `DashboardPartners.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "name": "Electrical Services",
      "totalSales": 45000.00,
      "bookingCount": 280
    }
  ]
}
```

---

## Location Management APIs

These endpoints manage countries, states, and cities where ServiceSphere operates.

### 1. Get All Locations

**Endpoint**: `GET /admin/locations`

**Purpose**: Fetch all location hierarchies (countries → states → cities)

**Used In**: `Locations.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "name": "Germany",
      "code": "DE",
      "states": [
        {
          "id": 10,
          "name": "Berlin",
          "cities": [
            { "id": 100, "name": "Berlin", "isActive": true }
          ]
        }
      ]
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Get Countries

**Endpoint**: `GET /admin/countries`

**Purpose**: Fetch list of countries

**Used In**: Location dropdowns

**Role Access**: Super Admin only

---

### 3. Get States

**Endpoint**: `GET /admin/states`

**Purpose**: Fetch list of states

**Role Access**: Super Admin only

---

### 4. Get Cities

**Endpoint**: `GET /admin/cities`

**Purpose**: Fetch list of cities

**Role Access**: Super Admin only

---

### 5. Get Locations by Country

**Endpoint**: `GET /admin/locations/by-country`

**Purpose**: Fetch all locations filtered by country

**Used In**: Cascading location selectors

**Role Access**: Super Admin only

---

### 6. Get Locations by State

**Endpoint**: `GET /admin/locations/by-state`

**Purpose**: Fetch all locations filtered by state

**Role Access**: Super Admin only

---

### 7. Get Locations by City

**Endpoint**: `GET /admin/locations/by-city`

**Purpose**: Fetch all locations filtered by city

**Role Access**: Super Admin only

---

### 8. Get Location by ID

**Endpoint**: `GET /admin/locations/{id}`

**Purpose**: Fetch single location details

**Used In**: `AddLocation.tsx` (edit mode)

**Response**:
```json
{
  "fetchedData": {
    "id": 100,
    "name": "Berlin",
    "type": "city",
    "parentId": 10,
    "isActive": true
  }
}
```

**Role Access**: Super Admin only

---

### 9. Add Location

**Endpoint**: `POST /admin/addlocation`

**Purpose**: Create new location (country, state, or city)

**Used In**: `AddLocation.tsx`

**Request Body**:
```json
{
  "name": "Munich",
  "type": "city",
  "parentId": 11,
  "isActive": true
}
```

**Response**:
```json
{
  "location": {
    "id": 101,
    "name": "Munich",
    "createdAt": "2025-11-28T10:00:00Z"
  },
  "message": "Location added successfully"
}
```

**Role Access**: Super Admin only

---

### 10. Update Location

**Endpoint**: `PUT /admin/updatelocation`

**Purpose**: Modify existing location

**Used In**: `AddLocation.tsx` (edit mode)

**Request Body**:
```json
{
  "id": 101,
  "name": "München",
  "isActive": true
}
```

**Role Access**: Super Admin only

---

## Pincode Management APIs

These endpoints manage serviceable postal codes for each city.

### 1. Get All Pincodes

**Endpoint**: `GET /admin/pincodes`

**Purpose**: Fetch all pincodes with associated city information

**Used In**: `Pincodes.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "pincode": "10115",
      "cityId": 100,
      "city": { "name": "Berlin" },
      "isActive": true
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Get Pincodes by City

**Endpoint**: `GET /admin/pincodes/by-city/{cityId}`

**Purpose**: Fetch pincodes for specific city

**Used In**: `AddPincode.tsx`, customer/provider address forms

**Response**:
```json
{
  "fetchedData": [
    { "id": 1, "pincode": "10115", "isActive": true },
    { "id": 2, "pincode": "10117", "isActive": true }
  ]
}
```

**Role Access**: Super Admin only (for management), All users (for validation)

---

### 3. Get Pincode by ID

**Endpoint**: `GET /admin/pincodes/by-id/{id}`

**Purpose**: Fetch single pincode details

**Used In**: `AddPincode.tsx` (edit mode)

**Role Access**: Super Admin only

---

### 4. Add Pincode

**Endpoint**: `POST /admin/addpincode`

**Purpose**: Add new serviceable pincode

**Used In**: `AddPincode.tsx`

**Request Body**:
```json
{
  "pincode": "10115",
  "cityId": 100,
  "isActive": true
}
```

**Role Access**: Super Admin only

---

### 5. Update Pincode

**Endpoint**: `PUT /admin/updatepincode`

**Purpose**: Modify existing pincode

**Used In**: `AddPincode.tsx` (edit mode)

**Role Access**: Super Admin only

---

## Service Management APIs

These endpoints manage service categories displayed on the web app.

### 1. Get All Services

**Endpoint**: `GET /admin/services/?lang=en`

**Purpose**: Fetch all service categories

**Used In**: `Services.tsx`

**Query Parameters**:
- `lang`: Language code (en/de)

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "name": "Electrical Services",
      "description": "Professional electrical work",
      "image": "https://cdn.example.com/electrical.jpg",
      "commonServiceId": 5,
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Get Service by ID

**Endpoint**: `GET /admin/services/{id}`

**Purpose**: Fetch single service details

**Used In**: `AddService.tsx` (edit mode)

**Response**:
```json
{
  "fetchedData": {
    "id": 1,
    "name": "Electrical Services",
    "name_de": "Elektrische Dienstleistungen",
    "description": "Professional electrical work",
    "description_de": "Professionelle Elektroarbeiten",
    "image": "https://cdn.example.com/electrical.jpg",
    "commonServiceId": 5,
    "isActive": true
  }
}
```

**Role Access**: Super Admin only

---

### 3. Add Service

**Endpoint**: `POST /admin/addservice`

**Purpose**: Create new service category

**Used In**: `AddService.tsx`

**Request Body**:
```json
{
  "name": "Plumbing Services",
  "name_de": "Sanitärdienstleistungen",
  "description": "Professional plumbing work",
  "description_de": "Professionelle Sanitärarbeiten",
  "image": "https://cdn.example.com/plumbing.jpg",
  "commonServiceId": 6,
  "isActive": true
}
```

**Response**:
```json
{
  "service": {
    "id": 2,
    "name": "Plumbing Services",
    "createdAt": "2025-11-28T10:00:00Z"
  },
  "message": "Service added successfully"
}
```

**Role Access**: Super Admin only

**Impact on Web App**:
- Service appears in homepage services section
- Available for customer booking
- Service providers can register for this service

---

### 4. Update Service

**Endpoint**: `PUT /admin/updateservice`

**Purpose**: Modify existing service

**Used In**: `AddService.tsx` (edit mode)

**Request Body**:
```json
{
  "id": 2,
  "name": "Plumbing & Heating Services",
  "isActive": true
}
```

**Role Access**: Super Admin only

**Impact on Web App**: Changes reflect immediately on homepage and booking flows

---

## Common Services Management APIs

Common services are reusable service templates with standardized pricing and descriptions.

### 1. Get All Common Services

**Endpoint**: `GET /admin/common-services/?lang=en`

**Purpose**: Fetch all common service templates

**Used In**: `CommonServices.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 5,
      "name": "Standard Electrical Inspection",
      "description": "Comprehensive electrical system inspection",
      "estimatedDuration": "2-3 hours",
      "defaultPrice": 150.00,
      "isActive": true
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Get Common Service by ID

**Endpoint**: `GET /admin/common-services/{id}`

**Purpose**: Fetch single common service details

**Used In**: `AddCommonService.tsx` (edit mode)

**Role Access**: Super Admin only

---

### 3. Add Common Service

**Endpoint**: `POST /admin/add-common-service`

**Purpose**: Create new common service template

**Used In**: `AddCommonService.tsx`

**Request Body**:
```json
{
  "name": "Emergency Electrical Repair",
  "name_de": "Elektrischer Notfallreparatur",
  "description": "24/7 emergency electrical repairs",
  "description_de": "24/7 elektrische Notfallreparaturen",
  "estimatedDuration": "1-2 hours",
  "defaultPrice": 200.00,
  "isActive": true
}
```

**Role Access**: Super Admin only

---

### 4. Update Common Service

**Endpoint**: `PUT /admin/update-common-service`

**Purpose**: Modify existing common service template

**Used In**: `AddCommonService.tsx` (edit mode)

**Role Access**: Super Admin only

---

## Customer Management APIs

### 1. Get All Customers

**Endpoint**: `GET /admin/customers`

**Purpose**: Fetch list of all registered customers

**Used In**: `Customers.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 123,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+4915141234567",
      "cityId": 100,
      "city": { "name": "Berlin" },
      "isVerified": true,
      "isActive": true,
      "totalBookings": 15,
      "createdAt": "2025-01-10T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Get Customer by ID

**Endpoint**: `GET /admin/customers/{id}`

**Purpose**: Fetch detailed customer profile

**Used In**: `AddCustomer.tsx` (edit mode), customer detail pages

**Response**:
```json
{
  "fetchedData": {
    "id": 123,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+4915141234567",
    "cityId": 100,
    "isVerified": true,
    "isActive": true,
    "addresses": [
      {
        "id": 1,
        "street": "Hauptstraße 15",
        "pincode": "10115",
        "isPrimary": true
      }
    ],
    "stats": {
      "totalBookings": 15,
      "completedBookings": 12,
      "totalSpent": 2500.00
    }
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 3. Get Customer's Booked Services

**Endpoint**: `GET /admin/customers/{id}/booked-services`

**Purpose**: Fetch all bookings made by customer

**Used In**: `AllCustomersBookedServices.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 789,
      "bookingNumber": "BK-2025-001234",
      "service": { "name": "Electrical Services" },
      "status": "completed",
      "amount": 150.00,
      "createdAt": "2025-10-15T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 4. Add Customer

**Endpoint**: `POST /admin/addcustomer`

**Purpose**: Create new customer account (admin-initiated)

**Used In**: `AddCustomer.tsx`

**Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+4915141234567",
  "password": "temporaryPassword123",
  "cityId": 100,
  "isVerified": true,
  "address": {
    "street": "Berliner Str. 20",
    "pincode": "10115"
  }
}
```

**Response**:
```json
{
  "customer": {
    "id": 124,
    "email": "jane@example.com",
    "createdAt": "2025-11-28T10:00:00Z"
  },
  "message": "Customer created successfully"
}
```

**Role Access**: Super Admin & Sub Admin

---

### 5. Update Customer

**Endpoint**: `PUT /admin/updatecustomer`

**Purpose**: Modify customer account details

**Used In**: `AddCustomer.tsx` (edit mode)

**Request Body**:
```json
{
  "id": 124,
  "firstName": "Jane Updated",
  "isActive": true
}
```

**Role Access**: Super Admin & Sub Admin

---

### 6. Customer Address Operations

**Add Address**: `POST /admin/customers/{id}/add-address`

**Update Address**: `PUT /admin/customers/{id}/update-address`

**Get Address**: `GET /admin/customers/{id}/address/{addressId}`

**Used In**: `AddCustomer.tsx` (address management section)

**Role Access**: Super Admin & Sub Admin

---

## Service Provider Management APIs

### 1. Get All Service Providers

**Endpoint**: `GET /admin/service-providers`

**Purpose**: Fetch list of all registered service providers

**Used In**: `ServiceProviders.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 456,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@smith-services.de",
      "phone": "+4915141234567",
      "companyName": "Smith Services GmbH",
      "cityId": 100,
      "city": { "name": "Berlin" },
      "services": [
        { "id": 1, "name": "Electrical Services" },
        { "id": 5, "name": "Plumbing" }
      ],
      "status": "approved",
      "rating": 4.7,
      "totalJobs": 85,
      "isVerified": true,
      "isActive": true,
      "createdAt": "2025-02-01T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Get Service Provider by ID

**Endpoint**: `GET /admin/service-providers/{id}`

**Purpose**: Fetch detailed service provider profile

**Used In**: `AddServiceProvider.tsx` (edit mode)

**Response**:
```json
{
  "fetchedData": {
    "id": 456,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@smith-services.de",
    "phone": "+4915141234567",
    "companyName": "Smith Services GmbH",
    "cityId": 100,
    "services": [1, 5],
    "addresses": [
      {
        "id": 10,
        "street": "Geschäftsstraße 20",
        "pincode": "10115",
        "isPrimary": true
      }
    ],
    "status": "approved",
    "rating": 4.7,
    "stats": {
      "totalJobs": 85,
      "completedJobs": 80,
      "totalEarnings": 15000.00
    },
    "documents": [
      { "type": "business_license", "url": "https://..." }
    ]
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 3. Get Service Provider's Customers

**Endpoint**: `GET /admin/service-providers/{id}/customers`

**Purpose**: Fetch all customers served by provider

**Used In**: `AllServiceProvidersCustomers.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "customerId": 123,
      "customerName": "John Doe",
      "totalJobs": 5,
      "totalRevenue": 750.00,
      "lastJobDate": "2025-11-15T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 4. Get Service Provider's Services

**Endpoint**: `GET /admin/service-providers/{id}/services`

**Purpose**: Fetch services offered by provider

**Used In**: `AllServiceProvidersServices.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "serviceId": 1,
      "serviceName": "Electrical Services",
      "address": {
        "id": 10,
        "street": "Geschäftsstraße 20",
        "city": "Berlin"
      },
      "isActive": true
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 5. Service Provider Review Summary

**Endpoint**: `POST /admin/service-providers/{id}/review-summary`

**Purpose**: Get aggregated review statistics for provider

**Used In**: `ServiceProviderReviewSummary.tsx`

**Request Body**:
```json
{
  "serviceProviderId": 456,
  "startDate": "2025-01-01",
  "endDate": "2025-11-28"
}
```

**Response**:
```json
{
  "fetchedData": {
    "averageRating": 4.7,
    "totalReviews": 75,
    "ratingDistribution": {
      "5": 50,
      "4": 20,
      "3": 4,
      "2": 1,
      "1": 0
    },
    "recentReviews": [
      {
        "customerName": "John Doe",
        "rating": 5,
        "comment": "Excellent work!",
        "createdAt": "2025-11-20T10:00:00Z"
      }
    ]
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 6. Add Service Provider

**Endpoint**: `POST /admin/add-serviceprovider`

**Purpose**: Create new service provider account

**Used In**: `AddServiceProvider.tsx`

**Request Body**:
```json
{
  "firstName": "Mike",
  "lastName": "Johnson",
  "email": "mike@johnson-electric.de",
  "phone": "+4915141234567",
  "password": "temporaryPassword123",
  "companyName": "Johnson Electric GmbH",
  "cityId": 100,
  "services": [1],
  "status": "pending",
  "address": {
    "street": "Industriestraße 45",
    "pincode": "10115"
  }
}
```

**Response**:
```json
{
  "serviceProvider": {
    "id": 457,
    "email": "mike@johnson-electric.de",
    "status": "pending",
    "createdAt": "2025-11-28T10:00:00Z"
  },
  "message": "Service provider created successfully"
}
```

**Role Access**: Super Admin & Sub Admin

---

### 7. Update Service Provider

**Endpoint**: `PUT /admin/update-serviceprovider`

**Purpose**: Modify service provider account

**Used In**: `AddServiceProvider.tsx` (edit mode)

**Request Body**:
```json
{
  "id": 457,
  "status": "approved",
  "services": [1, 5],
  "isActive": true
}
```

**Role Access**: Super Admin & Sub Admin

**Impact on Web App**:
- Approved providers can receive booking requests
- Status changes affect provider's access to web portal

---

### 8. Service Provider Address Operations

**Add Address**: `POST /admin/service-providers/{id}/add-address`

**Update Address**: `PUT /admin/service-providers/{id}/update-address`

**Used In**: `AddServiceProvider.tsx`

**Role Access**: Super Admin & Sub Admin

---

## Order Management APIs

### 1. Get Customer Orders

**Endpoint**: `POST /admin/orders/by-customers`

**Purpose**: Fetch all orders with customer perspective

**Used In**: `AllOrdersCustomers.tsx` (Orders > Customer Orders)

**Request Body**:
```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-11-28",
  "status": null,
  "cityId": null,
  "page": 1,
  "limit": 20
}
```

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 789,
      "bookingNumber": "BK-2025-001234",
      "customer": {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "service": {
        "id": 1,
        "name": "Electrical Services"
      },
      "address": {
        "street": "Hauptstraße 15",
        "city": "Berlin",
        "pincode": "10115"
      },
      "status": "completed",
      "amount": 150.00,
      "quotationsCount": 3,
      "selectedQuotation": {
        "serviceProviderId": 456,
        "serviceProviderName": "Smith Services GmbH"
      },
      "createdAt": "2025-10-15T10:00:00Z",
      "completedAt": "2025-10-20T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 450,
    "page": 1,
    "pages": 23,
    "limit": 20
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Get Service Provider Orders

**Endpoint**: `POST /admin/orders/by-serviceproviders`

**Purpose**: Fetch all orders with service provider perspective

**Used In**: `AllOrdersServiceProviders.tsx` (Orders > Service Provider Orders)

**Request Body**: Same as customer orders

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 789,
      "bookingNumber": "BK-2025-001234",
      "serviceProvider": {
        "id": 456,
        "companyName": "Smith Services GmbH",
        "email": "jane@smith-services.de"
      },
      "customer": {
        "id": 123,
        "name": "John Doe"
      },
      "service": {
        "id": 1,
        "name": "Electrical Services"
      },
      "quotation": {
        "id": 101,
        "amount": 150.00,
        "status": "accepted"
      },
      "jobStatus": "completed",
      "paymentStatus": "paid",
      "commissionAmount": 12.00,
      "createdAt": "2025-10-15T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

**Key Insights**:
- Admin sees commission earned on each job
- Can track payment statuses
- Monitor service provider performance

---

## Sub-Admin Management APIs

### 1. Get All Sub-Admins

**Endpoint**: `GET /admin/subadmins`

**Purpose**: Fetch list of all sub-admin accounts

**Used In**: `SubAdmins.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 2,
      "firstName": "Sarah",
      "lastName": "Wilson",
      "email": "sarah@servicesphere.de",
      "roleId": 2,
      "isActive": true,
      "createdAt": "2025-03-01T10:00:00Z",
      "lastLogin": "2025-11-28T08:30:00Z"
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Add Sub-Admin

**Endpoint**: `POST /admin/addsubadmin`

**Purpose**: Create new sub-admin account

**Used In**: `AddSubAdmin.tsx`

**Request Body**:
```json
{
  "firstName": "Tom",
  "lastName": "Anderson",
  "email": "tom@servicesphere.de",
  "password": "temporaryPassword123",
  "roleId": 2,
  "isActive": true
}
```

**Role Access**: Super Admin only

**Impact**: Sub-admin gets limited access to admin panel features

---

## Smart Messages Management APIs

Smart messages are pre-configured message templates used throughout the platform.

### 1. Get All Smart Messages

**Endpoint**: `GET /admin/smart-messages/?lang=en`

**Purpose**: Fetch all smart message templates

**Used In**: `SmartMessages.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1,
      "name": "finance_option",
      "title": "Finance Options Available",
      "message": "We offer flexible payment plans for your service.",
      "type": "info",
      "isActive": true
    }
  ]
}
```

**Role Access**: Super Admin only

---

### 2. Get Smart Message by ID

**Endpoint**: `GET /admin/smart-messages/{id}`

**Purpose**: Fetch single smart message details

**Used In**: `AddSmartMessage.tsx` (edit mode)

**Role Access**: Super Admin only

---

### 3. Add Smart Message

**Endpoint**: `POST /admin/add-smart-message`

**Purpose**: Create new smart message template

**Used In**: `AddSmartMessage.tsx`

**Request Body**:
```json
{
  "name": "booking_confirmation",
  "title": "Booking Confirmed",
  "title_de": "Buchung bestätigt",
  "message": "Your booking has been confirmed. We'll notify you when service providers submit quotes.",
  "message_de": "Ihre Buchung wurde bestätigt. Wir benachrichtigen Sie, wenn Dienstleister Angebote einreichen.",
  "type": "success",
  "isActive": true
}
```

**Role Access**: Super Admin only

**Impact on Web App**: Messages appear in booking flows, notifications, and UI prompts

---

### 4. Update Smart Message

**Endpoint**: `PUT /admin/update-smart-message`

**Purpose**: Modify existing smart message

**Used In**: `AddSmartMessage.tsx` (edit mode)

**Role Access**: Super Admin only

---

## Feedback Management APIs

### 1. Get All Feedbacks

**Endpoint**: `GET /admin/customerfeedbacks`

**Purpose**: Fetch all customer feedbacks/reviews

**Used In**: `Feedbacks.tsx`

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 1001,
      "customer": {
        "id": 123,
        "name": "John Doe"
      },
      "serviceProvider": {
        "id": 456,
        "companyName": "Smith Services GmbH"
      },
      "booking": {
        "id": 789,
        "bookingNumber": "BK-2025-001234",
        "service": { "name": "Electrical Services" }
      },
      "rating": 5,
      "comment": "Excellent service! Very professional and timely.",
      "createdAt": "2025-11-15T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

## Video Management APIs

### 1. Add/Upload Video

**Endpoint**: `POST /admin/add-video`

**Purpose**: Upload video (e.g., intro video for homepage)

**Used In**: `UploadVideo.tsx`

**Request**: multipart/form-data

**Request Body**:
```json
{
  "title": "intro_en",
  "video": <file>,
  "description": "Homepage intro video in English"
}
```

**Response**:
```json
{
  "video": {
    "id": 1,
    "title": "intro_en",
    "url": "https://cdn.example.com/videos/intro_en.mp4",
    "createdAt": "2025-11-28T10:00:00Z"
  },
  "message": "Video uploaded successfully"
}
```

**Role Access**: Super Admin only

**Impact on Web App**: Video appears on homepage "Why ServiceSphere" section

---

### 2. Upload Video File

**Endpoint**: `POST /admin/upload-video`

**Purpose**: Raw video file upload (returns URL)

**Used In**: Various upload forms

**Response**:
```json
{
  "url": "https://cdn.example.com/videos/uploaded-video.mp4"
}
```

**Role Access**: Super Admin only

---

## Settings Management APIs

### 1. Get Settings

**Endpoint**: `GET /admin/settings`

**Purpose**: Fetch platform settings and configuration

**Used In**: `Settings.tsx`

**Response**:
```json
{
  "fetchedData": {
    "id": 1,
    "platformName": "ServiceSphere",
    "supportEmail": "contact@servicesphere.de",
    "supportPhone": "+4915141412851",
    "commissionRate": 8,
    "currency": "EUR",
    "stripePublicKey": "pk_live_xxxx",
    "stripeSecretKey": "sk_live_xxxx",
    "smtpHost": "smtp.example.com",
    "smtpPort": 587,
    "defaultLanguage": "de",
    "maintenanceMode": false
  }
}
```

**Role Access**: Super Admin only

---

### 2. Update Settings

**Endpoint**: `PUT /admin/updatesettings`

**Purpose**: Modify platform settings

**Used In**: `Settings.tsx`

**Request Body**:
```json
{
  "commissionRate": 10,
  "supportEmail": "support@servicesphere.de",
  "maintenanceMode": false
}
```

**Role Access**: Super Admin only

**Impact on Web App**:
- Commission rate affects service provider earnings
- Maintenance mode can disable web app access
- Payment keys affect checkout functionality

---

## Notification & Preferences APIs

### 1. Get Admin Notifications

**Endpoint**: `GET /admin/notifications/by-user/{id}`

**Purpose**: Fetch notifications for admin user

**Used In**: Admin header notification bell

**Response**:
```json
{
  "fetchedData": [
    {
      "id": 5001,
      "title": "New Service Provider Registration",
      "message": "Smith Services GmbH has registered and needs approval",
      "type": "action_required",
      "isRead": false,
      "createdAt": "2025-11-28T10:00:00Z"
    }
  ]
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Update Notification

**Endpoint**: `POST /admin/update-notification`

**Purpose**: Mark notification as read

**Used In**: Notification management

**Request Body**:
```json
{
  "id": 5001,
  "isRead": true
}
```

**Role Access**: Super Admin & Sub Admin

---

### 3. Get Notification Preferences

**Endpoint**: `GET /admin/notify-preferrences?type={type}`

**Purpose**: Fetch notification preference settings

**Used In**: `SettingsNotificationPrefs.tsx`

**Query Parameters**:
- `type`: Notification category (email, sms, push)

**Response**:
```json
{
  "fetchedData": {
    "emailNotifications": true,
    "smsNotifications": false,
    "pushNotifications": true,
    "categories": {
      "newRegistrations": true,
      "newBookings": true,
      "paymentAlerts": true
    }
  }
}
```

**Role Access**: Super Admin & Sub Admin

---

### 4. Update Notification Preferences

**Endpoint**: `POST /admin/update-notify-preferrence`

**Purpose**: Modify notification preferences

**Used In**: `SettingsNotificationPrefsItem.tsx`

**Request Body**:
```json
{
  "userId": 1,
  "emailNotifications": true,
  "newRegistrations": false
}
```

**Role Access**: Super Admin & Sub Admin

---

### 5. Get Preference History

**Endpoint**: `GET /admin/preferrences/history`

**Purpose**: Fetch history of preference changes

**Used In**: Settings audit logs

**Role Access**: Super Admin only

---

## File Management APIs

### 1. Upload Image

**Endpoint**: `POST /admin/upload`

**Purpose**: Upload image files (services, profiles, etc.)

**Used In**: Multiple forms throughout admin panel

**Request**: multipart/form-data

**Response**:
```json
{
  "url": "https://cdn.example.com/images/uploaded-image.jpg"
}
```

**Role Access**: Super Admin & Sub Admin

---

### 2. Delete Image

**Endpoint**: `POST /admin/delete-image`

**Purpose**: Remove uploaded image

**Used In**: Image management in various forms

**Request Body**:
```json
{
  "url": "https://cdn.example.com/images/old-image.jpg"
}
```

**Role Access**: Super Admin & Sub Admin

---

## Profile & Account APIs

### 1. Get Admin User Profile

**Endpoint**: `GET /admin/users/{userId}`

**Purpose**: Fetch admin user profile details

**Used In**: `Profile.tsx`

**Response**:
```json
{
  "fetchedData": {
    "id": 1,
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@servicesphere.de",
    "roleId": 1,
    "createdAt": "2024-01-01T10:00:00Z",
    "lastLogin": "2025-11-28T08:00:00Z"
  }
}
```

**Role Access**: Super Admin & Sub Admin (own profile)

---

### 2. Update Admin User Profile

**Endpoint**: `PUT /admin/updateuser`

**Purpose**: Modify admin user profile

**Used In**: `Profile.tsx`

**Request Body**:
```json
{
  "id": 1,
  "firstName": "Admin Updated",
  "lastName": "User"
}
```

**Role Access**: Super Admin & Sub Admin (own profile)

---

### 3. Delete Admin Account

**Endpoint**: `POST /admin/delete-account`

**Purpose**: Delete admin account

**Used In**: `ProfileDeleteAccountConfirmation.tsx`

**Request Body**:
```json
{
  "userId": 2,
  "password": "currentPassword123"
}
```

**Role Access**: Super Admin (can delete sub-admins), Sub Admin (can delete own account)

---

## General/Utility APIs

### 1. Get Languages

**Endpoint**: `GET /general/languages`

**Purpose**: Fetch list of supported languages

**Used In**: Language selectors throughout admin panel

**Response**:
```json
{
  "fetchedData": [
    { "code": "en", "name": "English", "nativeName": "English" },
    { "code": "de", "name": "German", "nativeName": "Deutsch" }
  ]
}
```

**Role Access**: Public (no auth required)

---

## Role-Based Access Summary

### Super Admin (roleId: 1) - Full Access

**Exclusive Features**:
- Location Management (countries, states, cities)
- Pincode Management
- Service Management
- Common Services Management
- Sub-Admin Management
- Smart Messages Management
- Video Management
- Settings Management
- Notification Preference History

**Shared Features** (with Sub Admin):
- Dashboard & Analytics
- Customer Management
- Service Provider Management
- Order Management
- Feedback Management
- Notifications
- Profile Management

### Sub Admin (roleId: 2) - Limited Access

**Allowed Features**:
- Dashboard & Analytics (read-only in some areas)
- Customer Management (CRUD)
- Service Provider Management (CRUD, but cannot change approval status)
- Order Management (view and monitor)
- Feedback Management (view only)
- Notifications
- Profile Management (own profile only)

**Restricted Features**:
- Cannot manage locations, pincodes, services
- Cannot create/manage other sub-admins
- Cannot access platform settings
- Cannot upload videos
- Cannot manage smart messages

---

## API Authentication

### Authentication Pattern:

All admin endpoints require JWT token in Authorization header:

```
Authorization: Bearer {admin_jwt_token}
```

### Token Storage:

- **Admin Token**: `localStorage.getItem("spe_admin_token")`
- **Admin User ID**: `localStorage.getItem("spe_admin_userId")`

### Token Verification:

API validates:
1. Token signature
2. Token expiration
3. Admin role ID (1 or 2)
4. Feature access based on role

### Session Timeout:

- API returns **440 status** for expired sessions
- Admin redirected to `/sign-in`
- Must re-authenticate

---

## Error Handling

### Standard HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient role permissions)
- `404` - Not Found
- `440` - Session Timeout
- `500` - Internal Server Error

### Role-Based Errors:

- Sub-admin accessing Super-admin feature → `403 Forbidden`
- Missing roleId validation → Redirect to `/not-authorised`

---

## Data Flow: Admin → Web App

### Content Managed by Admin That Appears on Web:

1. **Services** (Admin Panel) → Homepage services section (Web)
2. **Intro Video** (Admin Panel) → Homepage video section (Web)
3. **Locations** (Admin Panel) → Booking location dropdowns (Web)
4. **Pincodes** (Admin Panel) → Address validation (Web)
5. **Common Services** (Admin Panel) → Booking details templates (Web)
6. **Smart Messages** (Admin Panel) → UI messages/notifications (Web)
7. **Settings** (Admin Panel) → Payment keys, commission rates (Web + Backend)

### Real-Time Impact:

- Changes to services reflect immediately on homepage
- Approving service provider enables them to receive bookings
- Adding pincodes expands serviceable areas
- Updating settings affects payment processing

---

## Commission & Revenue Tracking

### Commission Calculation:

- Set in Settings: `commissionRate` (default: 8%)
- Applied to each completed booking
- Example: Customer pays €150 → Service provider earns €138 → Admin earns €12

### Revenue APIs:

- `POST /admin/total-sales` - Total platform revenue
- `POST /admin/orders/by-serviceproviders` - Shows commission per order
- Dashboard shows aggregated commission earnings

---

## API Base URL Configuration

Configured via environment variables:

```env
VITE_API_ENDPOINT=https://api.servicesphere.de
```

Managed in `config.ts`:
- Development mode: `http://localhost:3000`
- Staging mode: `https://staging-api.servicesphere.de`
- Production mode: `https://api.servicesphere.de`

---

## Summary Statistics

**Total API Endpoints Documented**: 75+

**Breakdown by Category**:
- Admin Authentication: 2 endpoints
- Dashboard & Analytics: 10 endpoints
- Location Management: 10 endpoints
- Pincode Management: 5 endpoints
- Service Management: 4 endpoints
- Common Services Management: 4 endpoints
- Customer Management: 6 endpoints
- Service Provider Management: 8 endpoints
- Order Management: 2 endpoints
- Sub-Admin Management: 2 endpoints
- Smart Messages Management: 4 endpoints
- Feedback Management: 1 endpoint
- Video Management: 2 endpoints
- Settings Management: 2 endpoints
- Notification & Preferences: 5 endpoints
- File Management: 2 endpoints
- Profile & Account: 3 endpoints
- General/Utility: 1 endpoint

---

## Future API Enhancements

Potential areas for expansion:
1. Bulk import/export APIs for locations and services
2. Advanced analytics with date range filtering
3. Audit logs for all admin actions
4. Automated service provider approval workflows
5. Commission rate overrides per service provider
6. Multi-currency support
7. Advanced reporting and export capabilities
8. Webhook management for third-party integrations

---

*Last Updated: November 2025*
*Documentation maintained alongside CLAUDE.md*
