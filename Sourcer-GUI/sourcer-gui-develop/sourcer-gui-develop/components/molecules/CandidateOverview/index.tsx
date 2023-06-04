import { PropsWithChildren } from 'react';
import { titleCase } from '../../../utils';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';
import styles from './styles.module.scss';

const Body = ({ children }: PropsWithChildren<Record<string, unknown>>) => <div className={`${styles.body} pl-3 pb-3 border-bottom text-gray-600`}>{children}</div>;

const Title = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <div className="text-gray-900 pt-3 pl-3 font-weight-semi-bold" style={{ fontSize: '16px' }}>
    {children}
  </div>
);

const CandidateOverview = ({ education, job, location, name, skills }: Partial<ICard>) => (
  <div>
    <h4 className="mb-0 pt-2 pb-4 text-primary">Candidate Overview</h4>
    <div className="border rounded">
      <Title>{titleCase(name?.first_name)}</Title>
      <Body>{titleCase(location?.toString())}</Body>
      <Title>Summary</Title>
      <Body>{job?.[job.length - 1]?.summary}</Body>
      <Title>Experience</Title>
      <Body>
        {job && job?.length > 0 && (
          <ul className="p-0 m-0 list-unstyled">
            {job?.map(({ company, end_date, start_date, title }, index) => (
              <li key={index}>
                {titleCase(title?.name)} - {titleCase(company?.name)} - {start_date} - {end_date}
              </li>
            ))}
          </ul>
        )}
      </Body>
      <Title>Education</Title>
      <Body>
        {education && education.length > 0 && (
          <ul className="p-0 m-0 list-unstyled">
            {education?.map(({ end_date, school }, index) => (
              <li key={index}>{`${titleCase(school?.name)} ${end_date ? `(${end_date})` : ''}`}</li>
            ))}
          </ul>
        )}
      </Body>
      <Title>Skills</Title>
      <Body>
        {skills &&
          Array(skills)
            .flat()
            .map((skill, index) => (
              <li className="d-inline-block pr-1" key={index}>
                {titleCase(skill)},
              </li>
            ))}
      </Body>
    </div>
  </div>
);

export { CandidateOverview };
