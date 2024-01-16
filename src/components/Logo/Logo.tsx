import { Link } from 'react-router-dom';

import './Logo.scss';

export const Logo = () => {
  return (
    <Link className="logo" to="/">
      <img src="img/Logo.svg" alt="Logo" />
    </Link>
  );
};