import { useMemo } from 'react';
import { CardBody } from 'reactstrap';
import { Dt } from '../../atoms/Dt';
import { Dd } from '../../atoms/Dd';
import { titleCase } from '../../../utils';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';

const PROFILE_SOURCE = {
  PDL: 'pdl',
  JBT: 'jbt',
  RLI: 'rli',
  CAB: 'cab',
  IND: 'ind',
  DIC: 'dic',
};

const MapPastJobs = ({ job, profileSource }: ICard & { profileSource: string }) => {
  if (job?.length > 0) {
    switch (profileSource) {
      case PROFILE_SOURCE.PDL:
        // icon Title - Company
        return (
          <>
            {job.map(({ company }, index) => (
              <div key={index}>{company?.name}</div>
            ))}
          </>
        );

      case PROFILE_SOURCE.JBT:
        // Title - Company
        return (
          <>
            {job.map(({ company, title }, index) => (
              <div key={index}>
                {title?.name} - {company?.name}
              </div>
            ))}
          </>
        );

      default:
        return (
          <>
            {job.map(({ title }, index) => (
              <div key={index}>{title?.name}</div>
            ))}
          </>
        );
    }
  }

  return <span>N/A</span>;
};

const MapEducation = ({ education, profileSource }: ICard & { profileSource: string }) => {
  if (education?.length > 0) {
    switch (profileSource) {
      case PROFILE_SOURCE.PDL:
        // (icon (Date) if applicable) - Academy
        return (
          <>
            {education.map(({ end_date, school }, index) => (
              <div key={index}>{`${titleCase(school?.name)} ${end_date ? `(${end_date})` : ''}`}</div>
            ))}
          </>
        );

      case PROFILE_SOURCE.JBT:
        // Date - Academy
        return (
          <>
            {education.map(({ end_date, school }, index) => (
              <div key={index}>{`${titleCase(school?.name)} ${end_date ? `(${end_date})` : ''}`}</div>
            ))}
          </>
        );

      case PROFILE_SOURCE.RLI:
        // Type "Vocational"
        return <>{education.map((ed, index) => ed.degrees.map((degree, innerIndex) => <span key={innerIndex + '-' + index}>{degree || 'N/A'}</span>))}</>;

      case PROFILE_SOURCE.DIC:
        // no education field in Dice
        return <span>N/A</span>;

      default:
        return (
          <>
            {education.map((ed, index) => {
              return ed.degrees.map((deg, innerIndex) => <div key={`${index}-${innerIndex}`}>{deg || 'N/A'}</div>);
            })}
          </>
        );
    }
  }

  return <span>N/A</span>;
};

const ProfileCardBody = (props: ICard) => {
  const profSource = useMemo(() => props.id.substring(0, 3).toLowerCase(), [props.id]);

  return (
    <CardBody className="position-relative pt-2">
      <dl className="mb-0">
        {/*CURRENT JOB*/}
        <Dt title="Present Job">
          <i className="fal fa-briefcase mr-1" />
        </Dt>
        <Dd>{props.current_job_title || props.job[0]?.title?.name}</Dd>

        {/*PAST JOBS*/}
        <Dt title="Past Jobs">
          <i className="fal fa-business-time mr-1" />
        </Dt>
        {props.job.length > 0 && (
          <Dd>
            <MapPastJobs profileSource={profSource} {...props} />
          </Dd>
        )}

        {/*EDUCATION*/}
        {props.job.length > 0 && (
          <>
            <Dt title="Education">
              <i className="fal fa-graduation-cap mr-1" />
            </Dt>
            <Dd>
              <MapEducation profileSource={profSource} {...props} />
            </Dd>
          </>
        )}

        {/*SKILLS*/}
        {Array.isArray(props.skills) && props.skills?.length > 0 && (
          <>
            <Dt title="Skills">
              <i className="fal fa-badge-check mr-1" />
            </Dt>
            <Dd>
              {props.skills.map((skill, index) => (
                <span key={index} className="pr-1 text-capitalize">
                  {skill}
                  {index === props.skills.length - 1 ? '' : ','}
                </span>
              ))}
            </Dd>
          </>
        )}
      </dl>
    </CardBody>
  );
};

export { ProfileCardBody };
