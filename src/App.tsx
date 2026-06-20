import BundleBuilder from "./components/builder/BundleBuilder";
import ReviewPanel from "./review/ReviewPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Let's get started!
        </h1>

        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-6 items-start">
          <BundleBuilder />
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}
