# Security and Data Policy

## Security

### Do you follow the EU privacy laws?

PlaceOS is able to demonstrate compliance with the seven protection and accountability principles outlined in Article 5.1-2 upon request.  
([What is GDPR?](https://gdpr-info.eu/art-5-gdpr/))

---

## Data

### How does PlaceOS manage, protect, and govern customer data?

Most data is not stored internally within the system. Sources of truth such as Office365 hold the data. Manipulated data is stored ephemerally in memory.  
Access to any data requires authentication; authorisation is determined by the defined processes.

### Can you please outline each type of datastore / database / data repository included in your system?

- PlaceOS uses **Couchbase** as the primary database and datastore.  
- The **PlaceOS Engine Application** does not store any data itself.  
- Access to Couchbase can be arranged depending on client security needs for data modelling and/or extraction.

### What type of data might you store?

- Device information  
- Device states  
- Configuration  
- Integration metadata  
- Secure items (e.g. passwords) — all hashed on entry using AES-256-GCM/Salted Scrypt and not human-readable

### What happens to data when customers terminate their usage of PlaceOS?

- Servers are typically hosted and managed by the customer  
- On termination, the customer can:
  - Destroy the machine and all data
  - Extract backups and then destroy the data
  - Retain the data as is

### What cryptographic protocols are used to secure client data at rest?

- **256-bit AES** using **GCM ciphers**  
- Environment variables are also encrypted on client servers

---

## Web Security & Authentication

### How does PlaceOS adhere to common security principles?

- Secure by design  
- All requests are authenticated and authorised  
- Applications and domains must be registered within PlaceOS to access APIs  
- Cookies are secure, HTTPS-only, and transmitted only on relevant paths  
- Authentication tokens are validated against domain, app, and user  
- Input is whitelisted and validated before being saved to the database

### Do you undertake periodic security testing?

Yes. The platform undergoes regular:

- Vulnerability testing  
- Penetration testing  
- Source code reviews

Customers may also perform penetration tests in production environments. Reports are often reviewed by PlaceOS. No vulnerabilities have been reported to date.

### How does PlaceOS provide least privileged role-based access control?

- Default user levels:
  - **System Administrators** – full configuration access via Web UI  
  - **Tech Support** – limited to system/device status  
  - **Staff Member** – can authenticate via SSO  

- IAM integration allows assigning specific access levels  
- No access = no back office access  
- Staff App access follows business rules, and may not require authentication

Infrastructure access is dictated by the client.

### How does PlaceOS encrypt data at rest / in-motion and manage certificates?

- **In-motion:** SSL/TLS encryption  
- **At rest:** AES 256-bit with GCM ciphers  
- **Passwords:** Salted Scrypt hashing (local accounts only; SSO preferred)

### What development and security practices are used internally?

- Tools: GitHub, BitBucket, Jira, Confluence  
- All services secured by SSO + 2FA  
- No client data or credentials stored locally  
- Access to code/client info is based on least-privileged roles/groups

---

## Infrastructure

### How is physical media destruction handled?

This is managed by the client according to standard IT practices.  
PlaceOS does **not** store any customer data outside of production/UAT/DEV environments.

---

## Third Parties

### What information does PlaceOS share with third parties?

PlaceOS does **not** share any customer data with third parties.  
All third-party integrations are securely configured by the customer or end user.

### What interfaces are available to connect with third-party services?

- **Supported protocols:** API, SOAP, REST, WebSockets, HTTPS, SSH  
- **Unsupported protocols:** FTP and other non-secure protocols

### How does PlaceOS support third-party data visualisation tools?

PlaceOS can pass data to platforms such as:

- **Splunk**  
- **Power BI**  
- **Google Analytics**

This is done via standard APIs, and sample integrations are available.
