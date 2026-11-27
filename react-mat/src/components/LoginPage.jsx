import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';

// Demo credentials so you can test both Success and Failure alerts immediately
const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Client-side empty check
    if (!email.trim() || !password.trim()) {
      setStatus({
        type: 'error',
        message: 'Please enter both your email address and password.',
      });
      return;
    }

    // 2. Basic email format check
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address (e.g., user@example.com).',
      });
      return;
    }

    // 3. Simulate an API login request
    setLoading(true);
    setStatus({ type: '', message: '' });

    setTimeout(() => {
      setLoading(false);

      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        setStatus({
          type: 'success',
          message: `Welcome back, ${email}! Login successful.`,
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Invalid email or password. Please try again.',
        });
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setStatus({ type: '', message: '' });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your credentials to access your account.
        </Typography>

        {/* Success or Failure Alert */}
        {status.message && (
          <Alert
            severity={status.type}
            onClose={() => setStatus({ type: '', message: '' })}
            sx={{ mb: 2.5 }}
          >
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => setShowPassword((prev) => !prev)}
                        sx={{ minWidth: 'auto', textTransform: 'none' }}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Button
                type="button"
                size="small"
                onClick={handleFillDemo}
                sx={{ textTransform: 'none' }}
              >
                Use Demo Login
              </Button>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 3, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            <strong>Demo Credentials:</strong> admin@example.com / password123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
