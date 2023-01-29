import s from './Navigation.module.scss';
import { Link } from 'react-scroll';

const Navigation = ({ userRegistered }) => {
  return (
    // при нажатии на кнопку происходит плавный скролл к указаной в ней секции
    <nav className={s.block}>
      <Link
        className={s.btn}
        to="users"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        href="#users"
      >
        Users
      </Link>
      {!userRegistered && (
        <Link
          className={s.btn}
          to="sign-up"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          href="#sign-up"
        >
          Sign up
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
