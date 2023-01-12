export enum Pages {
  columns = '/columns',
  main = '/',
  signUp = '/signUp',
  signIn = '/signIn',
  boards = '/boards',
  profile = '/profile',
}

export enum LangList {
  english = 'en',
  russian = 'ru',
}

export enum Color {
  none = 'none',
  confirm = '#97cf92',
  confirmHover = '#6bd161',
  cancel = '#dcdcdc',
  cancelHover = '#acacac',
  lightPink = '#FFE1E1',
  white = '#FFFFFF',
  red = '#FF0000',
  black = '#0F0F0F',
  bgColor = '#FaF8F5',
  gray = '#d9d8d7',
  main = 'linear-gradient(0deg,#ffbeb5,#ffcbd4,#f9dbea,#f4ebf6,#f9f9f9)',
  pink = '#FDBFB8',
  lightViolet = '#ffb8ec',
}

export enum LocalStorageItem {
  userToken = 'userToken',
  language = 'language',
  userLogin = 'userLogin',
}

export enum FormInputLabel {
  name = 'Your name',
  login = 'Your login',
  password = 'Your password',
}

export enum FormInput {
  name = 'name',
  login = 'login',
  password = 'password',
  nonexistentInput = 'nonexistentInput',
}

export enum FormInputError {
  required = 'This field is required',
  onlyEnglishLetters = 'This field should contain only english letters',
  nameMinLength = 'Name should have at least 2 letters',
  loginMinLength = 'Login should have at least 4 letters',
  passwordMinLength = 'Password should have at least 8 symbols',
  loginOrPasswordIncorrect = 'Login or password is incorrect!',
}

export enum Endpoint {
  signIn = '/auth/signin',
  signUp = '/auth/signup',
  boards = '/boards',
  columns = '/columns',
  tasks = '/tasks',
}

export enum FormDataInputLabel {
  title = 'title',
  description = 'description',
}

export enum FormDataInput {
  title = 'title',
  owner = 'owner',
  users = '1',
}

export enum FormDataInputError {
  required = 'This field is required',
}

export enum LanguageNameSpace {
  signIn = 'signIn',
  signUp = 'signUp',
  formInputLabels = 'formInputLabels',
  formInputErrors = 'formInputErrors',
  mainPage = 'mainPage',
  header = 'header',
  confirmationModal = 'confirmationModal',
}

export enum SignInPageText {
  signIn = 'Sign in',
  dontHaveAnAccount = "Don't have an account? ",
  register = 'Register',
}

export enum SignUpPageText {
  signUpTitle = 'Sign up',
  signUp = 'sign up',
  alreadyHaveAnAccount = 'Already have an account? ',
}

export enum MainPageText {
  signIn = 'Sign in',
  signUp = 'Sign up',
  boards = 'Boards',
  title = 'Task manager',
  description = 'Task Manager is a suite of agile work management solutions that powers collaboration across all teams ' +
    'from concept to customer, empowering you to do the best work of your life, together. Jirnuy offers several products ' +
    'and deployment options that are purpose-built for Software, IT, Business, Ops teams, and more.',
  getStarted = 'Get started',
  technologies = 'Technologies used in the project',
  ourTeam = 'Our team',
  Andrey = 'Andrey',
  Roman = 'Roman',
  Alibek = 'Alibek',
}

export enum AddButtonVariants {
  column = 'column',
  task = 'task',
}
export enum HeaderText {
  createNewBoard = 'Create new board',
  profile = 'Profile',
}

export enum FormText {
  createNewBoard = 'Create new board',
  editBoard = 'Edit Board',
  btnConfirm = 'Confirm',
  btnCancel = 'Cancel',
  btnEdit = 'Edit',
}

export enum ModalText {
  addBoardCongratulations = 'Congratulations! You are created new board!',
  addBoardAction = 'Now you can proceed with adding tasks!',
}

export enum Images {
  React = 'images/React.png',
  TS = 'images/Typescript.png',
  ReactRouter = 'images/ReactRouter.jpg',
  RTK = 'images/Redux.png',
  Mui = 'images/Mui.png',
  RHF = 'images/ReactHookForm.png',
  Andrey = 'images/andrey.jpg',
  Alibek = 'images/alibek.jpg',
  Roman = 'images/roman.jpg',
  Board = 'images/kanban.jpeg',
  School = 'images/school.svg',
  Avatar = 'images/avatar.png',
}
export enum StateStatus {
  loading = 'loading',
  resolved = 'resolved',
  rejected = 'rejected',
}

export enum RemovedElementType {
  board = 'board',
  column = 'column',
  task = 'task',
}

export enum ConfirmationModalText {
  messageBoard = 'Are you sure that you want to delete this board?',
  messageColumn = 'Are you sure that you want to delete this column?',
  messageTask = 'Are you sure that you want to delete this task?',
  buttonYes = 'Yes',
  buttonNo = 'No',
}

export enum ScenarioModalCreate {
  column = 'column',
  task = 'task',
}
