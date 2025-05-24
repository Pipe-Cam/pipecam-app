# Sewer Inspection Report Generator - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
**Note**: Currently no authentication is implemented. This is a critical security issue that needs to be addressed.

## API Endpoints

### Client Endpoints

#### GET /client/:id
Retrieve a specific client by ID.

**Parameters:**
- `id` (path parameter): UUID of the client

**Response:**
```json
{
  "id": "uuid",
  "created": "2025-01-15T10:00:00Z",
  "last_modified": "2025-01-15T10:00:00Z",
  "client_type": "string",
  "client_status": "string",
  "organization_name": "string",
  "organization_phone": "string",
  "contact_name": "string",
  "contact_phone": "string",
  "contact_email_primary": "string",
  // ... additional fields
}
```

#### GET /recent-clients
Retrieve recently modified clients.

**Response:**
```json
[
  {
    "id": "uuid",
    "organization_name": "string",
    "contact_name": "string",
    "last_modified": "2025-01-15T10:00:00Z"
    // ... client object
  }
]
```

#### GET /archived-clients
Retrieve archived (soft-deleted) clients.

**Response:**
```json
[
  {
    "id": "uuid",
    "organization_name": "string",
    "client_status": "archived",
    // ... client object
  }
]
```

#### GET /search-for-client
Search for clients by name.

**Query Parameters:**
- `client_search` (required): Search term

**Response:**
```json
[
  {
    "id": "uuid",
    "organization_name": "string",
    "contact_name": "string",
    // ... matching clients
  }
]
```

**Error Response:**
- `"no such client exists"` - No matching clients found
- `"query failed"` - Missing search parameter

#### POST /new-client
Create a new client.

**Request Body:**
```json
{
  "client_type": "string",
  "client_status": "active",
  "organization_name": "string",
  "organization_phone": "string",
  "organization_address_street": "string",
  "organization_address_city": "string",
  "organization_address_state": "string",
  "organization_address_zip": "string",
  "contact_name": "string",
  "contact_phone": "string",
  "contact_email_primary": "string",
  // ... additional fields
}
```

**Response:**
```
"new client added"
```

#### PUT /client/:id
Update an existing client.

**Parameters:**
- `id` (path parameter): UUID of the client

**Request Body:**
```json
{
  // Any client fields to update
}
```

**Response:**
```
"client updated"
```

#### PUT /client-all
Bulk activate all clients (unclear purpose - needs clarification).

**Response:**
```
"delete inspection: success"
```

#### DELETE /client/:id
Archive a client (soft delete).

**Parameters:**
- `id` (path parameter): UUID of the client

**Response:**
- Success: `"delete client: success"`
- Error: `"delete client: failure"`

### Inspection Endpoints

#### GET /inspection/:id
Retrieve a specific inspection by ID.

**Parameters:**
- `id` (path parameter): UUID of the inspection

**Response:**
```json
{
  "id": "uuid",
  "status": "scheduled|active|completed",
  "client_id": "uuid",
  "inspection_date": "2025-01-15T10:00:00Z",
  "client": "string",
  "property_address": "string",
  "property_address_street": "string",
  "property_address_city": "string",
  "property_address_state": "string",
  "property_address_zip": "string",
  "prelisting": true,
  "root_cut": false,
  "access": {
    "1": {
      "location": "string",
      "details": {
        "pipe_diameter": "4",
        "cleanout_direction": "two_way",
        "access_material": "pvc",
        "bopd_type": "popper",
        "bopd_condition": "good"
      },
      "observations": [
        {
          "footage": "15.5",
          "upstream": true,
          "loss_of_crosssection": 20,
          "roots": {
            "roots": true,
            "modifier": {
              "in_flow_line": true,
              "continuous": false,
              "fine": true
            }
          }
        }
      ]
    }
  },
  "created": "2025-01-15T10:00:00Z",
  "last_modified": "2025-01-15T10:00:00Z"
}
```

#### GET /scheduled-inspections
Retrieve all scheduled inspections.

**Response:**
```json
[
  {
    "id": "uuid",
    "status": "scheduled",
    "client": "string",
    "property_address": "string",
    "inspection_date": "2025-01-20T10:00:00Z"
  }
]
```

#### GET /recent-inspections
Retrieve recently completed inspections.

**Response:**
```json
[
  {
    "id": "uuid",
    "status": "completed",
    "client": "string",
    "property_address": "string",
    "inspection_date": "2025-01-15T10:00:00Z",
    "last_modified": "2025-01-15T15:00:00Z"
  }
]
```

#### POST /new-inspection
Create a new inspection.

**Request Body:**
```json
{
  "status": "scheduled",
  "client_id": "uuid",
  "client": "string",
  "property_address": "string",
  "property_address_street": "string",
  "property_address_city": "string",
  "property_address_state": "string",
  "property_address_zip": "string",
  "inspection_date": "2025-01-20T10:00:00Z",
  "prelisting": true,
  "root_cut": false
}
```

**Response:**
```
"new inspection added"
```

#### PUT /inspection/:id
Update an existing inspection.

**Parameters:**
- `id` (path parameter): UUID of the inspection

**Request Body:**
```json
{
  // Any inspection fields to update
  // Common updates include:
  "status": "active|completed",
  "location": {
    "occupancy": "occupied|vacant",
    "outbuilding": "yes|no",
    "cccsd": "yes|no",
    "opening_observations": "string",
    "usb_num": "string"
  },
  "access": {
    // Access point data
  },
  "last_modified": "2025-01-15T15:00:00Z"
}
```

**Response:**
- Success: Updated inspection object
- Error: `"update failed"`

#### DELETE /inspection/:id
Delete an inspection.

**Parameters:**
- `id` (path parameter): UUID of the inspection

**Response:**
- Success: `"delete inspection: success"`
- Error: `"delete inspection: failure"`

## Database Schema

### Clients Table
```sql
create table clients (
  id uuid primary key default gen_random_uuid(),
  created timestamptz default now(),
  last_modified timestamptz default now(),
  client_type text,
  client_type_other text,
  client_status text,
  client_source text,
  client_source_other text,
  preferred_payment_type text,
  organization_name text,
  organization_phone text,
  organization_address_street text,
  organization_address_unit text,
  organization_address_city text,
  organization_address_state text,
  organization_address_zip text,
  contact_name text,
  contact_phone text,
  contact_email_primary text,
  contact_email_secondary text,
  client_address_street text,
  client_address_unit text,
  client_address_city text,
  client_address_state text,
  client_address_zip text,
  notes jsonb
);
```

### Inspections Table
```sql
create table inspections (
  id uuid primary key default gen_random_uuid(),
  status text,
  client_id uuid references clients(id),
  inspection_date timestamptz,
  client text,
  property_address text,
  property_address_street text,
  property_address_unit text,
  property_address_city text,
  property_address_state text,
  property_address_zip text,
  prelisting boolean,
  root_cut boolean,
  client_located_access boolean,
  length_of_lateral text,
  payment_status text,
  payment_status_amount numeric,
  office_notes text,
  occupancy text,
  outbuilding text,
  outbuilding_has_plumbing text,
  outbuilding_has_cleanout text,
  outbuilding_pipe_diameter text,
  outbuilding_pipe_diameter_other text,
  cccsd text,
  cccsd_unpermitted_work text,
  opening_observations text,
  usb_num text,
  access jsonb,
  created timestamptz default now(),
  last_modified timestamptz default now()
);
```

## Error Handling

The API uses standard HTTP status codes:
- `200 OK` - Successful request
- `500 Internal Server Error` - Server error

Error responses are inconsistent and should be standardized. Current error messages include:
- Plain text messages
- Empty responses with status codes
- No consistent error format

## Recommendations

1. **Implement Authentication**: Add JWT-based authentication
2. **Standardize Responses**: Use consistent JSON response format
3. **Add Validation**: Implement request body validation
4. **Error Handling**: Create standardized error response format
5. **API Versioning**: Add version prefix (e.g., `/api/v1/`)
6. **Documentation**: Generate OpenAPI/Swagger documentation
7. **Rate Limiting**: Implement rate limiting for API protection
8. **CORS Configuration**: Properly configure CORS for production