type TCustomStatusLabelValues = {
  bgColor: string;
  textColor: string;
  label: string;
};


const CustomStatusLabel = ({
  bgColor,
  textColor,
  label,
}: TCustomStatusLabelValues) => {



  return (
    <div
      className="badge fw-regular text-sm text-lowercase"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {label}
    </div>
  );
};

export default CustomStatusLabel;
