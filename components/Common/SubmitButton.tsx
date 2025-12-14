interface TSubmitButtonValues {
  label: string;
  size?: string;
  width?: string;
  isSubmit: boolean;
  onSubmit: (data: any) => void;
}

const SubmitButton = ({
  label,
  size,
  width,
  isSubmit,
  onSubmit,
}: TSubmitButtonValues) => {
  return (
    <div
      className={`btn btn-primary text-white position-relative ov-h ${
        isSubmit && "no-event progress-disabled"
      } ${size == "lg" && "btn-lg"} ${width == "full" && "w-100"} `}
      onClick={onSubmit}
    >
      <div className="text-white">{label}</div>
      {isSubmit && <div className="progress"></div>}
    </div>
  );
};

export default SubmitButton;
