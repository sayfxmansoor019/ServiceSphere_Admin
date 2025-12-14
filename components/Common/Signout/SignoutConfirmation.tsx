import { Modal, ModalBody } from "reactstrap";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../../context/AuthContext";

type TSignoutConfirmationProps = {
    visible: boolean;
    onClose: () => void;
}

const SignoutConfirmation = ({visible, onClose} : TSignoutConfirmationProps) => {

  const { signout } = useAuth();

  const handleSignOut = async () => {
    await signout();
    onClose();
  };

  return (
    <Modal isOpen={visible} size="md" toggle={onClose} backdrop="static">
      <ModalBody>
        <div className="confirmatiom-modal modal-box">
          <div className="close pointer h5 text-slate-400 d-flex justify-content-end" onClick={onClose}>
            <XMarkIcon className="icon text-slate-700" />
          </div>
          <div className="content p-4">
            <h6 className="text-center">Are you sure you want to signout ?</h6>
            <div className="d-flex mt-5 justify-content-center">
                <div className="btn btn-primary btn-lg me-3" onClick={handleSignOut}>
                Yes
                </div>
                <div className="btn btn-outline-slate btn-lg" onClick={onClose}>
                No
                </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SignoutConfirmation;
