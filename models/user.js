const USER = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '', // min 4 symbols
};

const USER_FIELDS = Object.keys(USER);
const REQUIRED_FIELDS_CREATE = USER_FIELDS.filter((field) => field !== 'id');

export { USER, USER_FIELDS, REQUIRED_FIELDS_CREATE };
