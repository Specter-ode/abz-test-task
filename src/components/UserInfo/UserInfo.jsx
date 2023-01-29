import useWindowDimensions from 'services/hooks/useWindowDimensions';
import s from './UserInfo.module.scss';

const UserInfo = ({ currentUser }) => {
  const { width } = useWindowDimensions();
  return (
    <div className={s.block}>
      <div className={s.imageBlock}>
        <img className={s.img} src={currentUser.photo} alt={currentUser.name} width={34} />
      </div>
      {width > 767 && <p className={s.text}>{currentUser.name}</p>}
    </div>
  );
};

export default UserInfo;
