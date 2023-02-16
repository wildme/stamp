const InfoBanner = (props) => {
  const value = props.value;
  const title = props.title;
  const className = props.className;
  const titleClassName = props.titleClassName;
  const valueClassName = props.valueClassName;

  return (
    <div className={className}> 
      <span className={titleClassName}>{title}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};

export default InfoBanner;
