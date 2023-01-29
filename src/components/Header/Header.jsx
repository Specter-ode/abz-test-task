import s from './Header.module.scss';
import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import UserInfo from 'components/UserInfo/UserInfo';
import Loader from 'components/Loader/Loader';
import PromiseError from 'components/PromiseError/PromiseError';

const Header = ({ currentUser, isLoading, error }) => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.block}>
          <Logo className={s.logo} />
          {error ? (
            <PromiseError title={error} marginBottom={0} marginLeft={20} />
          ) : (
            <div className={s.box}>
              <Navigation userRegistered={currentUser.id} />
              {isLoading ? (
                <div className={s.loaderBox}>
                  <Loader size={34} />
                </div>
              ) : (
                currentUser?.id && <UserInfo currentUser={currentUser} />
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
