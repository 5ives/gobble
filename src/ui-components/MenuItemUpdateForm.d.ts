/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MenuItemUpdateFormInputValues = {
    name?: string;
    price?: number;
    restaurantId?: string;
};
export declare type MenuItemUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    restaurantId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenuItemUpdateFormOverridesProps = {
    MenuItemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MenuItemUpdateFormProps = React.PropsWithChildren<{
    overrides?: MenuItemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    menuItem?: any;
    onSubmit?: (fields: MenuItemUpdateFormInputValues) => MenuItemUpdateFormInputValues;
    onSuccess?: (fields: MenuItemUpdateFormInputValues) => void;
    onError?: (fields: MenuItemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenuItemUpdateFormInputValues) => MenuItemUpdateFormInputValues;
    onValidate?: MenuItemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MenuItemUpdateForm(props: MenuItemUpdateFormProps): React.ReactElement;
