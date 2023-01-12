import React from 'react';
import { Box, Button, Divider, FormControl, Link, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FormInput,
  FormInputError,
  FormInputLabel,
  LanguageNameSpace,
  Pages,
  SignInPageText,
} from 'core/enums';
import { FormInputType } from 'core/interfaces/others';
import { signIn } from 'services/api';
import { isServerError } from 'services/typeguards';
import Footer from 'components/Footer';
import { useAppDispatch } from 'app/hooks';
import { setLoadingStatus, setUserLogin } from 'features/app/appSlice';
import styles from './styles';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation([
    LanguageNameSpace.signIn,
    LanguageNameSpace.formInputLabels,
    LanguageNameSpace.formInputErrors,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormInputType>({ criteriaMode: 'all' });

  const onSubmit: SubmitHandler<FormInputType> = async ({ login, password }) => {
    dispatch(setLoadingStatus(true));
    const response = await signIn({ login, password });
    dispatch(setLoadingStatus(false));
    if (!isServerError(response)) {
      dispatch(setUserLogin(login));
      navigate(Pages.main);
    } else {
      setError(FormInput.nonexistentInput, {
        type: 'server',
        message: t(FormInputError.loginOrPasswordIncorrect, {
          ns: LanguageNameSpace.formInputErrors,
        }) as string,
      });
    }
  };

  const handleChange = () => {
    clearErrors(FormInput.nonexistentInput);
  };

  return (
    <>
      <Box sx={styles.content}>
        <FormControl component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h4" sx={styles.formHeader}>
            {t(SignInPageText.signIn, { ns: LanguageNameSpace.signIn })}
          </Typography>
          <TextField
            label={t(FormInputLabel.login, { ns: LanguageNameSpace.formInputLabels })}
            sx={styles.input}
            {...register(FormInput.login, {
              required: {
                value: true,
                message: t(FormInputError.required, { ns: LanguageNameSpace.formInputErrors }),
              },
            })}
            onChange={handleChange}
          />
          <Typography sx={styles.errorMessage}>{errors.login?.message}</Typography>
          <TextField
            label={t(FormInputLabel.password, { ns: LanguageNameSpace.formInputLabels })}
            type="password"
            sx={styles.input}
            {...register(FormInput.password, {
              required: {
                value: true,
                message: t(FormInputError.required, { ns: LanguageNameSpace.formInputErrors }),
              },
            })}
            onChange={handleChange}
          />
          <Typography sx={styles.errorMessage}>{errors.password?.message}</Typography>
          <Button variant="contained" sx={styles.button} type="submit">
            {t(SignInPageText.signIn, { ns: LanguageNameSpace.signIn })}
          </Button>
          <Typography sx={styles.serverErrorMessage}>{errors.nonexistentInput?.message}</Typography>
          <Divider sx={styles.divider} />
          <Typography sx={styles.helperText}>
            {t(SignInPageText.dontHaveAnAccount, { ns: LanguageNameSpace.signIn })}
            <Link component={RouterLink} to={Pages.signUp}>
              {t(SignInPageText.register, { ns: LanguageNameSpace.signIn })}
            </Link>
          </Typography>
        </FormControl>
      </Box>
      <Footer />
    </>
  );
};

export default SignIn;
