import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useErrorStore, useUserStore } from '@/store';
import { signin, signup } from '@/api/users.api';
import SignIn from '@/features/Login/SignIn';
import SignUp from '@/features/Login/SignUp';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [error, setOnLoginError] = useErrorStore((state) => [
    state.error,
    state.setOnError,
  ]);

  const setOnLoginSuccess = useUserStore((state) => state.setOnLoginSuccess);

  const mutationFunction = isLogin ? signin : signup;

  const onSubmitMutation = useMutation({
    mutationFn: mutationFunction,
    onError: (data) => setOnLoginError(data.message),
    onSuccess: (data) => {
      if (data.success === false) {
        setOnLoginError(data.message);
        return;
      } else {
        setOnLoginSuccess(data);
        {
          isLogin ? setIsLogin(true) : navigate('/', { replace: true });
        }
      }
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitMutation.mutate(formData);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {!isLogin ? (
        <SignUp
          isLoading={onSubmitMutation.isPending}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <SignIn
          isLoading={onSubmitMutation.isPending}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
}
