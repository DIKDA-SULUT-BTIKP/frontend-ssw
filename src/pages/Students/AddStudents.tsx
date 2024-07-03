import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { z } from 'zod';
import { createStudent } from '../../features/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../common/Toast';
import {
  religions,
  genders,
  lastEducations,
  trainingLocations,
} from '../../utils/helper';

const AddStudents: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(genders[0]);
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [lastEducation, setLastEducation] = useState(lastEducations[0]);
  const [schoolName, setSchoolName] = useState('');
  const [graduationYear, setGraduationYear] = useState(0);
  const [certificate, setCertificate] = useState('');
  const [nik, setNik] = useState('');
  const [religion, setReligion] = useState(religions[0]);
  const [trainingLocation, setTrainingLocation] = useState(
    trainingLocations[0],
  );

  const [errors, setErrors] = useState<{
    name?: string;
    placeOfBirth?: string;
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    lastEducation?: string;
    schoolName?: string;
    graduationYear?: number;
    certificate?: string;
    nik?: string;
    religion?: string;
    trainingLocation?: string;
  }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1, { message: 'Wajib diisi' }),
    gender: z.string().min(1, { message: 'Wajib diisi' }),
    placeOfBirth: z.string().min(1, { message: 'Wajib diisi' }),
    dateOfBirth: z.string().min(1, { message: 'Wajib diisi' }),
    address: z.string().min(1, { message: 'Wajib diisi' }),
    phoneNumber: z.string().min(1, { message: 'Wajib diisi' }),
    email: z
      .string()
      .min(1, { message: 'Wajib diisi' })
      .email({ message: 'Email tidak valid' }),
    lastEducation: z.string().min(1, { message: 'Wajib diisi' }),
    schoolName: z.string().min(1, { message: 'Wajib diisi' }),
    graduationYear: z.number().min(1, { message: 'Wajib diisi' }),
    certificate: z.string().min(1, { message: 'Wajib diisi' }),
    nik: z.string().min(1, { message: 'Wajib diisi' }),
    religion: z.string().min(1, { message: 'Wajib diisi' }),
    trainingLocation: z.string().min(1, { message: 'Wajib diisi' }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = schema.safeParse({
        name,
        gender,
        placeOfBirth,
        dateOfBirth,
        address,
        phoneNumber,
        email,
        lastEducation,
        schoolName,
        graduationYear,
        certificate,
        nik,
        religion,
        trainingLocation,
      });

      if (!result.success) {
        const fieldErrors: {
          name?: string;
          gender?: string;
          placeOfBirth?: string;
          dateOfBirth?: string;
          address?: string;
          phoneNumber?: string;
          email?: string;
          lastEducation?: string;
          schoolName?: string;
          graduationYear?: number;
          certificate?: string;
          nik?: string;
          religion?: string;
          trainingLocation?: string;
        } = {};
        result.error.errors.forEach((error) => {
          if (error.path.includes('name')) fieldErrors.name = error.message;
          if (error.path.includes('gender')) fieldErrors.gender = error.message;
          if (error.path.includes('placeOfBirth'))
            fieldErrors.placeOfBirth = error.message;
          if (error.path.includes('dateOfBirth'))
            fieldErrors.dateOfBirth = error.message;
          if (error.path.includes('address'))
            fieldErrors.address = error.message;
          if (error.path.includes('phoneNumber'))
            fieldErrors.phoneNumber = error.message;
          if (error.path.includes('email')) fieldErrors.email = error.message;
          if (error.path.includes('lastEducation'))
            fieldErrors.lastEducation = error.message;
          if (error.path.includes('schoolName'))
            fieldErrors.schoolName = error.message;
          if (error.path.includes('graduationYear'))
            fieldErrors.graduationYear = error.message;
          if (error.path.includes('certificate'))
            fieldErrors.certificate = error.message;
          if (error.path.includes('nik')) fieldErrors.nik = error.message;
          if (error.path.includes('religion'))
            fieldErrors.religion = error.message;
          if (error.path.includes('trainingLocation'))
            fieldErrors.trainingLocation = error.message;
        });
        setErrors(fieldErrors);
      } else {
        dispatch(
          createStudent({
            name,
            gender,
            placeOfBirth,
            dateOfBirth,
            address,
            phoneNumber,
            email,
            lastEducation,
            schoolName,
            graduationYear,
            certificate,
            nik,
            religion,
            trainingLocation,
          }) as any,
        );
        ToastNotification.success('Siswa berhasil ditambahkan');
        setErrors({});
        navigate('/students');
      }

      setName('');
      setPlaceOfBirth('');
      setDateOfBirth('');
      setAddress('');
      setPhoneNumber('');
      setEmail('');
      setLastEducation('');
      setSchoolName('');
      setGraduationYear(0);
      setCertificate('');
      setNik('');
      setReligion('');
      setTrainingLocation('');
      setErrors({});
    } catch (error) {
      ToastNotification.error('Siswa gagal ditambahkan');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Siswa" />

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
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Siswa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jenis Kelamin <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.placeOfBirth ? 'border-red-500' : ''
                    }`}
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender === 'Male' ? 'Laki-laki' : 'Perempuan'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tempat Lahir <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tempat Lahir Siswa"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.placeOfBirth ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.placeOfBirth && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.placeOfBirth}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tanggal Lahir <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Tanggal Lahir Siswa"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.dateOfBirth ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alamat <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    placeholder="Alamat Siswa"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.address ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Telepon <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nomor Telepon Siswa"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.phoneNumber ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email Siswa"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Pendidikan Terakhir <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="lastEducation"
                    id="lastEducation"
                    value={lastEducation}
                    onChange={(e) => setLastEducation(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.lastEducation ? 'border-red-500' : ''
                    }`}
                  >
                    {lastEducations.map((item: any, key: any) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.lastEducation && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.lastEducation}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Sekolah <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Sekolah Siswa"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.schoolName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.schoolName && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.schoolName}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tahun Lulus <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Tahun Lulus Siswa"
                    value={graduationYear}
                    onChange={(e) =>
                      setGraduationYear(parseInt(e.target.value))
                    }
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.graduationYear ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.graduationYear && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.graduationYear}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Ijazah/Sertifikat{' '}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nomor Ijazah/Sertifikat Siswa"
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.certificate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.certificate && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.certificate}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NIK <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nomor Induk Kependudukan Siswa"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.nik ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.nik && (
                    <p className="text-red-500 mt-1 text-sm">{errors.nik}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Agama <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.religion ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Pilih Agama</option>
                    {religions.map((religion) => (
                      <option key={religion} value={religion}>
                        {religion}
                      </option>
                    ))}
                  </select>

                  {errors.religion && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.religion}
                    </p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Lokasi Pelatihan <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="trainingLocation"
                    id="trainingLocation"
                    value={trainingLocation}
                    onChange={(e) => setTrainingLocation(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.trainingLocation ? 'border-red-500' : ''
                    }`}
                  >
                    {trainingLocations.map((trainingLocation) => (
                      <option key={trainingLocation} value={trainingLocation}>
                        {trainingLocation}
                      </option>
                    ))}
                  </select>

                  {errors.trainingLocation && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.trainingLocation}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddStudents;
