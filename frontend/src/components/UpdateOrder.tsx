import { useFetcher } from "react-router-dom";
import { updateOrder } from "../services/apiOrder";

interface ActionParams {
  request: Request;
  params: {
    orderId: string;
  };
}

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

export async function action({ params }:ActionParams) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
