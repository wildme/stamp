import { Fragment } from 'react';

export const InputField = ({attrs, setter, value}) => {
    const handleInputChange = (e) => {
        setter(e.target.value);
    };
    return (
        <Fragment>
        <label for={attrs.for}><b>{attrs.text}</b></label>
        <input
            type={attrs.type}
            name={attrs.name}
            value={value}
            onChange={(e) => handleInputChange(e)}
        />
        </Fragment>
    );
}
