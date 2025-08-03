import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductSpecificationAccordion = ({ specifications }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border rounded-md p-4 w-full max-w-4xl mx-auto bg-white shadow mb-10">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-lg">Product Specification</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Animated content */}
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-4">
          {specifications.map((item, index) => (
            <div key={index}>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-sm text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificationAccordion;
