import { useCallback, useEffect, useState } from 'react';
import { Checkbox, InputField, RadioGroupField, SelectField, Spinner, TextareaField } from '@jobtarget/ui-library';
import { CollapseItem } from '../CollapseItem';
import { PillButtonToggle } from '../PillButtonToggle';
import { getEmailTemplates, getJobsById, getJobsJobTarget, getOtherJobs } from '../../../api';
import { IGetEmailTemplatesRes, IGetJobsJobTargetRes, IGetOtherJobsRes } from '../../../api/types';
import { IInviteToConnectApplyForm, IList } from './types';
import styles from './styles.module.scss';

const InviteToConnectApplyForm = ({ formState, recruiter, jtToken, updateForm }: IInviteToConnectApplyForm) => {
  const [activeButton, setActiveButton] = useState(0);
  const [jobDetailType, setJobDetailType] = useState('use-jobs');
  const [jtJobs, setJtJobs] = useState<IGetJobsJobTargetRes>();
  const [jtList, setJtList] = useState<IList[]>([]);
  const [jtJobsSelect, setJtJobsSelect] = useState('');
  const [otherJobsSelect, setOtherJobsSelect] = useState('');
  const [otherJobs, setOtherJobs] = useState<IGetOtherJobsRes[]>([]);
  const [otherList, setOtherList] = useState<IList[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<IGetEmailTemplatesRes[]>([]);
  const [emailList, setEmailList] = useState<IList[]>([]);
  const { division_id } = recruiter;

  const fetchJobs = useCallback(async () => {
    if (division_id) {
      updateForm({ isFetching: true });
      // get jobs and populate dropdown options
      await getJobsJobTarget({ division_id, token: jtToken || '' }).then(data => {
        if (data) {
          const jlist = data?.map(v => ({ text: v.position?.toString(), value: v.job_id.toString() }));
          setJtJobs(data);
          setJtList(jlist);
          updateForm({ isFetching: false });
        }
      });
    }
  }, [division_id, jtToken, updateForm]);

  const fetchOtherJobs = useCallback(async () => {
    updateForm({ isFetching: true });
    // get other jobs and populate dropdown options
    await getOtherJobs({ token: jtToken || '' }).then(data => {
      if (data) {
        // SRCR-264: look for saved opportunity names in the data first, use job title as a fallback
        const olist = data?.map(v => ({ text: v?.oppurtunity_name.toString() || v?.job_title?.toString(), value: v?.s_jobs_id?.toString() }));
        setOtherJobs(data);
        setOtherList(olist);
        updateForm({ isFetching: false });
      }
    });
  }, [jtToken, updateForm]);

  const fetchEmails = useCallback(async () => {
    updateForm({ isFetching: true });
    // get email templates and populate dropdown options
    const data = await getEmailTemplates({ token: jtToken || '' });
    if (data) {
      const elist = data?.map(v => ({ text: v?.template_name?.toString(), value: v?.template_id?.toString() }));
      setEmailTemplates(data);
      setEmailList(elist);
      updateForm({ isFetching: false });
    }
  }, [jtToken, updateForm]);

  const resetJobsForm = useCallback(() => {
    updateForm({
      jobSelect: 'Select job from JobTarget',
      jobCompany: '',
      jobTitle: '',
      jobDescription: '',
      jobLocation: '',
      jobLink: '',
    });
  }, [updateForm]);

  const fetchJob = useCallback(
    async (id: string) => {
      if (id && id !== 'Select job from JobTarget') {
        updateForm({ isFetching: true });
        await getJobsById({ job_id: id, token: jtToken || '' }).then(data => {
          if (data?.name) {
            // TODO: find a better html parser; move to util
            const parsedDescription = data?.description
              .toString()
              .replace(/<br\s*[\/]?>|<p\s*[\/]?>|<div\s*[\/]?>/gi, '\n')
              .replace(/<h\d?\s*[\/]?>/gi, '\n\n')
              .replace(/(<([^>]+)>)/gi, '')
              .replace(/\&amp;/gi, '&')
              .replace(/\&apos;|\&#39;/gi, "'")
              .replace(/\&bull;/gi, '•');
            updateForm({
              // after selection a job from the drop down menu the section populate from the api
              jobSelect: jtJobsSelect,
              jobCompany: data.company_name,
              jobTitle: data.position,
              jobDescription: parsedDescription,
              jobLocation: `${data?.city}, ${data.state}`,
              jobLink: data.apply_url,
            });
          } else {
            resetJobsForm();
          }
        });
      } else {
        resetJobsForm();
      }
      updateForm({ isFetching: false });
    },
    [jtJobsSelect, jtToken, resetJobsForm, updateForm],
  );

  const emailTemplateHandler = (id: string) => {
    if (id) {
      const template = emailTemplates.find(({ template_id }) => template_id == id);

      updateForm({
        templateMessages: id,
        templateMessage: template?.body.toString(),
        templateName: template?.template_name.toString(),
      });
    } else {
      updateForm({
        templateMessages: '',
        templateMessage: '',
        templateName: '',
      });
    }
  };

  useEffect(() => {
    if (jobDetailType == 'use-jobs' && jtList.length == 0) {
      fetchJobs();
    } else if (jobDetailType == 'use-opportunities' && otherList.length == 0) {
      fetchOtherJobs();
    }
    if (emailList.length == 0) {
      fetchEmails();
    }
  }, [fetchEmails, jobDetailType]);

  useEffect(() => {
    // this populates the job fields after you select from jobs dropdown options
    if (jtJobs) {
      fetchJob(jtJobsSelect);
    }
  }, [fetchJob, jtJobs, jtJobsSelect]);

  useEffect(() => {
    // this populates other opportunity fields after you select from other opportunity dropdown options
    if (otherJobsSelect != '' && otherJobs.length > 0) {
      const job = otherJobs.find(({ s_jobs_id }) => s_jobs_id == otherJobsSelect);
      // update opportunity form fields
      updateForm({
        opportunitySelect: otherJobsSelect,
        opportunityCompany: job?.job_company,
        opportunityTitle: job?.job_title,
        opportunityDescription: job?.job_description,
        opportunityLocation: job?.job_location,
      });
    }
  }, [otherJobs, otherJobsSelect, updateForm]);

  return (
    <>
      <PillButtonToggle
        activeIndex={activeButton}
        onChange={currButton => {
          setActiveButton(currButton);
          updateForm({ hasSubmitted: false });
          formState.outreachOption = currButton;
        }}
      />
      <ul className="pt-4 list-unstyled">
        <li className="border-bottom">
          <CollapseItem index={0} isOpen={true} title="Include Job Details">
            <div className="pb-4">
              <RadioGroupField
                handleChange={({ target }) => {
                  setJobDetailType(target.value);
                  updateForm({ hasSubmitted: false, jobDetailType: target.value });
                }}
                id="detail-type"
                name="detailType"
                options={[
                  {
                    checked: true,
                    label: 'Use Jobs from JobTarget',
                    id: 'use-jobs',
                    name: 'detail-type',
                    value: 'use-jobs',
                  },
                  {
                    label: 'Use Other Opportunity',
                    id: 'use-opportunities',
                    name: 'detail-type',
                    value: 'use-opportunities',
                  },
                ]}
              />
            </div>
            {jobDetailType === 'use-jobs' && (
              <>
                <SelectField
                  defaultValue={formState.jobSelect}
                  error={{ hasError: Boolean(formState.hasSubmitted && formState.jobSelect === 'Select job from JobTarget'), message: 'This field is required' }}
                  handleChange={str => setJtJobsSelect(str)}
                  id="job-select"
                  name="jobSelect"
                  options={[{ text: 'Select job from JobTarget', value: 'Select job from JobTarget' }, ...jtList]}
                  required
                />
                <div>
                  {formState.isFetching && <Spinner variant="large" />}
                  {jtJobsSelect && jtJobsSelect !== 'Select job from JobTarget' && !formState.isFetching && (
                    <>
                      <div className="mt-3 mb-3">
                        <InputField disabled id="job-title" label="Job Title" name="jobTitle" value={formState.jobTitle} />
                      </div>
                      <div className="mb-3">
                        <InputField disabled id="job-company" label="Company" name="jobCompany" value={formState.jobCompany} />
                      </div>
                      <div className="mb-3">
                        <InputField disabled id="job-location" label="Location" name="jobLocation" value={formState.jobLocation} />
                      </div>
                      <div className="mb-3">
                        <TextareaField disabled id="job-description" label="Job Description" name="jobDescription" value={formState.jobDescription} />
                      </div>
                      <InputField hidden id="job-link" name="jobLink" value={formState.jobLink} />
                    </>
                  )}
                </div>
              </>
            )}
            {jobDetailType === 'use-opportunities' && (
              <div>
                {otherList.length > 0 && (
                  <div className="mb-3">
                    <SelectField
                      defaultValue={formState.opportunitySelect}
                      handleChange={str => setOtherJobsSelect(str)}
                      id="opportunity-select"
                      name="opportunitySelect"
                      options={[{ text: 'Select job from saved Opportunities', value: 'Select job from saved Opportunities' }, ...otherList]}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <InputField
                    error={{ hasError: Boolean(formState.hasSubmitted && !formState.opportunityTitle), message: 'This field is required' }}
                    id="opportunity-title"
                    label="Job Title"
                    name="opportunityTitle"
                    onChange={({ target }) => updateForm({ opportunityTitle: target.value })}
                    onPasteChange={val => updateForm({ opportunityTitle: val })}
                    placeholder="Enter Job Titles"
                    required
                    sanitize
                    value={formState.opportunityTitle}
                  />
                </div>
                <div className="mb-3">
                  <InputField
                    error={{ hasError: Boolean(formState.hasSubmitted && !formState.opportunityCompany), message: 'This field is required' }}
                    id="opportunity-company"
                    label="Company"
                    name="opportunityCompany"
                    onChange={({ target }) => updateForm({ opportunityCompany: target.value })}
                    onPasteChange={val => updateForm({ opportunityCompany: val })}
                    placeholder="Enter Company Name"
                    required
                    sanitize
                    value={formState.opportunityCompany}
                  />
                </div>
                <div className="mb-3">
                  <InputField
                    error={{ hasError: Boolean(formState.hasSubmitted && !formState.opportunityLocation), message: 'This field is required' }}
                    id="opportunity-location"
                    label="Location"
                    name="opportunityLocation"
                    onChange={({ target }) => updateForm({ opportunityLocation: target.value })}
                    onPasteChange={val => updateForm({ opportunityLocation: val })}
                    placeholder="Enter Location"
                    required
                    sanitize
                    value={formState.opportunityLocation}
                  />
                </div>
                <div className="mb-3">
                  <TextareaField
                    error={{ hasError: Boolean(formState.hasSubmitted && !formState.opportunityDescription), message: 'This field is required' }}
                    id="opportunity-description"
                    label="Job Description"
                    name="opportunityDescription"
                    onChange={({ target }) => updateForm({ opportunityDescription: target.value })}
                    onPasteChange={val => updateForm({ opportunityDescription: val })}
                    placeholder="Enter Job Description"
                    required
                    sanitize
                    value={formState.opportunityDescription}
                  />
                </div>
                <Checkbox
                  handleChange={obj => updateForm(obj)}
                  id="check-save-opportunity"
                  label="Save Opportunity"
                  name="checkSaveOpportunity"
                  value={formState.checkSaveOpportunity?.toString() || ''}
                />
                {formState.checkSaveOpportunity && (
                  <div className="my-3">
                    <InputField
                      error={{ hasError: Boolean(formState.hasSubmitted && !formState.opportunityName), message: 'This field is required' }}
                      id="opportunity-name"
                      label="Opportunity Name"
                      name="opportunityName"
                      onChange={({ target }) => updateForm({ opportunityName: target.value })}
                      onPasteChange={val => updateForm({ opportunityName: val })}
                      placeholder="Enter Opportunity Name"
                      required
                      sanitize
                      value={formState.opportunityName}
                    />
                  </div>
                )}
              </div>
            )}
          </CollapseItem>
        </li>
        <li aria-hidden={activeButton !== 0} className={`${styles.base} ${activeButton === 0 ? styles.show : ''} border-bottom`}>
          <CollapseItem index={1} isOpen={true} title="Include Message to Candidate">
            {formState.isFetching && emailList.length == 0 ? (
              <Spinner variant="large" />
            ) : (
              <>
                <SelectField
                  defaultValue={formState.templateMessages}
                  handleChange={str => emailTemplateHandler(str)}
                  id="template-select"
                  label="Template Messages"
                  name="templateMessages"
                  options={[{ text: 'Select template message', value: '' }, ...emailList]}
                />
                <div className="my-3">
                  <TextareaField
                    error={{ hasError: Boolean(formState.hasSubmitted && !formState.templateMessage), message: 'This field is required' }}
                    id="template-message"
                    label="Message"
                    name="templateMessage"
                    onChange={({ target }) => updateForm({ templateMessage: target.value })}
                    onPasteChange={val => updateForm({ templateMessage: val })}
                    placeholder="Enter message"
                    sanitize
                    value={formState.templateMessage}
                    required
                  />
                </div>
                <Checkbox
                  handleChange={obj => updateForm(obj)}
                  id="check-save-template"
                  label="Save as Message Template"
                  name="saveAsMessageTemplate"
                  value={formState.saveAsMessageTemplate?.toString() || ''}
                />
                {formState.saveAsMessageTemplate && (
                  <div className="mt-4">
                    <InputField
                      error={{ hasError: Boolean(formState.hasSubmitted && !formState.templateName), message: 'This field is required' }}
                      id="template-name"
                      name="templateName"
                      label="Template Name"
                      onChange={({ target }) => updateForm({ templateName: target.value })}
                      onPasteChange={val => updateForm({ templateName: val })}
                      placeholder="Enter template name"
                      sanitize
                      value={formState.templateName}
                      required
                    />
                  </div>
                )}
              </>
            )}
          </CollapseItem>
        </li>
      </ul>
    </>
  );
};

export { InviteToConnectApplyForm };
