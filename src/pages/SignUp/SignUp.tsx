import React from 'react';
import { Box, Button, Divider, FormControl, Link, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import { FormInputType } from 'core/interfaces/others';
import {
  FormInput,
  FormInputError,
  FormInputLabel,
  LanguageNameSpace,
  Pages,
  SignInPageText,
  SignUpPageText,
} from 'core/enums';
import { createUser } from 'services/users';
import { isUserCreatedResponse } from 'services/typeguards';
import { setLoadingStatus } from 'features/app/appSlice';
import { useAppDispatch } from 'app/hooks';
import styles from './styles';

const SignUp = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation([
    LanguageNameSpace.signUp,
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

  const onSubmit: SubmitHandler<FormInputType> = async ({ name, login, password }) => {
    dispatch(setLoadingStatus(true));
    const response = await createUser({ name, login, password });
    dispatch(setLoadingStatus(false));
    if (isUserCreatedResponse(response)) {
      navigate(Pages.main);
    } else {
      setError(FormInput.nonexistentInput, { type: 'server', message: response.message });
    }
  };

  const handleLoginChange = () => {
    clearErrors(FormInput.nonexistentInput);
  };

  return (
    <>
      <Box sx={styles.content}>
        <FormControl component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h4" sx={styles.formHeader}>
            {t(SignUpPageText.signUpTitle, { ns: LanguageNameSpace.signUp })}
          </Typography>
          <Box sx={styles.inputField}>
            <TextField
              label={t(FormInputLabel.name, { ns: LanguageNameSpace.formInputLabels })}
              sx={styles.input}
              {...register(FormInput.name, {
                required: {
                  value: true,
                  message: t(FormInputError.required, { ns: LanguageNameSpace.formInputErrors }),
                },
                minLength: {
                  value: 2,
                  message: t(FormInputError.nameMinLength, {
                    ns: LanguageNameSpace.formInputErrors,
                  }),
                },
                pattern: {
                  value: /[a-z]+/i,
                  message: t(FormInputError.onlyEnglishLetters, {
                    ns: LanguageNameSpace.formInputErrors,
                  }),
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name={FormInput.name}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Typography key={type} sx={styles.errorMessage}>
                    {message}
                  </Typography>
                ))
              }
            />
          </Box>

          <Box sx={styles.inputField}>
            <TextField
              label={t(FormInputLabel.login, { ns: LanguageNameSpace.formInputLabels })}
              type="text"
              sx={styles.input}
              {...register(FormInput.login, {
                required: {
                  value: true,
                  message: t(FormInputError.required, { ns: LanguageNameSpace.formInputErrors }),
                },
                minLength: {
                  value: 4,
                  message: t(FormInputError.loginMinLength, {
                    ns: LanguageNameSpace.formInputErrors,
                  }),
                },
                pattern: {
                  value: /[a-z]/i,
                  message: t(FormInputError.onlyEnglishLetters, {
                    ns: LanguageNameSpace.formInputErrors,
                  }),
                },
              })}
              onChange={handleLoginChange}
            />
            <ErrorMessage
              errors={errors}
              name={FormInput.login}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Typography key={type} sx={styles.errorMessage}>
                    {message}
                  </Typography>
                ))
              }
            />
          </Box>
          <Box sx={styles.inputField}>
            <TextField
              label={t(FormInputLabel.password, { ns: LanguageNameSpace.formInputLabels })}
              type="password"
              sx={styles.input}
              {...register(FormInput.password, {
                required: {
                  value: true,
                  message: t(FormInputError.required, { ns: LanguageNameSpace.formInputErrors }),
                },
                minLength: {
                  value: 8,
                  message: t(FormInputError.passwordMinLength, {
                    ns: LanguageNameSpace.formInputErrors,
                  }),
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name={FormInput.password}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Typography key={type} sx={styles.errorMessage}>
                    {message}
                  </Typography>
                ))
              }
            />
          </Box>
          <Button variant="contained" sx={styles.button} type="submit">
            {t(SignUpPageText.signUp, { ns: LanguageNameSpace.signUp })}
          </Button>
          {errors.nonexistentInput && (
            <Typography sx={styles.serverErrorMessage}>
              {errors.nonexistentInput.message}
            </Typography>
          )}
          <Divider sx={styles.divider} />
          <Typography sx={styles.helperText}>
            {t(SignUpPageText.alreadyHaveAnAccount, { ns: LanguageNameSpace.signUp })}
            <Link component={RouterLink} to={Pages.signIn}>
              {t(SignInPageText.signIn, { ns: LanguageNameSpace.signIn })}
            </Link>
          </Typography>
        </FormControl>
      </Box>
    </>
  );
};

export default SignUp;
