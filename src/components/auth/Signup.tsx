import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Typography, Link, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signupSchema } from '@/validations/auth.schema';
import authService from '@/services/api/auth.service';
import { SignupFormFields } from '@/types/auth.types';
import toast from 'react-hot-toast';
import '@/styles/auth.scss';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({
    resolver: yupResolver(signupSchema),
    defaultValues: new SignupFormFields(),
  });

  const onSubmit = async (data: SignupFormFields) => {
    try {
      setIsLoading(true);
      const { confirmPassword, ...signupData } = data;
      await authService.signup(signupData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
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
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please fill in the details to sign up
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-card__form">
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            {...register('fullName')}
            disabled={isLoading}
          />

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

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
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
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>

          <div className="auth-card__footer">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Sign In
              </Link>
            </Typography>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 