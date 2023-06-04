import Link from 'next/link';
import { MoreMenuWrapper } from '../../atoms/MoreMenuWrapper';
import { MoreMenuListItem } from '../../atoms/MoreMenuListItem';
import { IMenuItems } from '../../organisms/MoreMenu/types';

const MoreMenuList = ({ items }: { items: IMenuItems[] }) => (
  <MoreMenuWrapper>
    {items.map(({ page, ...rest }, index) => (
      <Link href={page} key={index}>
        <a className="dropdown-item">
          <MoreMenuListItem {...rest} />
        </a>
      </Link>
    ))}
  </MoreMenuWrapper>
);

export { MoreMenuList };
