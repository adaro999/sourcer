/* eslint @typescript-eslint/no-explicit-any: 0 */
// TODO: fix this
import { IName } from '../IName';
import { ILabels } from '../ILabels';
import { IEducation } from '../IEducation';
import { IRLISource } from '../sources/IRliSource';
import { IPDLSource } from '../sources/IPdlSource';
import { IJbtSource } from '../sources/IJbtSource';

export type IProfileTypes = 'all' | 'saved' | 'unlocked';

interface IProfileConnection {
  profile_id: string;
}

export interface _IProfileBaseOld {
  name: IName;
  location: string;
  current_job_title: string;
  job: any[];
  skills: string[];
  id: string;
  education: IEducation[] | [];
  labels: ILabels;
  gender: string;
  type: string;
  source: IRLISource | IPDLSource | IJbtSource;
}

export interface IProfileBase {
  id: string;
  job: any[];
  location: string;
  name: IName;
  skills: any[];
  connection?: IProfileConnection;
}

export type IDiceProfile = IProfileBase;

export interface IIndeedProfile extends IProfileBase {
  education: IEducation[] | [];
  labels: any[];
}

export interface ICareerBuilderProfile extends IIndeedProfile {
  profiles: any;
}

export interface IJobTargetProfile extends IIndeedProfile {
  connection: any;
  current_job_title: string;
  gender: null | string;
  score: any;
  source: IRLISource | IPDLSource | IJbtSource;
  type: string;
}

export type IPDLProfile = IJobTargetProfile;

export type IRLIProfile = Omit<IJobTargetProfile, 'connection' | 'type'>;
