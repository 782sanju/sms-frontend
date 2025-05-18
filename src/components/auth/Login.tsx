import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Typography, Link, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginSchema } from '@/validations/auth.schema';
import authService from '@/services/api/auth.service';
import { LoginFormFields } from '@/types/auth.types';
import toast from 'react-hot-toast';
import '@/styles/auth.scss';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(loginSchema),
    defaultValues: new LoginFormFields(),
  });

  const onSubmit = async (data: LoginFormFields) => {
    try {
      setIsLoading(true);
      await authService.login(data);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        <div className="auth-card__header">
          <Typography variant="h4" component="h1">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please sign in to continue
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-card__form">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <div className="auth-card__footer">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Typography>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 