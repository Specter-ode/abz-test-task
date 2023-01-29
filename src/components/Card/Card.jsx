import s from './Card.module.scss';
import useWindowDimensions from 'services/hooks/useWindowDimensions';
import emptyUserPhoto from 'assets/images/emptyPhoto.jpg';
import { checkImageFormatFromDB } from 'services/helpers/validateImg';

const Card = ({ card }) => {
  const { width } = useWindowDimensions();
  const { position, name, photo, phone, email } = card;
  const correctPhoto = checkImageFormatFromDB(photo) ? photo : emptyUserPhoto; // если на сервере фотография сохранена в неправильном формате, то мы подставляем картинку заглушку

  const nomalizedText = text => {
    if (width < 768) {
      return {
        tooltip: text.length > 29, // проверяем будет ли добавлен tooltip
        value: text.length > 29 ? text.slice(0, 27) + '...' : text, // обрезаем длина текста и подставляем три точки если не помешается в контейнер в зависимости от ширины экрана
      };
    }
    if (width < 1024) {
      return {
        tooltip: text.length > 31,
        value: text.length > 31 ? text.slice(0, 29) + '...' : text,
      };
    }
    return {
      tooltip: text.length > 25,
      value: text.length > 25 ? text.slice(0, 23) + '...' : text,
    };
  };

  return (
    <li className={s.card}>
      <img className={s.image} src={correctPhoto} alt={name} width={70} />
      {nomalizedText(name).tooltip ? (
        <p className={s.name} card-tooltip={name}>
          {nomalizedText(name).value}
        </p>
      ) : (
        <p className={s.name}>{name}</p>
      )}
      <div>
        <p className={s.info}>{position}</p>
        {nomalizedText(email).tooltip ? (
          <a className={s.email} href={`mailto:${email}`} card-tooltip={email}>
            {nomalizedText(email).value}
          </a>
        ) : (
          <a className={s.info} href={`mailto:${email}`}>
            {email}
          </a>
        )}

        <a className={s.info} href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
    </li>
  );
};

export default Card;
