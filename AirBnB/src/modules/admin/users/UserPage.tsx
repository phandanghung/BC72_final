import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  // CircularProgress,
  Pagination,
  // IconButton,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogContentText,
  // DialogActions,
  Button,
  Breadcrumbs,
  IconButton,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { Add, PlusOne } from '@mui/icons-material';
import { userApi } from '../../../apis/user.api';
import { RootState } from '../../../store/store';
import { LoadingButton } from '@mui/lab';
import useOpen from '../../../hooks/open/useOpen';
import { toast } from 'react-hot-toast';


const UserPage: React.FC= () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userList', page],
    queryFn: () => userApi.getListUser(page),
    enabled: !!currentUser
  });
  const { open, onClose, handleClickOpen } = useOpen();
  const items = data?.data;
  const count = data?.totalRow ?? 0;
  const limit = data?.pageSize ?? 10;
  const totalPages = Math.ceil(count / limit);

  const queryClient = useQueryClient();

  const [movieId, setMovieId] = useState<number | null>(null);
  
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onError: (error) => {
      toast.error('Xóa user thất bại. Vui lòng thử lại');
    },
    onSuccess: (response) => {
      toast.success('Xóa user thành công');
      queryClient.invalidateQueries({ queryKey: ['userList', page] });
    },
    onSettled: () => {
      onClose();
      setMovieId(null);
    },
  });
  const handleDeleteMovie = () => {
    if (movieId) {
      mutate(movieId);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setMovieId(null);
    }
    onClose();
  };


  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='text.primary'>Admin</Typography>
          <Typography color='text.primary'>Dashboard</Typography>
          <Typography color='text.primary'>Movie Management</Typography>
        </Breadcrumbs>

        <Button variant='contained' color='primary' startIcon={<Add />}>
          Add user
        </Button>
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
                      <IconButton
                      // onClick={() => {
                      //   setDataEdit(item);
                      //   setIsAddOrUpdate(true);
                      // }}
                      >
                        <EditOutlinedIcon color='warning' />
                      </IconButton>
                      <IconButton
                      onClick={() => {
                        setMovieId(item.id ?? null);
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
      {/* <AddOrUpdateMovie
        isOpen={isAddOrUpdate}
        onClose={() => {
          setIsAddOrUpdate(false);
          setDataEdit(null);
        }}
        onSubmit={handleAddOrEditMovie}
        dataEdit={dataEdit}
      /> */}
    </Box>
  );
}

export default UserPage;