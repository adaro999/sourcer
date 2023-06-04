import { SvgLoader } from '../../atoms/SvgLoader';

const InitialState = () => (
  <div className="py-5 text-center">
    <SvgLoader name="NoResults" />
    <div className="pt-5">
      <h3 className="text-gray-800">Find Candidates!</h3>
      <p className="h5 text-gray-800 font-weight-normal pt-3 px-sm-2 px-md-5 w-50 mx-auto">
        Start finding candidates by using the search fields or use our New Smart Search Feature!
      </p>
    </div>
  </div>
);

export { InitialState };
