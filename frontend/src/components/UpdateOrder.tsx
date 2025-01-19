import { useFetcher } from "react-router-dom";


function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <button className="rounded bg-orange-600 px-4 py-2 font-medium text-white disabled:opacity-50">
        Make priority
      </button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

