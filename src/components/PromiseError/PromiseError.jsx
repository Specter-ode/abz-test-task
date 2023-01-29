import s from './PromiseError.module.scss';

const PromiseError = ({ title, marginBottom = 50, marginLeft = 0 }) => {
  return (
    <p className={s.title} style={{ marginBottom: marginBottom, marginLeft: marginLeft }}>
      {title}
    </p>
  );
};

export default PromiseError;
