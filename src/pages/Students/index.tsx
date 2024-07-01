import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdPersonAdd, IoMdEye } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { getStudents } from '../../features/slices/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';

const Students: React.FC = () => {
  const dispatch = useDispatch();
  const { students, totalPage, page } = useSelector(
    (state: any) => state.student,
  );

  const [currentPage, setCurrentPage] = useState(page);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getStudents({ page: currentPage, limit: 10, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  useEffect(() => {
    if (students) {
      console.log(students);
    }
  }, [students]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Siswa" />

      <div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-4">
            <h4 className=" text-xl font-semibold text-black dark:text-white">
              Daftar Siswa
            </h4>
            <div>
              <Link
                to="/students/add"
                className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  <IoMdPersonAdd />
                </span>
                Tambah
              </Link>
            </div>
          </div>
          <div className="my-4">
            <label className="mb-3 block text-black dark:text-white">
              Cari
            </label>
            <input
              type="text"
              placeholder="Cari Siswa"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 ">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
                  Nama
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
                  Email
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
                  Alamat
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            </div>

            {students &&
              students.map((item: any, key: any) => (
                <div
                  className={`grid grid-cols-4  ${
                    key === students.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={key}
                >
                  <div className="flex justify-start items-center gap-3 p-2.5 xl:p-5">
                    <p className="hidden text-black dark:text-white sm:block">
                      {item.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {item.email === null ? '-' : item.email}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="hidden text-black text-center dark:text-white sm:block">
                      {item.address === null ? '-' : item.address}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <Link
                      to={`/students/${item.uuid}`}
                      className="rounded bg-primary text-center hover:bg-opacity-90 p-3 text-white"
                    >
                      <IoMdEye />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Students;
