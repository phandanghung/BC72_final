import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, Link, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../../../apis/admin/userManage/user.api';
// import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../store/slices/user.slice';
import toast from 'react-hot-toast';

interface RegisterModalProp {
    open: boolean;
    onClose: () => void;
}

const schema = yup.object().shape({
    email: yup.string().required('email không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống').min(4, 'Mật khẩu phải có ít nhất 4 ký tự'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    name: yup.string().required('Họ và tên không được để trống'),
    phone: yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]+$/, 'Số điện thoại không đúng định dạng'),
    gender: yup.boolean().required('Giới tính không được để trống'),
    birthday: yup.string().required('Ngày sinh không được để trống'),
    role: yup.string().default('USER')

})

type FormValues = yup.InferType<typeof schema>;

const RegisterModal: React.FC<RegisterModalProp> = ({ open, onClose }) => {
    const dispatch = useDispatch();

    const {
        register,
        control,
        handleSubmit,
        watch,
        setError,
        formState: { errors } } = useForm<FormValues>({
            resolver: yupResolver(schema),
            defaultValues: {
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
                phone: "",
                gender: true,
                birthday: "",
                role: "USER"
            },

        });
    const [birthday] = watch("birthday");
    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: (body: FormValues) => userApi.register(body),
        onSuccess: (response) => {
            const data  = response
            toast.success('Đăng ký thành công');
            console.log("data", data)
            dispatch(setCurrentUser(data));
            onClose();
        },
        onError: (error: { message: string }) => {
            if (error.message ===
                "Yêu cầu không hợp lệ!") {
                setError('email', {
                    type: 'manual',
                    message: 'Email đã tồn tại !',
                });
                console.log('setError: ', error);
            } else {
                console.log('error: ', error);
            }
        },
    });

    const onSubmit = (formValues: FormValues) => {
        const payload = {
            ...formValues,
            role: "USER"
        };
        handleRegister({
            ...payload,
        });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography component="h1" fontWeight={700} align="center" variant="h4">
                    Đăng ký
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={4} className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <Stack spacing={4} width="100%">
                            <TextField
                                {...register("email")}
                                label="Email *"
                                placeholder="email@exp.com"
                                fullWidth
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                {...register("password")}
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
                            <TextField
                                {...register("confirmPassword")}
                                label="Nhập lại Mật khẩu *"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                fullWidth
                                variant="outlined"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    className: 'rounded-lg',
                                }}
                            />
                            <TextField
                                {...register("name")}
                                label="Họ và tên *"
                                placeholder="Họ và tên"
                                fullWidth
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                InputProps={{
                                    className: 'rounded-lg',
                                }}
                            />
                            <TextField
                                {...register("phone")}
                                label="Số điện thoại *"
                                placeholder="Số điện thoại"
                                fullWidth
                                variant="outlined"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                InputProps={{
                                    className: 'rounded-lg',
                                }}
                            />
                            <FormControl fullWidth error={!!errors.gender}>
                                <InputLabel>Gender *</InputLabel>
                                <Controller
                                    {...register("gender")}
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Gender *"
                                        >
                                            <MenuItem value="true">Nam</MenuItem>
                                            <MenuItem value="false">Nữ</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <Controller
                                name='birthday'
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <DatePicker
                                            format='DD/MM/YYYY'
                                            onChange={(date) => {
                                                const formatDate = dayjs(date).format('DD/MM/YYYY');
                                                field.onChange(formatDate);
                                            }}
                                            defaultValue={
                                                birthday ? dayjs(format(birthday, 'dd/MM/yyyy'), 'DD/MM/YYYY') : null
                                            }
                                        />
                                    );
                                }}
                            />

                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                className="rounded-lg py-2"
                                loading={isPending}
                            >
                                Đăng ký
                            </LoadingButton>
                        </Stack>
                    </form>
                    <Link href="/auth/login" variant="body2" align="center">
                        Bạn đã có tài khoản? Đăng nhập
                    </Link>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;
