import s from './Button.module.scss';

const Button = ({ title, disabled = false, type = 'submit', width = 100, onClick }) => {
  return (
    <button
      className={s.btn}
      disabled={disabled}
      type={type}
      style={{ width: width }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
