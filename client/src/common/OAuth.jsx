import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebase';
import { useMutation } from '@tanstack/react-query';
import { googleAuth } from '@/api/users.api';
import { useUserStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const onSigninSuccess = useUserStore((state) => state.setOnLoginSuccess);
  const navigate = useNavigate();

  const googleAuthMutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: (data) => onSigninSuccess(data),
  });

  const onGoogleClickHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const googleUserData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      googleAuthMutation.mutate(googleUserData);
      navigate('/', { replace: true });
    } catch (err) {
      console.log('Could not sign in with google', err);
    }
  };

  return (
    <button
      onClick={onGoogleClickHandler}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'
    >
      Continue with Google
    </button>
  );
}
