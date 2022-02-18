import { useState } from "react";

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const handleChangeValues = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    const handleResetValues = () => {
        setValues(initialState);
    };

    return [values, handleChangeValues, handleResetValues];

}