import React from "react"
import { Modal, Form, Button } from "antd"

interface IProps {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalComponent: React.FC<IProps> = (props: IProps) => {
    let {isModalOpen, setIsModalOpen} = props

    // const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}

export default ModalComponent



