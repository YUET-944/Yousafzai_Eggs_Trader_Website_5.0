import dotenv from 'dotenv';
import User from '../Model/user.js';

dotenv.config();

const REQUIRED_ROLE = 'SuperAdmin';

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(value) {
  if (typeof value !== 'string' || value.length < 12) {
    return 'ADMIN_PASSWORD must be at least 12 characters long.';
  }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return 'ADMIN_PASSWORD must include at least one letter and one number.';
  }
  if (/^(password|admin|changeme|replace-me|replace-with-strong-production-password)$/i.test(value.trim())) {
    return 'ADMIN_PASSWORD is too weak or looks like a placeholder.';
  }
  return '';
}

/**
 * Idempotently bootstrap or verify the SuperAdmin account.
 * 
 * Rules:
 * 1. If an account with ADMIN_EMAIL already exists:
 *    - Verifies its role is SuperAdmin.
 *    - NEVER overwrites the existing password or account data.
 * 2. If no account exists:
 *    - Validates email and password requirements.
 *    - Creates the SuperAdmin account (password hashed via bcrypt in User model hook).
 * 3. If ADMIN_EMAIL is not supplied:
 *    - Checks if any SuperAdmin exists and logs status cleanly.
 *    - Does NOT crash the server unless exitOnError is true.
 */
export async function bootstrapSuperAdmin({ exitOnError = false } = {}) {
  const email = normalizeEmail(process.env.ADMIN_EMAIL);
  const password = process.env.ADMIN_PASSWORD || '';

  try {
    // Ensure table exists before querying
    await User.sync();

    // Case 1: No ADMIN_EMAIL specified in environment
    if (!email) {
      const existingAdmins = await User.count({ where: { role: REQUIRED_ROLE } });
      if (existingAdmins > 0) {
        console.log(`ℹ️ [Admin Bootstrap] ${existingAdmins} SuperAdmin account(s) present in database. Skipping initialization.`);
        return { status: 'skipped', reason: 'already_configured' };
      }
      const msg = 'ADMIN_EMAIL is not set in environment variables and no SuperAdmin exists in database.';
      console.warn(`⚠️ [Admin Bootstrap] ${msg}`);
      if (exitOnError) process.exitCode = 1;
      return { status: 'warning', message: msg };
    }

    // Case 2: Validate email format
    if (!isValidEmail(email)) {
      const msg = `ADMIN_EMAIL "${email}" is not a valid email address.`;
      console.error(`❌ [Admin Bootstrap] ${msg}`);
      if (exitOnError) process.exitCode = 1;
      return { status: 'error', message: msg };
    }

    // Case 3: Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.role === REQUIRED_ROLE) {
        console.log(`✅ [Admin Bootstrap] SuperAdmin "${email}" already exists. Existing credentials preserved (no overwrite).`);
        return { status: 'preserved', email };
      } else {
        const msg = `User "${email}" already exists with role "${existingUser.role}" instead of "${REQUIRED_ROLE}". Preserving account without modification.`;
        console.warn(`⚠️ [Admin Bootstrap] ${msg}`);
        return { status: 'role_conflict', message: msg };
      }
    }

    // Case 4: Account does not exist - password is required
    if (!password) {
      const msg = `ADMIN_EMAIL is set to "${email}", but ADMIN_PASSWORD is missing in environment variables. SuperAdmin cannot be initialized.`;
      console.error(`❌ [Admin Bootstrap] ${msg}`);
      if (exitOnError) process.exitCode = 1;
      return { status: 'error', message: msg };
    }

    // Case 5: Validate password complexity
    const passwordError = validatePassword(password);
    if (passwordError) {
      console.error(`❌ [Admin Bootstrap] ${passwordError}`);
      if (exitOnError) process.exitCode = 1;
      return { status: 'error', message: passwordError };
    }

    // Case 6: Create SuperAdmin (User model beforeCreate hook handles bcrypt hashing)
    await User.create({
      email,
      password,
      role: REQUIRED_ROLE,
      brandId: null,
    });

    console.log(`🎉 [Admin Bootstrap] SuperAdmin "${email}" created successfully.`);
    return { status: 'created', email };

  } catch (error) {
    const msg = error.message || 'Unable to bootstrap SuperAdmin.';
    console.error(`❌ [Admin Bootstrap] Error: ${msg}`);
    if (exitOnError) process.exitCode = 1;
    return { status: 'error', message: msg };
  }
}
