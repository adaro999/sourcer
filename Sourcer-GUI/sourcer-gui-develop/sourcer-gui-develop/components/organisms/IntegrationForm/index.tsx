import React, { FormEvent, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Spinner } from '@jobtarget/ui-library';
import { authorizeDice } from '../../../api';
import { CloseButton } from '../../atoms/CloseButton';
import { SvgLoader } from '../../atoms/SvgLoader';
import { IIntegrationsCard } from '../../molecules/IntegrationsCard/types';

const IntegrationForm = ({ jtToken, ...rest }: IIntegrationsCard) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { connected, type, image, title, url, handleConnection } = rest;

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: make email and password required fields
    // TODO: disable form on submit to prevent double submit
    console.log('authorizeDice call\n');
    authorizeDice({ email, password, token: jtToken || '' }).then(data => {
      if (data) {
        setModalOpen(false);
        setIsLoading(false);
        handleConnection(true, type, url || '');
      }
    });
  };

  return (
    <>
      <Button outline={connected} type="button" color={connected ? '' : 'primary'} onClick={() => setModalOpen(true)}>
        {connected ? <>Disconnect</> : <>Sign in to Connect</>}
      </Button>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
        <Form onSubmit={formHandler}>
          <ModalHeader toggle={() => setModalOpen(!modalOpen)} close={<CloseButton onClick={() => setModalOpen(false)} />}>
            <SvgLoader className="ml-auto img-fluid wp-xs-25" height="150" name={image} width="200" />
            {title} Authentication
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            {isLoading && <Spinner variant="small" />}
            <Button type="button" onClick={() => setModalOpen(false)} color="link">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isLoading}>
              Connect
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export { IntegrationForm };
