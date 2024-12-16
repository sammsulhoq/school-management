const jwt = require('jsonwebtoken');

// Generate a token for Superadmin
const superadminToken = jwt.sign(
  { role: 'Superadmin', id: 'superadmin123' },
  'q9vS8w#X%zF!j4*B2cK&dQ@mR7T_pL^6G+Nh3$W', // Your JWT_SECRET from .env
  { expiresIn: '1h' }
);
console.log('Superadmin Token:', superadminToken);

// Generate a token for School Administrator
const schoolAdminToken = jwt.sign(
  { role: 'School Administrator', id: 'schooladmin123' },
  'q9vS8w#X%zF!j4*B2cK&dQ@mR7T_pL^6G+Nh3$W', // Your JWT_SECRET from .env
  { expiresIn: '1h' }
);
console.log('School Admin Token:', schoolAdminToken);
