import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_NAMES } from '../../../utils/enums';

const NavTabs = () => {
  const router = useRouter();

  return (
    <ul className="nav nav-tabs nav-tabs-underline-fill mb-3">
      <li className="nav-item" data-testid="NavTabs-Item1">
        <Link data-testid="NavTab1" href={PAGE_NAMES.SEARCH}>
          <a className={`nav-link ${router.pathname === PAGE_NAMES.SEARCH || router.pathname === PAGE_NAMES.HOME ? 'active' : ''}`}>Search</a>
        </Link>
      </li>
      <li className="nav-item" data-testid="NavTabs-Item2">
        <Link data-testid="NavTab2" href={PAGE_NAMES.CANDIDATES}>
          <a className={`nav-link ${router.pathname === PAGE_NAMES.CANDIDATES ? 'active' : ''}`}>Candidates</a>
        </Link>
      </li>
    </ul>
  );
};

export { NavTabs };
