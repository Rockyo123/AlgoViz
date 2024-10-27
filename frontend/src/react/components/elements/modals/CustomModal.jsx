import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalBackdrop from './modalBackdrop';

const CustomModal = (props) => {
  const handleClose = () => {
    props.setIsopen(false)
  }
   
  const dropIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {props.isOpen && <ModalBackdrop onClick={() => handleClose()}>
        <motion.div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
          variants={dropIn}
          inital="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <Modal.Dialog>
            {props.title && 
            <Modal.Header>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>}

            <Modal.Body>
              {props.body}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => props.confirmFunction()}>Save</Button>
              <Button variant="secondary" onClick={() => props.setIsOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </motion.div>
        </ModalBackdrop>}
      </AnimatePresence>
  );
}
  
export default CustomModal;