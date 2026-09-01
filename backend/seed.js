import dotenv from 'dotenv';
import sequelize from './src/Config/db.js';
import User from './src/Model/user.js';

dotenv.config();

const REQUIRED_ROLE = 'SuperAdmin';

function fail(message) {
  console.error(`Admin bootstrap failed: ${message}`);
  process.exitCode = 1;
}

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

async function bootstrapSuperAdmin() {
  const email = normalizeEmail(process.env.ADMIN_EMAIL);
  const password = process.env.ADMIN_PASSWORD || '';

  if (!email || !password) {
    fail('ADMIN_EMAIL and ADMIN_PASSWORD are required. Password value was not printed.');
    return;
  }

  if (!isValidEmail(email)) {
    fail('ADMIN_EMAIL must be a valid email address.');
    return;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    fail(passwordError);
    return;
  }

  try {
    await sequelize.authenticate();
    await User.sync();

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.role === REQUIRED_ROLE) {
        console.log('SuperAdmin already exists. No changes made.');
      } else {
        fail('A user with ADMIN_EMAIL already exists but is not a SuperAdmin. No changes made.');
      }
      return;
    }

    // User.beforeCreate hashes this password with the project's bcryptjs hook.
    await User.create({
      email,
      password,
      role: REQUIRED_ROLE,
      brandId: null,
    });

    console.log('SuperAdmin created successfully.');
  } catch (error) {
    fail(error.message || 'Unable to bootstrap SuperAdmin.');
  } finally {
    await sequelize.close().catch(() => {});
  }
}

await bootstrapSuperAdmin();