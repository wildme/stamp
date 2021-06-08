import { InputInboxAttrs } from './InputAttrs.js';

const InputField = ({attrs, onChange}) => {
    const handleInputChange = (e) = > {
        onChange(e.target.value);
    };

    return (
        <label for={for}><b>{text}</b><label>
        <input
            type={attrs.type},
            name={attrs.name},
            value={attrs.value},
            onChange={(e) = > handleInputChange(e)}
        />
};
