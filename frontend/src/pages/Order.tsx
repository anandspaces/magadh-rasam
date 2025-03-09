import { useState } from "react";
import CreateOrder from "../components/CreateOrder";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
        {/* Progress Steps */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-center justify-center">
            {['Create', 'Confirm', 'Summary'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${stage === ['create', 'confirm', 'summary'][index] 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200'}`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-12 h-1 mx-2 ${index < ['create', 'confirm'].indexOf(stage) 
                    ? 'bg-yellow-500' 
                    : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
          {stage === "create" && <CreateOrder onSubmit={handleNextStage} />}
          {stage === "confirm" && (
            <OrderConfirmation
              onConfirm={handleNextStage}
              onBack={handleBack}
              order={currentOrder}
            />
          )}
          {stage === "summary" && <OrderSummary order={currentOrder} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;