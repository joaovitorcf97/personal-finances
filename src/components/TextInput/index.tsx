import { ChangeEvent, useId } from 'react';
import { Container, Input, Label } from './styles';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  borderRadius?: 'sm' | 'md';
};
const TextInput = ({
  value,
  onChange,
  label,
  placeholder,
  borderRadius = 'md',
}: Props) => {
  const referenceId = useId();

  return (
    <Container>
      {label && <Label htmlFor={referenceId}>{label}</Label>}
      <Input
        id={referenceId}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $borderRadius={borderRadius}
      />
    </Container>
  );
};

export default TextInput;
