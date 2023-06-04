import React, { PropsWithChildren } from 'react';
import { Button, Col, Container, ModalBody, ModalFooter, Row } from 'reactstrap';
import $ from 'jquery';
import { Modal, ModalContainer } from '@jobtarget/ui-library';
import { IAdvancedTools } from './types';

const AdvancedTools = ({ children, jobTitleSkills, limitSearch, rulesButton, submitButton, tokenSkills }: PropsWithChildren<IAdvancedTools>) => (
  <>
    <div className="d-flex align-items-center">
      <Button color="transparent" onClick={() => $('#modalId').modal('show')}>
        <i className="fal fa-sliders-h fa-lg pr-2 text-primary" />
        <span className="text-body h6 font-weight-normal">Advanced Tools</span>
      </Button>
      {rulesButton}
    </div>
    <Modal isBlank size="lg">
      <ModalContainer.Header>
        <i className="fal fa-sliders-h pr-2 text-primary" /> Advanced Tools
      </ModalContainer.Header>
      <ModalBody>
        <Container>
          <Row className="bg-gray-100 px-3 pt-2 pb-3 mb-3 mt-0">{children}</Row>
          <Row>
            <Col xs={12}>
              <div className="d-flex mb-4">
                <legend className="h6 d-flex w-auto align-items-center mb-0 mr-3 font-weight-normal">Limit Search To:</legend>
                {limitSearch}
              </div>
            </Col>
            <Col xs={12}>
              <div className="mb-5">{tokenSkills}</div>
            </Col>
            <Col xs={12}>
              <div className="mb-4">{jobTitleSkills}</div>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => $('#modalId').modal('hide')} color="link" type="button">
          Cancel
        </Button>
        {submitButton}
      </ModalFooter>
    </Modal>
  </>
);

export { AdvancedTools };
