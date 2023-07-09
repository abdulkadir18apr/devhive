import React, { useState } from 'react';
import Modal from 'react-modal';


import "./css/avatar.css"

export const Avatar = ({ isOpen, onClose,handleAvartarChange }) => {

    const avatar1="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"

    const avatar2="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    
    const avatar3="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"

  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = async() => {
    const res=await fetch(selectedAvatar);
    const blob=await res.blob()
    const file=new File([blob],'avatar.jpg',{type:blob.type});
    handleAvartarChange(file,selectedAvatar);
    setSelectedAvatar('');
    onClose();
  };

  const avatarImages = [
    avatar1,
    avatar2,
    avatar3
    // Add more avatar image URLs as needed
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="avatar-modal"
      overlayClassName="avatar-modal-overlay"
    >
      <h2>Select Avatar</h2>
      <div className="avatar-container">
        {avatarImages.map((avatar, index) => (
          <div
            key={index}
            className={`avatar-image ${selectedAvatar === avatar ? 'selected' : ''}`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img src={avatar} alt={`Avatar ${index + 1}`} />
          </div>
        ))}
      </div>
      <button onClick={handleConfirm} disabled={!selectedAvatar}>
        Confirm
      </button>
    </Modal>
  );
};

