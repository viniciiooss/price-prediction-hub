
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterControlsProps {
  products: Array<{ value: string; label: string }>;
  states: Array<{ value: string; label: string }>;
  selectedProduct: string;
  selectedState: string;
  onProductChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  products,
  states,
  selectedProduct,
  selectedState,
  onProductChange,
  onStateChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={selectedProduct} onValueChange={onProductChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar produto" />
        </SelectTrigger>
        <SelectContent>
          {products.map(product => (
            <SelectItem key={product.value} value={product.value}>
              {product.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar estado" />
        </SelectTrigger>
        <SelectContent>
          {states.map(state => (
            <SelectItem key={state.value} value={state.value}>
              {state.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterControls;
