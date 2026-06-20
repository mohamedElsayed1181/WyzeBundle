import { Camera, ShieldCheck, Radar, Building2 } from "lucide-react";
import StepAccordion from "./StepAccordion";
import ProductCard from "./ProductCard";
import SimpleProductRow from "./SimpleProductRow";
import { useBundleStore } from "../../store/bundleStore";

const TOTAL_STEPS = 4;

export default function BundleBuilder() {
  const products = useBundleStore((s) => s.products);
  const step = useBundleStore((s) => s.activeStep);
  const setStep = useBundleStore((s) => s.setStep);

  const cameras = products.filter((p) => p.category === "cameras");
  const plans = products.filter((p) => p.category === "plan");
  const sensors = products.filter((p) => p.category === "sensors");
  const accessories = products.filter((p) => p.category === "accessories");

  const countSelected = (items: typeof products) =>
    items.reduce((sum, p) => {
      if (p.variants) {
        return sum + p.variants.filter((v) => v.quantity > 0).length;
      }
      return sum + (p.quantity > 0 ? 1 : 0);
    }, 0);

  return (
    <div className="space-y-4">
      <StepAccordion
        step={1}
        totalSteps={TOTAL_STEPS}
        title="Choose your cameras"
        icon={<Camera size={18} />}
        open={step === 1}
        count={countSelected(cameras)}
        nextLabel="Next: Choose your plan"
        onToggle={() => setStep(step === 1 ? 0 : 1)}
        onNext={() => setStep(2)}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {cameras.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </StepAccordion>

      <StepAccordion
        step={2}
        totalSteps={TOTAL_STEPS}
        title="Choose your plan"
        icon={<ShieldCheck size={18} />}
        open={step === 2}
        count={countSelected(plans)}
        nextLabel="Next: Choose your sensors"
        onToggle={() => setStep(step === 2 ? 0 : 2)}
        onNext={() => setStep(3)}
      >
        <div className="space-y-2">
          {plans.map((product) => (
            <SimpleProductRow key={product.id} product={product} />
          ))}
        </div>
      </StepAccordion>

      <StepAccordion
        step={3}
        totalSteps={TOTAL_STEPS}
        title="Choose your sensors"
        icon={<Radar size={18} />}
        open={step === 3}
        count={countSelected(sensors)}
        nextLabel="Next: Add extra protection"
        onToggle={() => setStep(step === 3 ? 0 : 3)}
        onNext={() => setStep(4)}
      >
        <div className="space-y-2">
          {sensors.map((product) => (
            <SimpleProductRow key={product.id} product={product} />
          ))}
        </div>
      </StepAccordion>

      <StepAccordion
        step={4}
        totalSteps={TOTAL_STEPS}
        title="Add extra protection"
        icon={<Building2 size={18} />}
        open={step === 4}
        count={countSelected(accessories)}
        nextLabel="Done"
        onToggle={() => setStep(step === 4 ? 0 : 4)}
        onNext={() => setStep(0)}
      >
        <div className="space-y-2">
          {accessories.map((product) => (
            <SimpleProductRow key={product.id} product={product} />
          ))}
        </div>
      </StepAccordion>
    </div>
  );
}
