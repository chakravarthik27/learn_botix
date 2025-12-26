# Supabase Authentication Setup

This document explains how to configure and use Supabase authentication in the learn_botix application.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed

## Setup Instructions

### 1. Install Dependencies

The Supabase client library is already installed. If you need to reinstall:

```bash
npm install @supabase/supabase-js
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project settings:
- Go to https://app.supabase.com
- Select your project
- Go to Settings > API
- Copy the "Project URL" and "anon/public" key

### 3. Set Up Supabase Authentication

In your Supabase project:

1. Enable Email/Password authentication:
   - Go to Authentication > Providers
   - Enable "Email" provider
   - Configure email templates if needed

2. Create users (optional for testing):
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password

## Features Implemented

### Login Functionality

- **Location**: `/src/components/forms/LoginForm.tsx`
- **Route**: `/login`
- **Features**:
  - Email and password validation using Zod schema
  - Integration with Supabase `signInWithPassword` API
  - Error handling for invalid credentials
  - Loading state during authentication
  - Success/error toast notifications
  - Session storage in localStorage
  - Automatic redirect to home page after successful login

### Logout Functionality

- **Location**: `/src/components/Dashboard.tsx`
- **Features**:
  - Logout button in the sidebar footer
  - Integration with Supabase `signOut` API
  - Session cleanup from localStorage
  - Success/error toast notifications
  - Automatic redirect to login page after logout

### Protected Routes

- **Location**: `/middleware.ts`
- **Features**:
  - Middleware to protect authenticated routes
  - Automatic redirect to login page for unauthenticated users
  - Redirect authenticated users away from login/register pages
  - Session validation using Supabase

### Session Management

- **Location**: `/src/lib/auth-helpers.ts`
- **Features**:
  - `getSession()` - Retrieve current session
  - `getUser()` - Get current user data
  - `isAuthenticated()` - Check if user is authenticated (client-side)
  - `requireAuth()` - Require authentication (server-side)

## Usage

### Login Flow

1. User navigates to `/login`
2. User enters email and password
3. Form validates input
4. On submit, Supabase authenticates the user
5. On success:
   - Session is stored in localStorage
   - Success toast is displayed
   - User is redirected to home page (`/`)
6. On failure:
   - Error toast is displayed with the error message

### Logout Flow

1. User clicks "Logout" button in the Dashboard sidebar
2. Supabase signs out the user
3. Session is cleared from localStorage
4. Success toast is displayed
5. User is redirected to `/login`

### Testing

To test the authentication:

1. **Test Login with Valid Credentials**:
   - Create a user in your Supabase dashboard
   - Navigate to `/login`
   - Enter the user's email and password
   - Verify successful login and redirect

2. **Test Login with Invalid Credentials**:
   - Navigate to `/login`
   - Enter incorrect email or password
   - Verify error message is displayed

3. **Test Logout**:
   - Login successfully
   - Click the "Logout" button in the sidebar
   - Verify logout and redirect to login page

4. **Test Protected Routes**:
   - Without logging in, try to access `/dashboard` or other protected routes
   - Verify redirect to `/login`

## Files Modified/Created

### Created Files:
- `/src/lib/supabase.ts` - Supabase client configuration
- `/src/lib/auth-helpers.ts` - Authentication helper functions
- `/.env.example` - Environment variables template

### Modified Files:
- `/src/components/forms/LoginForm.tsx` - Added Supabase login integration
- `/src/components/Dashboard.tsx` - Added logout functionality
- `/src/app/layout.tsx` - Added Toaster component for notifications
- `/middleware.ts` - Updated to use Supabase for route protection
- `/.gitignore` - Updated to allow .env.example

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: Caught and displayed via toast notifications
2. **Invalid Credentials**: Supabase error messages shown to user
3. **Session Errors**: Handled gracefully with redirects
4. **Unexpected Errors**: Generic error messages displayed

## Security Considerations

1. **Environment Variables**: Sensitive keys are stored in environment variables
2. **Session Storage**: Sessions are stored in localStorage (client-side)
3. **Protected Routes**: Middleware ensures only authenticated users access protected pages
4. **Password Validation**: Minimum 8 characters required
5. **Email Validation**: Proper email format validation

## Troubleshooting

### Issue: "Invalid login credentials"
- **Solution**: Verify the user exists in Supabase and credentials are correct

### Issue: "Session not persisting"
- **Solution**: Check localStorage is enabled in browser

### Issue: "Redirect not working"
- **Solution**: Ensure middleware is configured correctly and routes match

### Issue: "Environment variables not found"
- **Solution**: Create `.env.local` file with correct Supabase credentials

## Next Steps

Potential enhancements:
1. Add password reset functionality
2. Implement social authentication (Google, GitHub, etc.)
3. Add email verification
4. Implement remember me functionality with cookie storage
5. Add user profile management
6. Implement refresh token rotation
7. Add multi-factor authentication (MFA)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
