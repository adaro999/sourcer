import { SvgLoader } from '../../atoms/SvgLoader';

const ProfileUnlocked = () => (
  <div className="d-flex align-items-center justify-content-between bg-blue-20 text-body px-3 py-4 rounded mb-3" style={{ flex: 1 }}>
    <SvgLoader className="" name="ProfileUnlock" style={{ flex: 1 }} />
    <div style={{ flex: 4 }}>
      <h5>Complete Candidate Profile Unlocked</h5>
      <span>Any available contact and job history for this candidate is also accessible in My Candidates --&gt; Unlocked Candidates.</span>
    </div>
  </div>
);

export { ProfileUnlocked };
