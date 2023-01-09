const SimpleHeading2 = (props) => {
  const containerClassName = props.containerClassName;
  const h2ClassName = props.h2ClassName;
  const text = props.text;
  return (
    <div className={containerClassName}>
      <h2 className={h2ClassName}>{text}</h2>
    </div>
  );
};

export default SimpleHeading2;
