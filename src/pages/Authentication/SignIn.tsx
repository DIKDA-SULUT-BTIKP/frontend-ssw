import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import Sulut from '../../images/logo/sulut.png';
import ToastNotification from '../../common/Toast';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { LoginUser } from '../../features/thunks/authThunks';
import { reset } from '../../features/slices/authSlice';
import Spinners from '../../common/Spinners';

interface AuthState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  user: any;
  message: string;
}

interface RootState {
  auth: AuthState;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [lengthEmail, setLengthEmail] = useState<number>(0);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, user, message } = useSelector(
    (state: RootState) => state.auth,
  );

  const schema = z.object({
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z
      .string()
      .min(6, { message: 'Kata sandi harus setidaknya 6 karakter' }),
    // .regex(/[a-z]/, { message: 'Kata sandi harus memiliki setidaknya satu huruf kecil' })
    // .regex(/[A-Z]/, { message: 'Kata sandi harus memiliki setidaknya satu huruf besar' })
    // .regex(/[0-9]/, { message: 'Kata sandi harus memiliki setidaknya satu angka' })
    // .regex(/[^a-zA-Z0-9]/, { message: 'Kata sandi harus memiliki setidaknya satu karakter khusus' }),
  });

  useEffect(() => {
    if (isError) {
      ToastNotification.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = schema.safeParse({ email, password });

      if (!result.success) {
        const fieldErrors: { email?: string; password?: string } = {};
        result.error.errors.forEach((error) => {
          if (error.path.includes('email')) fieldErrors.email = error.message;
          if (error.path.includes('password'))
            fieldErrors.password = error.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setErrors({});
      dispatch(LoginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setLengthEmail(value.length);
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="rounded-sm min-h-screen flex justify-center items-center border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap w-full items-center">
          <div className="hidden xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img src={Sulut} alt="Logo" />
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Masuk ke Aplikasi
              </h2>
              <form onSubmit={handleSignIn}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={email}
                      placeholder="example@gmail.com"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:${
                        lengthEmail <= 6 ? 'border-primary' : 'border-red-500'
                      } focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                    <span className="absolute right-4 top-4">
                      <HiOutlineMail size={20} />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={hidePassword ? 'password' : 'text'}
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={password}
                      placeholder="********"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                    <span className="absolute cursor-pointer right-4 top-4">
                      {hidePassword ? (
                        <IoEye
                          size={20}
                          onClick={() => setHidePassword(false)}
                        />
                      ) : (
                        <IoEyeOff
                          size={20}
                          onClick={() => setHidePassword(true)}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className={`w-full ${
                      isLoading || !email || !password
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer hover:shadow-1'
                    } rounded-lg flex justify-center border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90`}
                  >
                    {isLoading ? <Spinners /> : 'Masuk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
