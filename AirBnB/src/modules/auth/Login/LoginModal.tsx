import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { userApi } from '../../../apis/user.api';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import { setCurrentUser } from '../../../store/slices/user.slice';

const schema = yup.object().shape({
  email: yup.string().required('Tài khoản không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
});

type FormValues = yup.InferType<typeof schema>;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (body: FormValues) => userApi.login(body),
    onSuccess: (currentUser) => {
      const { user } = currentUser;
      toast.success('Đăng nhập thành công');
      dispatch(setCurrentUser(user));
      if (user.role === 'ADMIN') {
        navigate(PATH.HOME);
      }
      console.log('success', user);
      onClose();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
      console.log('error: ', error);
    },
  });

  const onSubmit = (formValues: FormValues) => {
    const data = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    handleLogin(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography component="h1" fontWeight={700} align="center" variant="h4">
          Đăng nhập
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={4} className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Stack spacing={4} width="100%">
              <TextField
                {...register('email')}
                label="Tài Khoản *"
                placeholder="Nhập tài khoản"
                fullWidth
                variant="outlined"
              />

              <TextField
                {...register('password')}
                label="Mật khẩu *"
                type="password"
                placeholder="Nhập mật khẩu"
                fullWidth
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  className: 'rounded-lg',
                }}
              />

              <LoadingButton
                loading={isPending}
                variant="contained"
                color="primary"
                type="submit"
                disabled={isPending}
                fullWidth
                className="rounded-lg py-2"
              >
                Đăng nhập
              </LoadingButton>
            </Stack>
          </form>
          <Link href="/auth/register" variant="body2" align="center">
            Bạn chưa có tài khoản? Đăng ký
          </Link>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
