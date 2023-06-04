import { titleCase } from '../../../utils';

const UnlockedCandidateIcon = ({ type }: { type: 'locked' | 'unlocked' }) => (
  <div>
    <i aria-hidden={true} className={`far fa-${type === 'locked' ? 'lock' : 'unlock'} pr-2 text-primary`} />
    <span>{titleCase(type)} Candidate</span>
  </div>
);

export { UnlockedCandidateIcon };
