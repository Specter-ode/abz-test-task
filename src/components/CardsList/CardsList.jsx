import s from './CardsList.module.scss';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import PromiseError from 'components/PromiseError/PromiseError';
import useWindowDimensions from 'services/hooks/useWindowDimensions';

const CardsList = ({
  isLoading,
  title,
  cards,
  marginBottom = 140,
  moveToNextPage,
  moveToPrevPage,
  isBtnMoveToNext = true,
  isBtnMoveToPrev,
  error,
}) => {
  const { width } = useWindowDimensions(); // ширина экрана
  const sortedCards = [...cards].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  ); // сортируем массив карточек по дате регистрации(новые идут первыми)

  const loaderLeight = width < 768 ? 1623 : width < 1080 ? 794 : 537; // регулирует высоту компонента Loader, чтоб элементы и страница не прыгала во время загрузки
  return (
    <section style={{ marginBottom: marginBottom }} id="users">
      <Container>
        <div className={s.block}>
          <h2 className={s.title}>{title}</h2>
          {error && <PromiseError title={error} />}
          {isLoading ? (
            <Loader height={loaderLeight} size={150} marginBottom={50} />
          ) : (
            <ul className={s.list}>
              {sortedCards.map(card => (
                <Card key={card.id} card={card} />
              ))}
            </ul>
          )}

          <div className={s.btnBlock}>
            {isBtnMoveToPrev && (
              <Button title="Show prev" width={120} type="button" onClick={moveToPrevPage} />
            )}
            {isBtnMoveToNext && (
              <Button title="Show more" width={120} type="button" onClick={moveToNextPage} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CardsList;
