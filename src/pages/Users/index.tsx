import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdPersonAdd, IoMdEye, IoMdTrash } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { getAllUsers, changeStatus } from '../../features/slices/userSlice';
import SwitcherStatus from '../../components/Switchers/SwitcherStatus';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(
    (state: any) => state.user,
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      console.log(users);
    }
  }, []);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (isError) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-red-500">{message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pengguna" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daftar Pengguna
          </h4>
          <div>
            <Link
              to="/users/add"
              className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
                <IoMdPersonAdd />
              </span>{' '}
              Tambah
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Aksi
              </h5>
            </div>
          </div>
          {users?.map((item: any) => (
            <div
              key={item.uuid}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item.email}</p>
              </div>
              <div className="flex items-center space-x-3 justify-center p-2.5 xl:p-5">
                <Link
                  to={`/users/${item.uuid}`}
                  className="rounded bg-primary hover:bg-opacity-90 p-3 text-white"
                >
                  <IoMdEye size={20} />
                </Link>

                <SwitcherStatus status={item.status} id={item.uuid} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
