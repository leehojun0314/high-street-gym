import { TInputProps } from '@/types/props/inputProps';
import Input from '../atoms/Input';
import RegisterLabel from '../atoms/RegisterLabel';
import IconContainer from './IconContainer';
import ErrorMsg from '../atoms/ErrorMsg';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export default function FormField({
	label,
	icon: Icon,
	inputProps,
	error,
	required = true,
	register,
}: {
	label: string;
	icon?: React.ElementType;
	inputProps: TInputProps;
	error?: FieldError;
	required?: boolean;
	register: UseFormRegisterReturn;
}) {
	return (
		<>
			<RegisterLabel
				htmlFor={inputProps.name}
				className={`${required && 'required'}`}
			>
				{label}
			</RegisterLabel>
			<IconContainer className={`${required && 'required'}`}>
				{Icon && <Icon className='w-6 h-6' />}
			</IconContainer>
			<Input {...inputProps} register={register} />
			{error && <ErrorMsg>{error.message}</ErrorMsg>}
		</>
	);
}
