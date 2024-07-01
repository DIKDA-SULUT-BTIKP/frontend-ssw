import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ToastNotification from '../../common/Toast';
import {
  getStudentById,
  updateStudent,
} from '../../features/slices/studentSlice';
import {
  genders,
  trainingLocations,
  religions,
  lastEducations,
} from '../../utils/helper';

interface Student {
  name: string;
  gender: string;
  placeOfBirth: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  lastEducation: string;
  schoolName: string;
  graduationYear: number;
  certificate: string;
  nik: string;
  religion: string;
  trainingLocation: string;
}

const DetailStudents: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { student } = useSelector((state: any) => state.student);

  const [formData, setFormData] = useState<Student>({
    name: '',
    gender: '',
    placeOfBirth: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    lastEducation: '',
    schoolName: '',
    graduationYear: 0,
    certificate: '',
    nik: '',
    religion: '',
    trainingLocation: '',
  });

  const [errors, setErrors] = useState<Partial<Student>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const schema = z.object({
        name: z.string().min(1, { message: 'Wajib diisi' }),
        placeOfBirth: z.string().min(1, { message: 'Wajib diisi' }),
        dateOfBirth: z.string().min(1, { message: 'Wajib diisi' }),
        address: z.string().min(1, { message: 'Wajib diisi' }),
        phoneNumber: z
          .string()
          .min(1, { message: 'Wajib diisi' })
          .regex(/^[0-9]+$/, { message: 'Hanya boleh angka' })
          .min(10, { message: 'Minimal 11 angka' })
          .max(12, { message: 'Maksimal 12 angka' }),
        email: z
          .string()
          .min(1, { message: 'Wajib diisi' })
          .email({ message: 'Email tidak valid' }),
        lastEducation: z.string().min(1, { message: 'Wajib diisi' }),
        schoolName: z.string().min(1, { message: 'Wajib diisi' }),
        graduationYear: z
          .number()
          .min(1, { message: 'Wajib diisi' })
          .max(9999, { message: 'Maksimal 4 angka' }),
        certificate: z.string().min(1, { message: 'Wajib diisi' }),
        nik: z
          .string()
          .min(1, { message: 'Wajib diisi' })
          .regex(/^[0-9]+$/, { message: 'Hanya boleh angka' })
          .min(16, { message: 'Minimal 16 angka' })
          .max(16, { message: 'Maksimal 16 angka' }),
        religion: z.string().min(1, { message: 'Wajib diisi' }),
        trainingLocation: z.string().min(1, { message: 'Wajib diisi' }),
      });

      const result = schema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: Partial<Student> = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as keyof Student] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({});
        dispatch(updateStudent({ id, ...result.data }));
        ToastNotification.success('Data siswa berhasil diperbarui');
      }
    } catch (error) {
      ToastNotification.error('Terjadi kesalahan');
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getStudentById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (student) {
      console.log(student);
      setFormData({
        name: student.name,
        gender: student.gender,
        placeOfBirth: student.place_of_birth,
        dateOfBirth: student.date_of_birth,
        address: student.address,
        phoneNumber: student.phone_number,
        email: student.email,
        lastEducation: student.last_education,
        schoolName: student.school_name,
        graduationYear: student.graduation_year,
        certificate: student.certificate,
        nik: student.nik,
        religion: student.religion,
        trainingLocation: student.training_location,
      });
    }
  }, [student]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Siswa" />
      {student && (
        <div className="w-full">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Data Siswa
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  {[
                    {
                      label: 'Nama',
                      name: 'name',
                      type: 'text',
                      placeholder: 'Nama Siswa',
                    },
                    {
                      label: 'Tempat Lahir',
                      name: 'placeOfBirth',
                      type: 'text',
                      placeholder: 'Tempat Lahir Siswa',
                    },
                    {
                      label: 'Tanggal Lahir',
                      name: 'dateOfBirth',
                      type: 'date',
                      placeholder: 'Tanggal Lahir Siswa',
                    },
                    {
                      label: 'Alamat',
                      name: 'address',
                      type: 'textarea',
                      placeholder: 'Alamat Siswa',
                      rows: 4,
                    },
                    {
                      label: 'Nomor Telepon',
                      name: 'phoneNumber',
                      type: 'text',
                      placeholder: 'Nomor Telepon Siswa',
                    },
                    {
                      label: 'Email',
                      name: 'email',
                      type: 'email',
                      placeholder: 'Email Siswa',
                    },
                    {
                      label: 'Nama Sekolah',
                      name: 'schoolName',
                      type: 'text',
                      placeholder: 'Nama Sekolah Siswa',
                    },
                    {
                      label: 'Tahun Lulus',
                      name: 'graduationYear',
                      type: 'number',
                      placeholder: 'Tahun Lulus Siswa',
                    },
                    {
                      label: 'Nomor Ijazah/Sertifikat',
                      name: 'certificate',
                      type: 'text',
                      placeholder: 'Nomor Ijazah/Sertifikat Siswa',
                    },
                    {
                      label: 'NIK',
                      name: 'nik',
                      type: 'text',
                      placeholder: 'Nomor Induk Kependudukan Siswa',
                    },
                  ].map(({ label, name, type, placeholder, rows }, index) => (
                    <div className="mb-4.5" key={index}>
                      <label className="mb-2.5 block text-black dark:text-white">
                        {label} <span className="text-meta-1">*</span>
                      </label>
                      {type === 'textarea' ? (
                        <textarea
                          name={name}
                          placeholder={placeholder}
                          value={formData[name as keyof Student] as string}
                          onChange={handleChange}
                          rows={rows}
                          className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            errors[name as keyof Student]
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                      ) : (
                        <input
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={
                            formData[name as keyof Student] as string | number
                          }
                          onChange={handleChange}
                          className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            errors[name as keyof Student]
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                      )}
                      {errors[name as keyof Student] && (
                        <span className="text-red-500">
                          {errors[name as keyof Student]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Kelamin <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.gender ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender === 'Male' ? 'Laki-laki' : 'Perempuan'}
                        </option>
                      ))}
                    </select>
                    {errors.gender && (
                      <span className="text-red-500">{errors.gender}</span>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Agama <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.religion ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Pilih agama</option>
                      {religions.map((religion) => (
                        <option key={religion} value={religion}>
                          {religion}
                        </option>
                      ))}
                    </select>
                    {errors.religion && (
                      <span className="text-red-500">{errors.religion}</span>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Pendidikan Terakhir <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="lastEducation"
                      value={formData.lastEducation}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.lastEducation ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Pilih pendidikan terakhir</option>
                      {lastEducations.map((education) => (
                        <option key={education} value={education}>
                          {education}
                        </option>
                      ))}
                    </select>
                    {errors.lastEducation && (
                      <span className="text-red-500">
                        {errors.lastEducation}
                      </span>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Lokasi Pelatihan <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="trainingLocation"
                      value={formData.trainingLocation}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.trainingLocation ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Pilih lokasi pelatihan</option>
                      {trainingLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    {errors.trainingLocation && (
                      <span className="text-red-500">
                        {errors.trainingLocation}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default DetailStudents;
