import '../sass/index.scss';
import { useEffect, useState } from 'react';
import About from './About/About';
import Header from './Header/Header';
import CardsList from './CardsList/CardsList';
import Form from './Form/Form';
import UserRegistered from './UserRegistered/UserRegistered';
import * as testApi from 'services/api/testApi';

export const App = () => {
  const [positions, setPositions] = useState([]); // список input type=['radio]  заполнится после операции get(/positions)
  const [cards, setCards] = useState([]); // список карточек с информацией об каждом юзере заполнится после операции get(/users)
  const [listInfo, setListInfo] = useState({}); // информация о списке(для работы кнопок изменения страницы переключения страниц юзеров)
  const [currentPage, setCurrentPage] = useState(1); // храним текущую страницу для корректной работы кнопок переключения страниц юзеров
  const [userId, setUserId] = useState(null); // значение измениться после успешной регистрации. После этого будет сделан запрос к юзеру по id для обновления хедера

  const [currentUser, setCurrentUser] = useState({});
  // ========================== Loading and Errors in Promise ==================================
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [error, setError] = useState(null);
  const [errorPositions, setErrorPositions] = useState(null);
  const [errorUserInfo, setErrorUserInfo] = useState(null);
  //=============================================================================================

  useEffect(() => {
    (async function fetchPositions() {
      setIsLoadingPositions(true);
      try {
        const data = await testApi.getPositions();
        setPositions(data.positions);
      } catch (error) {
        setErrorPositions(error.message);
      } finally {
        setIsLoadingPositions(false);
      }
    })(); // Самовызывающаяся функция (Immediately Invoked Function Expression)
  }, []); // делаем запрос при первой загрузке для рендера input type='radio'

  useEffect(() => {
    (async function fetchUsers() {
      setIsLoading(true);
      setError(false);
      try {
        const { users, page, total_pages, total_users, count, links } = await testApi.getUsers();
        setCards(users);
        setListInfo({
          page,
          total_pages,
          total_users,
          count,
          links,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })(); // IIFE
  }, [userId]); // useEffect отработает при первой загрузке и после регистрации юзера(чтоб список юзеров обновился с учетом нового юзера)

  useEffect(() => {
    if (!userId) return;
    (async function fetchUsers() {
      setIsLoadingUserInfo(true);
      try {
        const { user } = await testApi.getUserById(userId);
        setCurrentUser(user);
      } catch (error) {
        setErrorUserInfo(error.message);
      } finally {
        setIsLoadingUserInfo(false);
      }
    })(); // IIFE
  }, [userId]); // useEffect отработает после регистрации юзера

  const addUser = async formData => {
    setIsLoading(true);
    try {
      await testApi.getToken(); // получаем токер и прикрепляем в headers
      const data = await testApi.addUser(formData); // регистрируем нового юзера

      setUserId(data.user_id); // сохраняем id только что зарегистрированного юзера
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const moveToNextPage = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const { users, page, total_pages, total_users, count, links } = await testApi.getUsers(
        currentPage + 1
      ); // перелистываем список юзеров на 1 страницу вперед
      setCards(users); // полученный результат из промиса сохраняем
      setListInfo({ page, total_pages, total_users, count, links }); // полученный результат из промиса сохраняем
      setCurrentPage(currentPage + 1); // сохраняем новую текущую страницу
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToPrevPage = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const { users, page, total_pages, total_users, count, links } = await testApi.getUsers(
        currentPage - 1
      ); // перелистываем список юзеров на 1 страницу назад
      setCards(users); // полученный результат из промиса сохраняем
      setListInfo({ page, total_pages, total_users, count, links }); // полученный результат из промиса сохраняем
      setCurrentPage(currentPage - 1); // сохраняем новую текущую страницу
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ paddingBottom: 100 }}>
      <Header currentUser={currentUser} error={errorUserInfo} isLoading={isLoadingUserInfo} />
      <main>
        <About />
        <CardsList
          title="Working with GET request"
          cards={cards}
          moveToNextPage={moveToNextPage}
          moveToPrevPage={moveToPrevPage}
          isBtnMoveToNext={listInfo?.links?.next_url}
          isBtnMoveToPrev={listInfo?.links?.prev_url}
          error={error}
          isLoading={isLoading}
        />
        <Form
          title="Working with POST request"
          onSubmit={addUser}
          positions={positions}
          isLoading={isLoadingPositions}
          errorPositions={errorPositions}
          userId={userId}
        />
        {userId && <UserRegistered />}
      </main>
    </div>
  );
};
