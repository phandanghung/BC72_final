import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Button,
  Breadcrumbs,
  IconButton,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  MenuItem,
} from '@mui/material';

import { Add } from '@mui/icons-material';
import { userApi } from '../../../apis/admin/userManage/user.api';
import { RootState } from '../../../store/store';
import { LoadingButton } from '@mui/lab';
import useOpen from '../../../hooks/open/useOpen';
import { toast } from 'react-hot-toast';
import { CurrentUser, updateUser } from '../../../interfaces/user.interface';


const UserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userList', page ,keyword],
    queryFn: () => userApi.getListUser(page, 10, keyword ),
    enabled: !!currentUser
  });
  const { open, onClose, handleClickOpen } = useOpen();
  const items = data?.data;
  const count = data?.totalRow ?? 0;
  const limit = data?.pageSize ?? 10;
  const totalPages = Math.ceil(count / limit);

  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<number | null>(null);

  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false);

  const [dataEdit, setDataEdit] = useState<number | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setPage(1);
  };


  const { mutate: mutateAddMovie } = useMutation({
    mutationFn: (formData: CurrentUser) =>{
    return userApi.addUser(formData);
    },
    onError: () => {
        toast.error('Thêm user thất bại. Vui lòng thử lại.');
    },
  
    onSuccess: () => {
      toast.success('thêm user thành công');
      queryClient.invalidateQueries({ queryKey: ['userList', page] });
    },
    onSettled: () => {
      onClose();
      setUserId(null);
    },
  });
  

  const { mutate: mutateUpdateUser } = useMutation({
  mutationFn: ({ id, body }: { id: number, body: updateUser }) => userApi.updateUser(id, body),
  onError: () => {
    toast.error('Update user failed. Please try again.');
  },
  onSuccess: () => {
    toast.success('User updated successfully.');
    queryClient.invalidateQueries({ queryKey: ['userList', page] });
  },
  onSettled: () => {
    onClose();
    setUserId(null);
  },
});

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onError: () => {
      toast.error('Xóa user thất bại. Vui lòng thử lại');
    },
    onSuccess: () => {
      toast.success('Xóa user thành công');
      queryClient.invalidateQueries({ queryKey: ['userList', page] });
    },
    onSettled: () => {
      onClose();
      setUserId(null);
    },
  });
  const handleDeleteMovie = () => {
    if (userId) {
      mutate(userId);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setUserId(null);
    }
    onClose();
  };


  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='text.primary'>Admin</Typography>
          <Typography color='text.primary'>Dashboard</Typography>
          <Typography color='text.primary'>User Management</Typography>
        </Breadcrumbs>

        <Button variant='contained' color='primary' startIcon={<Add />} onClick={() => setIsAddOrUpdate(true)}>
          Add user
        </Button>
      </Stack>

      <Stack>
      <TextField
          label="Search Users"
          variant="outlined"
          value={keyword}
          onChange={handleSearchChange}
          placeholder="Enter keyword..."
        />
      </Stack>
      

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Mã ID</TableCell>
              <TableCell sx={{ width: 200 }}>Username</TableCell>
              <TableCell sx={{ width: 200 }}>Avatar</TableCell>
              <TableCell sx={{ width: 200 }}>	Birthday</TableCell>
              <TableCell sx={{ width: 220 }}>Email</TableCell>
              <TableCell sx={{ width: 120 }}>Người dùng</TableCell>
              <TableCell sx={{ width: 120 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <img src={item.avatar || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt={item.name} width='100' />
                  </TableCell>
                  <TableCell>
                    {item.birthday}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={2}>
                      <IconButton className='edit'
                        onClick={() => {
                          const id = item.id;
                          if (id !== undefined) {
                            setIsAddOrUpdate(true)
                            setDataEdit(id)
                          }
                        }}
                      >
                        <EditOutlinedIcon color='warning' onClick={() => { setIsAddOrUpdate(true) }} />
                      </IconButton>
                      <IconButton className='delete'
                        onClick={() => {
                          setUserId(item.id ?? null);
                          handleClickOpen();
                        }}
                      >
                        <DeleteOutlineOutlinedIcon color='error' />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!isLoading && items?.length === 0 && (
          <Box height={200} width='100%' display='flex' justifyContent='center' alignItems='center'>
            <Typography textAlign='center'>Không có dữ liệu</Typography>
          </Box>
        )}
        {isLoading && (
          <Box height={200} width='100%' display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && isError && (
          <Box height={200} width='100%' display='flex' justifyContent='center' alignItems='center'>
            <Typography textAlign='center'>Có lỗi xảy ra, vui lòng thử lại.</Typography>
          </Box>
        )}
        <Box my={6} display='flex' justifyContent='flex-end'>
          <Pagination
            count={totalPages}
            onChange={(_event, page) => {
              setPage(page)
            }}
          />
        </Box>
      </TableContainer>
      {/* DElete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete movie ?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this movie ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* disabled={isPending}  */}
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isPending}
            variant='contained'
            disabled={isPending}
            onClick={handleDeleteMovie}
            autoFocus
          >
            OK
          </LoadingButton>
        </DialogActions>
      </Dialog>


      {/* ADD OR UPDATE MOVIE DIALOG */}
      <Dialog
        open={isAddOrUpdate}
        onClose={() => {
          setIsAddOrUpdate(false);
          setDataEdit(null);
          setEmailError(null)
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData: CurrentUser = {
              id: dataEdit || undefined,
              name: e.currentTarget.name.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value ? e.currentTarget.password.value : undefined,
              phone: e.currentTarget.phone.value,
              birthday: e.currentTarget.birthday.value,
              avatar: e.currentTarget.avatar.value || null,
              gender: e.currentTarget.gender.value === 'true',
              role: e.currentTarget.role?.value
            };
            if (items?.some((user) => user.email === formData.email)) {
              setEmailError('Email đã tồn tại.');
              return;
            }
          
            setEmailError(null);
          
            if (dataEdit) {
              mutateUpdateUser({ id: dataEdit, body: formData })
              console.log('Update User', formData);
            } else {
              // Add User logic
              mutateAddMovie(formData);
            }
            setIsAddOrUpdate(false);
            setDataEdit(null);
          }}
        >
          <DialogTitle>{dataEdit ? 'Update User' : 'Add User'}</DialogTitle>
          <Stack spacing={3} p={3}>
            {dataEdit && (
              <TextField
                label="ID"
                name="id"
                defaultValue={dataEdit}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            )}

            <Box display="flex" gap={2}>
              <TextField
                label="Name"
                name="name"
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.name : ''}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.email : ''}
                required
                error={!!emailError}
                helperText={emailError || ''}
                fullWidth
              />
            </Box>

            <Box display="flex" gap={2}>
                  <TextField
                  label="Password"
                  name="password"
                  required={!dataEdit}
                  placeholder='Enter password'
                  type="password"
                  fullWidth
                  disabled={!!dataEdit}
                />
              
              <TextField
                label="Phone"
                name="phone"
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.phone : ''}
                required
                fullWidth
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="Birthday"
                name="birthday"
                type="date"
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.birthday : ''}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Avatar (URL)"
                name="avatar"
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.avatar : ''}
                placeholder="Optional"
                type="url"
                fullWidth
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="Gender"
                name="gender"
                select
                defaultValue={dataEdit ? `${items?.find((item) => item.id === dataEdit)?.gender}` : 'true'}
                required
                fullWidth
              >
                <MenuItem value="true">Male</MenuItem>
                <MenuItem value="false">Female</MenuItem>
              </TextField>
              <TextField
                label="Role"
                name="role"
                select
                defaultValue={dataEdit ? items?.find((item) => item.id === dataEdit)?.role : 'USER'}
                required
                fullWidth
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="USER">User</MenuItem>
              </TextField>
            </Box>
          </Stack>
          <DialogActions>
            <Button variant="outlined" 
            onClick={() => {
              setIsAddOrUpdate(false);
              setEmailError(null)
            }   
            }>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {dataEdit ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>


    </Box>
  );
}

export default UserPage;