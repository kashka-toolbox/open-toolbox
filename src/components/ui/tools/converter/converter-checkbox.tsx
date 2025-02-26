import { Checkbox } from "../../checkbox"

export interface ConverterCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * 
 * @param className label contents here 
 * @returns 
 */
export const ConverterCheckbox: React.FC<ConverterCheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  children,
  className,
  ...props
}) => {
  return (<div className="flex items-center space-x-2">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={(value) => onCheckedChange(value === true)} />
    <label
      htmlFor={id}
      className="peer-disabled:cursor-not-allowed hover:cursor-pointer"
    >
      {children}
    </label>
  </div>)
}