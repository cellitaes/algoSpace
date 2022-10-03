import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);
const RegisterSchema = Yup.object().shape({
   login: Yup.string()
      .min(7, 'Login powinien zawierać co najmniej 7 znaków.')
      .required('Wpisz login.'),
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
   email: Yup.string()
      .matches(
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Wprowadź prawidłowy adres email.'
      )
      .required('Wprowadź adres email.'),
});

export default RegisterSchema;
