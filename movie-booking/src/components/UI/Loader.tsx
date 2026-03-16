import { Spinner } from "@salt-ds/core";

const Loader = () => {
	return (
		<div role="status" aria-live="polite" aria-busy="true">
		  <Spinner/>
		</div>
	  );
};

export default Loader;
