import s from './About.module.scss';
import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import { Link } from 'react-scroll';

const About = ({ marginBottom = 140 }) => {
  return (
    <section className={s.section} style={{ marginBottom: marginBottom }}>
      <Container>
        <div className={s.block}>
          <h1 className={s.title}>Test assignment for front-end developer</h1>
          <p className={s.description}>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
          <Link
            className={s.btn}
            to="sign up"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            href="#sign-up"
          >
            <Button title="Sign up" />
          </Link>
        </div>
      </Container>
    </section> // при нажатии на кнопку происходит плавный скролл к форме регистрации
  );
};

export default About;
