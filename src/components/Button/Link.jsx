import s from './Button.module.scss';

const Link = ({ title, to, width = 100 }) => {
  return (
    <a href={to} className={s.btn} style={{ width: width }}>
      {title}
    </a>
  );
};

export default Link;
