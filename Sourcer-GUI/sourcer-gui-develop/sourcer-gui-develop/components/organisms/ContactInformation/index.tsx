import React, { PropsWithChildren, useState } from 'react';
import { Collapse } from 'reactstrap';
import { ContactInfoButton } from '../../atoms/ContactInfoButton';
import { SvgLoader } from '../../atoms/SvgLoader';
import { IContactInformation } from './types';
import styles from './styles.module.scss';

const ContactInformation = ({ children, isEnriched, items, isOpen }: PropsWithChildren<IContactInformation>) => {
  const [isActive, setIsActive] = useState(isOpen || false);

  return (
    <div className="mb-4">
      <ContactInfoButton onClick={() => setIsActive(!isActive)}>
        <div className={`d-flex justify-content-between align-items-center ${isEnriched ? 'pt-3' : ''}`}>
          <span>
            <i className={`fal fa-${isActive ? 'minus' : 'plus'}-circle mr-2 text-primary`}></i>Contact Information
          </span>
          <div>{children}</div>
        </div>
      </ContactInfoButton>
      <Collapse isOpen={isActive}>
        <ul className="border rounded-bottom border-top-0 list-unstyled px-3">
          {items.map(({ icon, info, title }, index) => (
            <li className={`${styles.list} d-flex align-items-start justify-content-between py-3 border-bottom`} key={index}>
              <div>
                <i className={`fal ${icon} mr-2`}></i>
                {title}
              </div>
              <div className="text-right" style={index == 0 ? { textTransform: 'capitalize' } : {}}>
                {info?.length === 0 && <span className="font-weight-semi-bold">N/A</span>}
                {info?.map((inner, index) => {
                  const isEnriched = inner?.includes('data-enriched="true"');

                  return (
                    <div className={`${styles.item} d-flex justify-content-end pl-2 pb-3`} key={index}>
                      {isEnriched && <SvgLoader className="mr-2" name="Enrich" />}
                      <div className="font-weight-semi-bold" dangerouslySetInnerHTML={{ __html: inner?.toString() || '' }} />
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export { ContactInformation };
