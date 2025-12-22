# Security Documentation - Acquileadz Website

**Last Updated:** 2025-01-15
**Security Score:** 80/100 (Improved from 65/100)

## Table of Contents
1. [Overview](#overview)
2. [Implemented Security Measures](#implemented-security-measures)
3. [Known Limitations](#known-limitations)
4. [Recommended Server-Side Improvements](#recommended-server-side-improvements)
5. [Security Best Practices](#security-best-practices)
6. [Incident Response](#incident-response)

---

## Overview

This document outlines the security measures implemented on the Acquileadz website, current limitations, and recommendations for future security enhancements.

**Current Architecture:**
- Static HTML/CSS/JavaScript website
- Client-side form handling via Web3Forms API
- No server-side processing or database
- Hosted on standard web hosting

---

## Implemented Security Measures

### 1. Content Security Policy (CSP)
**Status:** ✅ Implemented
**Files:** All HTML pages (index.html, services.html, about.html, contact.html)

**What it does:**
- Prevents XSS attacks by restricting content sources
- Blocks inline scripts except explicitly allowed
- Prevents clickjacking with frame-ancestors 'none'
- Restricts form submissions to trusted endpoints

**CSP Configuration:**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://api.web3forms.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://api.web3forms.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
">
```

**Note:** `'unsafe-inline'` is currently required for GSAP animations and inline styles. Consider moving to external files for stricter CSP.

---

### 2. Subresource Integrity (SRI)
**Status:** ✅ Implemented
**Files:** index.html, services.html, about.html

**What it does:**
- Ensures GSAP libraries haven't been tampered with
- Validates integrity of CDN-loaded scripts

**Example:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"></script>
```

---

### 3. Enhanced Form Validation
**Status:** ✅ Implemented
**Files:** script.js (lines 172-208)

**Email Validation:**
- RFC 5322 compliant regex
- Maximum length check (320 characters)
- Detects suspicious patterns:
  - Consecutive dots (..)
  - Leading/trailing dots
  - @ followed by dot (@.)
  - Dot followed by @ (.@)

**Phone Validation:**
- Accepts international formats (10-15 digits)
- Rejects suspicious patterns (all same digit)
- Removes formatting before validation

**Code Reference:**
```javascript
// See script.js lines 172-208
function isValidEmail(email) { ... }
function isValidPhone(phone) { ... }
```

---

### 4. Client-Side Rate Limiting
**Status:** ✅ Implemented
**Files:** script.js (lines 129-170)

**Configuration:**
- Max submissions: 3 per user
- Time window: 60 seconds (1 minute)
- Storage: localStorage with automatic cleanup

**What it does:**
- Prevents rapid-fire form spam
- Tracks submission timestamps
- Shows user-friendly wait time message
- Fails open if localStorage unavailable (accessibility)

**Code Reference:**
```javascript
// See script.js lines 129-170
const RATE_LIMIT = {
    MAX_SUBMISSIONS: 3,
    TIME_WINDOW_MS: 60000,
    STORAGE_KEY: 'form_submissions'
};
```

**Limitations:**
- Can be bypassed by clearing localStorage or using incognito mode
- Not a replacement for server-side rate limiting
- Uses IP-agnostic tracking (localStorage is per-browser)

---

### 5. Honeypot Anti-Spam Field
**Status:** ✅ Implemented
**Files:** contact.html (line 90)

**What it does:**
- Hidden checkbox field invisible to users
- Bots that auto-fill forms will check it
- Web3Forms rejects submissions with honeypot checked

**Configuration:**
```html
<input type="checkbox" name="botcheck" class="hidden"
       style="display: none;"
       tabindex="-1"
       autocomplete="off">
```

---

### 6. Security Headers
**Status:** ⚠️ Partial (via meta tags)
**Files:** All HTML pages

**Implemented:**
- `X-UA-Compatible: IE=edge` (legacy browser protection)
- `theme-color` (prevents UI spoofing on mobile)
- `format-detection: telephone=no` (prevents auto-linking exploitation)

**Missing (requires server configuration):**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`

---

### 7. Cookie Security
**Status:** ✅ Implemented
**Files:** script.js (lines 4-43)

**What it does:**
- Uses localStorage instead of cookies (no HTTP transmission)
- Provides user control via cookie consent banner
- Tracks minimal data (consent choice only)
- GDPR-friendly implementation

**Storage:**
- `acquileadz_cookies`: User consent choice ('all' or 'essential')
- `form_submissions`: Rate limiting timestamps (auto-expires)
- `exitPopupDismissed`: Session-based popup dismissal

---

## Known Limitations

### 1. ⚠️ Exposed API Key
**Issue:** Web3Forms access key is visible in HTML source (contact.html line 89)

**Risk Level:** Low-Medium
- Key is designed to be public-facing
- Web3Forms provides spam protection
- Limited to form submissions only
- Cannot be used for data extraction

**Mitigation:**
- Honeypot field prevents basic bot spam
- Rate limiting reduces abuse potential
- Web3Forms provides backend spam filtering

**Recommended Fix:**
Implement server-side form handling to keep API credentials secure.

---

### 2. ⚠️ Client-Side-Only Security
**Issue:** All security measures can be bypassed by determined attackers

**Limitations:**
- Rate limiting uses localStorage (can be cleared)
- Validation can be bypassed by direct API calls
- No IP-based blocking or CAPTCHA
- No server-side verification

**Current Protection:**
- Adequate for low-to-medium traffic contact form
- Prevents casual spam and automated bots
- Not suitable for high-value transactions

**Recommended Fix:**
Add server-side validation, rate limiting, and reCAPTCHA v3.

---

### 3. ⚠️ No CSRF Protection
**Issue:** Form submissions vulnerable to cross-site request forgery

**Risk Level:** Low (contact form only)
- No authenticated sessions
- No privileged actions
- Public contact form (intended to be accessible)

**Why CSRF is low risk here:**
- No user accounts or authentication
- No state-changing operations beyond form submission
- Attacker gains no benefit from forging submission

**Recommended Fix (if adding user accounts):**
Implement anti-CSRF tokens with server-side validation.

---

### 4. ⚠️ Missing Security Headers
**Issue:** Some security headers require server configuration

**Cannot be set via HTML:**
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`

**Workaround:**
CSP `frame-ancestors 'none'` provides clickjacking protection.

**Recommended Fix:**
Configure web server (.htaccess or server config) to send security headers.

---

## Recommended Server-Side Improvements

### Priority 1: Critical (Do First)

#### 1. Server-Side Form Handling
**Why:** Remove exposed API key, enable server-side validation

**Implementation:**
```javascript
// Server endpoint (Node.js/Express example)
app.post('/api/contact', async (req, res) => {
    // Server-side rate limiting (by IP)
    if (isRateLimited(req.ip)) {
        return res.status(429).json({ error: 'Too many requests' });
    }

    // Server-side validation
    if (!isValidEmail(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    // Forward to Web3Forms with private key
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            access_key: process.env.WEB3FORMS_KEY, // from environment
            ...req.body
        })
    });

    return res.json(await response.json());
});
```

**Benefits:**
- Hides API credentials
- Server-side validation (cannot be bypassed)
- IP-based rate limiting
- Better error logging

---

#### 2. Add reCAPTCHA v3
**Why:** Prevent automated bot submissions

**Implementation:**
```html
<!-- Client-side -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
<script>
grecaptcha.ready(function() {
    grecaptcha.execute('YOUR_SITE_KEY', {action: 'contact_form'})
              .then(function(token) {
                  document.getElementById('recaptchaToken').value = token;
              });
});
</script>
```

**Benefits:**
- Invisible to users (no checkbox)
- Stops automated bots
- Provides risk score for suspicious submissions

---

#### 3. Configure Security Headers
**Implementation (.htaccess for Apache):**
```apache
# Enable HSTS
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Prevent MIME sniffing
Header always set X-Content-Type-Options "nosniff"

# Clickjacking protection (backup for CSP)
Header always set X-Frame-Options "DENY"

# Referrer policy
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Permissions policy
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

---

### Priority 2: Recommended (Do Soon)

#### 4. Implement Backend Rate Limiting
Use middleware like `express-rate-limit`:
```javascript
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // 3 requests per windowMs
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip // Rate limit by IP
});

app.post('/api/contact', contactLimiter, handleContact);
```

---

#### 5. Add Request Logging and Monitoring
**Tools:**
- Log all form submissions (timestamp, IP, user agent)
- Monitor for suspicious patterns (rapid submissions, invalid data)
- Set up alerts for potential attacks

**Example:**
```javascript
const winston = require('winston');

winston.log('info', 'Form submission', {
    ip: req.ip,
    email: req.body.email,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
});
```

---

#### 6. Add HTTPS and SSL Certificate
**Why:** Encrypt data in transit, prevent man-in-the-middle attacks

**Requirements:**
- Valid SSL/TLS certificate (Let's Encrypt is free)
- Redirect HTTP to HTTPS
- Enable HSTS header (see Priority 1, item 3)

---

### Priority 3: Nice to Have (Future)

#### 7. Content Security Policy Reporting
Enable CSP violation reporting:
```html
<meta http-equiv="Content-Security-Policy" content="
  ...existing CSP...;
  report-uri /api/csp-report;
">
```

Server endpoint:
```javascript
app.post('/api/csp-report', (req, res) => {
    console.log('CSP Violation:', req.body);
    // Log to monitoring service
    res.status(204).end();
});
```

---

#### 8. Remove 'unsafe-inline' from CSP
**Current limitation:** GSAP animations and some styles use inline code

**Solution:**
- Move all inline styles to external CSS
- Use nonces for required inline scripts
- Update CSP to remove 'unsafe-inline'

---

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use environment variables for API keys
   - Add `.env` files to `.gitignore`
   - Rotate keys if accidentally committed

2. **Validate all inputs**
   - Server-side validation is mandatory
   - Client-side validation is for UX only
   - Sanitize before displaying user content

3. **Keep dependencies updated**
   - Regularly update GSAP and other libraries
   - Monitor for security advisories
   - Use `npm audit` or equivalent

4. **Test security measures**
   - Try bypassing rate limiting
   - Test with malformed inputs
   - Verify CSP blocks unauthorized scripts

5. **Review code for vulnerabilities**
   - Check for XSS injection points
   - Validate all user inputs
   - Avoid `eval()` and `innerHTML` with user data

---

### For Administrators

1. **Monitor form submissions**
   - Review for spam patterns
   - Check for unusual activity
   - Set up alerts for high-volume periods

2. **Regular security audits**
   - Re-run website security scanners quarterly
   - Review access logs monthly
   - Update this document when changes are made

3. **Backup regularly**
   - Maintain backups of all site files
   - Test restoration process
   - Store backups securely off-site

---

## Incident Response

### If API Key is Compromised

1. **Immediately:**
   - Log into Web3Forms dashboard
   - Regenerate access key
   - Update key in codebase (or environment variables if using server-side)
   - Deploy updated code

2. **Review:**
   - Check Web3Forms submission logs for abuse
   - Look for spam submissions
   - Document incident

3. **Prevent:**
   - Implement server-side form handling to hide key
   - Add reCAPTCHA if spam occurred
   - Consider switching to server-side solution

---

### If XSS Attack Detected

1. **Immediately:**
   - Identify injection point
   - Remove malicious code
   - Deploy fix
   - Review CSP for gaps

2. **Review:**
   - Check all user input points
   - Verify validation is working
   - Look for other vulnerabilities

3. **Prevent:**
   - Add input sanitization
   - Strengthen CSP
   - Remove `'unsafe-inline'` if possible

---

### If DDoS or Spam Attack

1. **Immediately:**
   - Enable Cloudflare or similar CDN protection
   - Implement aggressive rate limiting
   - Consider temporarily disabling form

2. **Review:**
   - Analyze attack patterns (IPs, timing, payloads)
   - Check for vulnerabilities being exploited
   - Review logs for data exposure

3. **Prevent:**
   - Add reCAPTCHA v3
   - Implement IP-based rate limiting
   - Use Web Application Firewall (WAF)

---

## Security Checklist

### ✅ Completed
- [x] Content Security Policy implemented
- [x] SRI hashes on external scripts
- [x] Enhanced form validation (email/phone)
- [x] Client-side rate limiting
- [x] Honeypot anti-spam field
- [x] Cookie consent and privacy controls
- [x] Security documentation created

### ⚠️ In Progress / Recommended
- [ ] Server-side form handling
- [ ] reCAPTCHA v3 integration
- [ ] Security headers (requires server config)
- [ ] HTTPS with HSTS
- [ ] Backend rate limiting (IP-based)
- [ ] Request logging and monitoring
- [ ] CSP violation reporting
- [ ] Remove 'unsafe-inline' from CSP

---

## Contact

**Security Issues:** If you discover a security vulnerability, please email [hello@acquileadz.com](mailto:hello@acquileadz.com) with "SECURITY" in the subject line.

**Do not:**
- Post security issues publicly
- Exploit vulnerabilities for personal gain
- Test attacks on production without authorization

**We commit to:**
- Respond within 48 hours
- Investigate all reports
- Credit researchers (if desired)

---

**Document Version:** 1.0
**Last Reviewed:** 2025-01-15
**Next Review:** 2025-04-15 (quarterly)
