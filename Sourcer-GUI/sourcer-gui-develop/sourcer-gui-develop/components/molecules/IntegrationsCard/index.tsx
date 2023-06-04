import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { SvgLoader } from '../../atoms/SvgLoader';
import { IntegrationForm } from '../../organisms/IntegrationForm';
import { IIntegrationsCard } from './types';

const IntegrationsCard = ({ connected, handleConnection, image, jtToken, title, type, url }: IIntegrationsCard) => (
  <Card>
    <CardBody>
      <div className="d-flex w-100 align-items-start">
        <div>
          <div className="d-flex">
            <h4 className="pr-2 mb-0">{title}</h4>
            {connected && <span className="bg-light-success px-2 py-1 text-sm rounded d-inline-block text-dark-success">Active</span>}
          </div>
          <p>{`Connect to your ${title} resume search contract and access it directly in your JobTarget account.`}</p>
        </div>
        <SvgLoader className="ml-auto img-fluid wp-xs-25" height="150" name={image} width="200" />
      </div>
      {type == 'dic' && !connected ? (
        <>
          <IntegrationForm {...{ connected, handleConnection, image, jtToken, title, type, url }} />
        </>
      ) : (
        <>
          {connected && (
            <Button type="button" outline onClick={() => handleConnection(false, type, url || '')}>
              Disconnect
            </Button>
          )}
          {!connected && (
            <Button type="button" color="primary" onClick={() => handleConnection(true, type, url || '')}>
              Sign in to Connect
            </Button>
          )}
        </>
      )}
    </CardBody>
  </Card>
);

export { IntegrationsCard };
