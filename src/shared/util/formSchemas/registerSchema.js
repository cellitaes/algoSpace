import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);
const RegisterSchema = Yup.object().shape({
   login: Yup.string()
      .required('Wprowadź nazwę użytkownika.')
      .min(3, 'Nazwa użytkownika musi zawierać co najmniej 3 znaki'),
   password: Yup.string()
      .required('Wprowadź hasło.')
      .min(
         8,
         'Hasło musi zawierać co najmniej 8 znaków, z czego jeden musi być wielką literą, małą literą oraz musi posiadać cyfrę oraz znak specjalny'
      )
      .minLowercase(1, 'Hasło musi zawierać co najmniej jedną małą literę.')
      .minUppercase(1, 'Hasło musi zawierać co najmniej jedną wielką literę.')
      .minNumbers(1, 'Hasło musi zawierać co najmniej jedną cyfrę.')
      .minSymbols(1, 'Hasło musi zawierać co najmniej jeden znak specjalny.'),
   confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Wprowadzone hasła muszą być takie same'
   ),
});

export default RegisterSchema;
