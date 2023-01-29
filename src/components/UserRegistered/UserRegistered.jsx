import s from './UserRegistered.module.scss';
import Container from 'components/Container/Container';
import registerSuccess1x from '../../assets/images/register-success-1x.png';
import registerSuccess2x from '../../assets/images/register-success-2x.png';

const UserRegistered = () => {
  return (
    <section className={s.section}>
      <Container>
        <h2 className={s.title}>User successfully registered</h2>
        <img
          className={
            s.image
          } /* Браузер переопределит путь к 2x изображению если плотность экрана как минимум 2 */
          src={registerSuccess1x}
          srcSet={`${registerSuccess1x} 1x, ${registerSuccess2x} 2x`}
          alt="User successfully registered"
          width={290}
        />
      </Container>
    </section>
  );
};

export default UserRegistered;
