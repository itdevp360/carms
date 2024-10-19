import { useState } from "react";

export  function OpenModal({setData}){
  const [openModal, setOpenModal] = useState(false);
  
  const [selectedForm, setSelectedForm] = useState(null);
  
  const openingModal = (form) => {
    setOpenModal(true);
    setSelectedForm(form);
    setData('car_form_id', form.id);
  };

  const closingModal = () => {
    setOpenModal(false)
    setSelectedForm(null);
    setData({});
  };

  return {openModal, selectedForm, openingModal, closingModal};
}