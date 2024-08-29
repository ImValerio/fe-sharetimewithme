import { useEffect } from "react";

interface ModalProps {
    title?: string
    body: string
    setResModal: Function
}

const Modal: React.FC<ModalProps> = ({ title, body, setResModal }) => {
    useEffect(() => {
        const modalContainer = document.createElement('div');
        modalContainer.className = "modal flex justify-between";

        if (title) {
            const titleDiv = document.createElement('div');
            const titleH3 = document.createElement('h3');
            titleH3.className = "text-2xl";
            titleH3.textContent = title;
            titleDiv.appendChild(titleH3);
            modalContainer.appendChild(titleDiv);
        }

        const bodyDiv = document.createElement('div');
        const bodyP = document.createElement('p');
        bodyP.textContent = body;
        bodyDiv.appendChild(bodyP);

        const buttonsDiv = document.createElement('div');
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'CONFIRM';
        confirmButton.onclick = () => setResModal(true);
        buttonsDiv.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'CANCEL';
        cancelButton.onclick = () => setResModal(false);
        buttonsDiv.appendChild(cancelButton);

        bodyDiv.appendChild(buttonsDiv);
        modalContainer.appendChild(bodyDiv);

        document.body.appendChild(modalContainer);
    }, [title, body, setResModal]);

    return <></>
}


export default Modal