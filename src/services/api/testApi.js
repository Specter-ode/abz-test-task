import axios from 'axios'; // Тело запроса должно быть строкой, axios за нас под капотом приводит к строке методом JSON.stringify()
//    и когда получает ответ не надо использовать json(). И не нужно делать проверку  (response.ok)

const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1', // базовый путь к api
});

export const setTokenInHeadears = token => {
  // функция для прикрепления токена в headers
  if (token) {
    return (instance.defaults.headers.post['token'] = token);
  }
  instance.defaults.headers.post['token'] = '';
};

export const getToken = async () => {
  const { data } = await instance.get('/token');
  setTokenInHeadears(data.token); // прикрепили токен в headers
  return data;
};

export const getUsers = async (page = 1, count = 6) => {
  const { data } = await instance.get('/users', {
    params: {
      count,
      page,
    },
  });
  return data;
};

export const addUser = async formData => {
  const { data } = await instance.post('/users', formData, {
    // для регистрации пользователя помимо прикрепление токена, которое я сделал ранее. нужно поставить правильно тип conten-type иначе будет ошибка при запросах
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getUserById = async id => {
  const { data } = await instance.get(`/users/${id}`);
  return data;
};

export const getPositions = async () => {
  const { data } = await instance.get('/positions');
  return data;
};
