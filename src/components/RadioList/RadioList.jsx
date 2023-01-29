import s from './RadioList.module.scss';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';
import { ReactComponent as UncheckedIcon } from 'assets/icons/unchecked.svg';
import PromiseError from 'components/PromiseError/PromiseError';

const RadioList = ({ title, name, positions, handleChange, position_id, error }) => {
  // кастомный input type['radio']. Оригинальный input radio скрыт, но он реагирует на клики. В зависимости от value разные иконки
  return (
    <div className={s.section}>
      <p className={s.title}>{title}</p>
      {error && <PromiseError title={error} marginBottom={0} />}
      {positions.map(el => {
        return (
          <div key={el.id} className={s.block}>
            <label for={el.name} className={s.label}>
              <input
                id={el.name}
                className={s.lnput}
                type="radio"
                name={name}
                value={el.id}
                checked={position_id === el.id}
                onChange={handleChange}
              />
              {position_id === el.id ? (
                <CheckedIcon className={s.icon} />
              ) : (
                <UncheckedIcon className={s.icon} />
              )}

              {el.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default RadioList;
