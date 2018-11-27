const BASE_URL = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
// const { BASE_URL } = process.env;
export const userConstant = {
  SIGNIN_URL: `${BASE_URL}/auth/login`,
  SIGNUP_URL: `${BASE_URL}/auth/signup`,
};

export const entryConstant = {
  ENTRIES_URL: `${BASE_URL}/entries`,
};