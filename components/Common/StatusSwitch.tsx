import { useEffect } from "react";
import { GENERAL_STATUS_LABEL } from "../../constants/various";

type TStatusSwitchValues = {
  status: string;
  typeId?: number;
  onStatusChange?: (status: string) => void;
};

const StatusSwitch = ({ status, typeId, onStatusChange }: TStatusSwitchValues) => {
  

  useEffect(() => {
    //console.log(status)
  }, [status])

  return (
    <>
      <label className="form-label">Status</label>
      <div
        className="btn-group btn-group-md"
        role="group"
        aria-label="Account Status Toggle"
      >
        <input
          type="radio"
          className="btn-check"
          name="accountStatus"
          id={GENERAL_STATUS_LABEL.Active}
          value={GENERAL_STATUS_LABEL.Active}
          checked={status === GENERAL_STATUS_LABEL.Active}
          onChange={() => {
            onStatusChange?.(GENERAL_STATUS_LABEL.Active)
          }}
        />
        <label
          className="btn btn-outline-secondary rounded-start-pill"
          htmlFor={GENERAL_STATUS_LABEL.Active}
        >
          {GENERAL_STATUS_LABEL.Active}
        </label>

        <input
          type="radio"
          className="btn-check"
          name="accountStatus"
          id={GENERAL_STATUS_LABEL.Inactive}
          value={GENERAL_STATUS_LABEL.Inactive}
          checked={status === GENERAL_STATUS_LABEL.Inactive}
          onChange={() => {
            onStatusChange?.(GENERAL_STATUS_LABEL.Inactive)
          }}
        />
        <label className="btn btn-outline-warning" htmlFor={GENERAL_STATUS_LABEL.Inactive}>
          {GENERAL_STATUS_LABEL.Inactive}
        </label>

        {typeId != 2 && (
          <>
            <input
              type="radio"
              className="btn-check"
              name="accountStatus"
              id={GENERAL_STATUS_LABEL.Rejected}
              value={GENERAL_STATUS_LABEL.Rejected}
              checked={status === GENERAL_STATUS_LABEL.Rejected}
              onChange={() => {
                onStatusChange?.(GENERAL_STATUS_LABEL.Rejected)
              }}
            />
            <label className="btn btn-outline-danger-600" htmlFor={GENERAL_STATUS_LABEL.Rejected}>
              {GENERAL_STATUS_LABEL.Rejected}
            </label>
          </>
        )}

        <input
          type="radio"
          className="btn-check"
          name="accountStatus"
          id={GENERAL_STATUS_LABEL.Blocked}
          value={GENERAL_STATUS_LABEL.Blocked}
          checked={status === GENERAL_STATUS_LABEL.Blocked}
          onChange={() => {
            onStatusChange?.(GENERAL_STATUS_LABEL.Blocked)
          }}
        />
        <label
          className="btn btn-outline-danger-800 rounded-end-pill"
          htmlFor={GENERAL_STATUS_LABEL.Blocked}
        >
          {GENERAL_STATUS_LABEL.Blocked}
        </label>
      </div>
    </>
  );
};

export default StatusSwitch;
