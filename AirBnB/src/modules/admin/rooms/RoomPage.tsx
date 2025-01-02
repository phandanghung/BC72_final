import { Add } from '@mui/icons-material';
import { Box, Paper, Breadcrumbs, Button, CircularProgress, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, TableHead, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RoomApi } from '../../../apis/admin/RoomManage/room.api';
import locationApi from '../../../apis/location/location.api';
import toast from 'react-hot-toast';
import useOpen from '../../../hooks/open/useOpen';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

const RoomPage: React.FC = () => {

  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [keyword, setKeyword] = useState('');
  const queryClient = useQueryClient();
  const { open, onClose, handleClickOpen } = useOpen();
  const [roomId,setRoomId] = useState<number | null>(null);
  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false);
  const [dataEdit,setDataEdit] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      id: number
    tenPhong: string
    khach: number
    phongNgu: number
    giuong: number
    phongTam: number
    moTa: string
    giaTien: number
    mayGiat: boolean
    banLa: boolean
    tivi: boolean
    dieuHoa: boolean
    wifi: boolean
    bep: boolean
    doXe: boolean
    hoBoi: boolean
    banUi: boolean
    maViTri: number
    hinhAnh: string
    },
  });


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setPage(1);
  }

  const { data: roomData , isLoading, isError } = useQuery({
    queryKey: ['RoomList', page, keyword],
    queryFn: () => RoomApi.getlistRoom(page, 10, keyword),
    enabled: !!currentUser
  })

  const { data: locationData} = useQuery({
    queryKey: ["locations"],
    queryFn: locationApi.getLocation,
  });

  const {mutate:deleteRoomMutate, isPending } = useMutation({
    mutationFn: (id: number) => RoomApi.deleteRoom(id),
    onError: () => {
      toast.error('Xóa user thất bại. Vui lòng thử lại');
    },
    onSuccess: () => {
      toast.success('Xóa user thành công');
      queryClient.invalidateQueries({ queryKey: ['userList', page] });
    },
    onSettled: () => {
      onClose();
      setRoomId(null);
    },
  });

  const handleDeleteRoom = () => { 
    if(roomId) {
      deleteRoomMutate(roomId)
    }
   }

  const mappedRoomData = roomData?.data.map((room: any) => {
    const matchedLocation = locationData?.find(
      (location: any) => location.id === room.maViTri
    );
    return {
      ...room,
      tenViTri: matchedLocation?.tenViTri || "Không xác định",
      tinhThanh: matchedLocation?.tinhThanh
    };
  });


  const count = roomData?.totalRow || 0;
  const limit = roomData?.pageSize || 10;
  const totalPages = Math.ceil(count / limit);


  const handleClose = () => {
    if (!isPending) {
      onClose();
      setRoomId(null);
    }
    onClose();
  };

  return (
    <div>
      <Box>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Typography color='text.primary'>Admin</Typography>
            <Typography color='text.primary'>Dashboard</Typography>
            <Typography color='text.primary'>Room Management</Typography>
          </Breadcrumbs>

          <Button variant='contained' color='primary' startIcon={<Add />} >
            Add Room
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
                <TableCell sx={{ width: 600 }}>tên phòng</TableCell>
                <TableCell sx={{ width: 200 }}>Vị trí</TableCell>
                <TableCell sx={{ width: 200 }}>	Tỉnh thành</TableCell>
                <TableCell sx={{ width: 120 }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappedRoomData?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex',  alignItems: 'center' }}>
                        <img
                        className="w-36 h-16 object-cover mr-6"
                         src={item.hinhAnh} alt={item.tenPhong} />
                        <span>{item.tenPhong}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.tenViTri}</TableCell>
                    <TableCell>{item.tinhThanh}</TableCell>
                    <TableCell>
                    <Stack direction='row' spacing={2}>
                      <IconButton className='edit'
                        // onClick={() => {
                        //   const id = item.id;
                        //   if (id !== undefined) {
                        //     setIsAddOrUpdate(true)
                        //     setDataEdit(id)
                        //   }
                        // }}
                      >
                        <EditOutlinedIcon color='warning' />
                      </IconButton>
                      <IconButton className='delete'
                        onClick={() => {
                          setRoomId(item.id ?? null);
                          handleClickOpen();
                        }}
                      >
                        <DeleteOutlineOutlinedIcon color='error' />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {!isLoading && mappedRoomData?.length === 0 && (
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
          disabled={isPending} 
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isPending}
            variant='contained'
            disabled={isPending}
            onClick={handleDeleteRoom}
            autoFocus
          >
            OK
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isAddOrUpdate}
        onClose={() => {
          setIsAddOrUpdate(false);
          setDataEdit(null);
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
    </div>
  )
}

export default RoomPage;   