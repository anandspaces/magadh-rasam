// In Order.tsx (Main Coordinator Component)
import { useState } from "react";
import CreateOrder from "../components/CreateOrder";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Order = () => {
  const [stage, setStage] = useState<"create" | "confirm" | "summary">("create");
  const currentOrder = useSelector((state: RootState) => state.order);

  const handleNextStage = () => {
    if (stage === "create") setStage("confirm");
    if (stage === "confirm") setStage("summary");
  };

  const handleBack = () => {
    if (stage === "confirm") setStage("create");
    if (stage === "summary") setStage("confirm");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      {stage === "create" && <CreateOrder onSubmit={handleNextStage} />}
      
      {stage === "confirm" && (
        <OrderConfirmation
          onConfirm={handleNextStage}
          onBack={handleBack}
          order={currentOrder} // Pass Redux order directly
        />
      )}
      
      {stage === "summary" && (
        <OrderSummary
          order={currentOrder} // Pass Redux order directly
        />
      )}
    </div>
  );
};

export default Order;