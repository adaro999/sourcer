import { IMoreMenuListItem } from './types';

const MoreMenuListItem = ({ description, icon, title, variant }: IMoreMenuListItem) => {
  const sizes = variant === 'large' ? { icon: 'h4 mr-3', text: 'h5' } : { icon: 'h6 mr-2', text: 'h6' };
  const color = title === 'Delete Note' ? 'text-danger' : 'text-body';

  return (
    <span className="d-flex align-items-center">
      <i aria-hidden="true" className={`mb-0 ${icon} ${sizes.icon} ${color}`} />
      <span>
        <div className={`${sizes.text} mb-0 ${color} font-weight-normal`}>{title}</div>
        {description && <p className="mb-0">{description}</p>}
      </span>
    </span>
  );
};

export { MoreMenuListItem };
