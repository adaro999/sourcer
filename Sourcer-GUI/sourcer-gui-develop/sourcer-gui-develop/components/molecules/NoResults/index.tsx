import { SvgLoader } from '../../atoms/SvgLoader';

const NoResults = () => (
  <div className="py-5 text-center">
    <div className="pb-5">
      <p className="h5 text-gray-800 font-weight-normal px-sm-2 px-md-5 w-75 mx-auto">No candidates match your criteria. Please enter a new search criteria</p>
    </div>
    <SvgLoader name="Glass" />
  </div>
);

export { NoResults };
