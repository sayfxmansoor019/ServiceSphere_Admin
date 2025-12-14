import { useState } from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

import SignoutConfirmation from "./SignoutConfirmation";

const Signout = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div
        className="dropdown-item d-flex align-items-center pointer"
        onClick={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <div className="icon">
          <ArrowLeftEndOnRectangleIcon />
        </div>
        <div className="text-smr label">Signout</div>
      </div>
      <SignoutConfirmation
        visible={isModalVisible}
        onClose={() => {
          setModalVisible(!isModalVisible);
        }}
      />
    </>
  );
};

export default Signout;
