const SubmitButton = (props) => {
  const name = props.name;
  const className = props.className;
  const disabled = props.disabled;
  const setter = props.setter;

  return (
    <button
      className={className}
      type="submit"
      disabled={disabled}
      onClick={() => setter()}>
      {name}
    </button>
  );
};

export default SubmitButton;
