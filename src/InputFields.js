import { Fragment } from 'react';

export const InputField = ({attrs, onChange}) => {
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <Fragment>
        <label for={attrs.for}><b>{attrs.text}</b></label>
        <input
            type={attrs.type}
            name={attrs.name}
            value={attrs.value}
            onChange={(e) => handleInputChange(e)}
        />
        </Fragment>
    );
}
