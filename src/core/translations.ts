import i18next, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  FormInputError,
  FormInputLabel,
  HeaderText,
  LanguageNameSpace,
  LocalStorageItem,
  MainPageText,
  SignInPageText,
  SignUpPageText,
} from 'core/enums';
import { localStorageService } from 'services/localStorageHelper';

use(initReactI18next)
  .init({
    resources: {
      en: {
        [LanguageNameSpace.formInputLabels]: {
          [FormInputLabel.name]: FormInputLabel.name,
          [FormInputLabel.login]: FormInputLabel.login,
          [FormInputLabel.password]: FormInputLabel.password,
        },
        [LanguageNameSpace.signIn]: {
          [SignInPageText.signIn]: SignInPageText.signIn,
          [SignInPageText.dontHaveAnAccount]: SignInPageText.dontHaveAnAccount,
          [SignInPageText.register]: SignInPageText.register,
        },
        [LanguageNameSpace.signUp]: {
          [SignUpPageText.signUpTitle]: SignUpPageText.signUpTitle,
          [SignUpPageText.signUp]: SignUpPageText.signUp,
          [SignUpPageText.alreadyHaveAnAccount]: SignUpPageText.alreadyHaveAnAccount,
        },
        [LanguageNameSpace.formInputErrors]: {
          [FormInputError.required]: FormInputError.required,
          [FormInputError.onlyEnglishLetters]: FormInputError.onlyEnglishLetters,
          [FormInputError.nameMinLength]: FormInputError.nameMinLength,
          [FormInputError.loginMinLength]: FormInputError.loginMinLength,
          [FormInputError.passwordMinLength]: FormInputError.passwordMinLength,
          [FormInputError.loginOrPasswordIncorrect]: FormInputError.loginOrPasswordIncorrect,
        },
        [LanguageNameSpace.mainPage]: {
          [MainPageText.signIn]: MainPageText.signIn,
          [MainPageText.signUp]: MainPageText.signUp,
          [MainPageText.boards]: MainPageText.boards,
          [MainPageText.title]: MainPageText.title,
          [MainPageText.description]: MainPageText.description,
          [MainPageText.getStarted]: MainPageText.getStarted,
          [MainPageText.technologies]: MainPageText.technologies,
          [MainPageText.ourTeam]: MainPageText.ourTeam,
          [MainPageText.Andrey]: MainPageText.Andrey,
          [MainPageText.Alibek]: MainPageText.Alibek,
          [MainPageText.Roman]: MainPageText.Roman,
        },
        [LanguageNameSpace.header]: {
          [HeaderText.createNewBoard]: HeaderText.createNewBoard,
          [HeaderText.profile]: HeaderText.profile,
        },
      },
      ru: {
        [LanguageNameSpace.formInputLabels]: {
          [FormInputLabel.name]: 'Ваше имя',
          [FormInputLabel.login]: 'Логин',
          [FormInputLabel.password]: 'Пароль',
        },
        [LanguageNameSpace.signIn]: {
          [SignInPageText.signIn]: 'Войти',
          [SignInPageText.dontHaveAnAccount]: 'Ещё нет аккаунта? ',
          [SignInPageText.register]: 'Зарегистрироваться',
        },
        [LanguageNameSpace.signUp]: {
          [SignUpPageText.signUpTitle]: 'Регистрация',
          [SignUpPageText.signUp]: 'Зарегистрироваться',
          [SignUpPageText.alreadyHaveAnAccount]: 'Уже есть аккаунт? ',
        },
        [LanguageNameSpace.formInputErrors]: {
          [FormInputError.required]: 'Это поле обязательно для заполнения',
          [FormInputError.onlyEnglishLetters]: 'Это поле может содержать только английские буквы',
          [FormInputError.nameMinLength]: 'Имя должно содержать минимум 2 буквы',
          [FormInputError.loginMinLength]: 'Логин должен содержать минимум 4 буквы',
          [FormInputError.passwordMinLength]: 'Пароль должен содержать минимум 8 символов',
          [FormInputError.loginOrPasswordIncorrect]: 'Неверный логин или пароль!',
        },
        [LanguageNameSpace.mainPage]: {
          [MainPageText.signIn]: 'Войти',
          [MainPageText.signUp]: 'Зарегистрироваться',
          [MainPageText.boards]: 'Доски',
          [MainPageText.title]: 'Диспетчер задач',
          [MainPageText.description]:
            'Диспетчер задач — это набор гибких решений для управления работой, ' +
            'которые обеспечивают совместную работу всех команд, от концепции до клиента, позволяя вам вместе выполнять ' +
            'лучшую работу в своей жизни. Jirnuy предлагает несколько продуктов и вариантов развертывания, ' +
            'специально созданных для разработчиков программного обеспечения, ИТ, бизнеса, эксплуатации и т. д.',
          [MainPageText.getStarted]: 'Начать пользоваться',
          [MainPageText.technologies]: 'Технологии, использованные на проекте',
          [MainPageText.ourTeam]: 'Наша команда',
          [MainPageText.Andrey]: 'Андрей',
          [MainPageText.Alibek]: 'Алибек',
          [MainPageText.Roman]: 'Роман',
        },
        [LanguageNameSpace.header]: {
          [HeaderText.createNewBoard]: 'Создать доску',
          [HeaderText.profile]: 'Профиль',
        },
      },
    },
    fallbackLng: 'en',
    lng: i18next.language || localStorageService.get(LocalStorageItem.language),
  })
  .then(/* do nothing */);
