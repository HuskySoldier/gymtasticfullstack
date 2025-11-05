import { useState } from 'react';

/**
 * Un hook personalizado para manejar el estado de un Modal.
 * Simplifica la lógica de 'show' y las funciones 'onHide' / 'onShow'.
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  // Función para abrir el modal
  const openModal = () => setIsOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsOpen(false);

  // Devolvemos el estado y las funciones para controlarlo
  return {
    isOpen,
    openModal,
    closeModal,
  };
};