import { csrfToken } from "@/constant";
import Swal from "sweetalert2";

export function handleRFAVerificationSubmit(post, closingModal, put, form){
  const handleNewRFAVerification = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('RFAVerificationProcessor.store'), {
          _token: csrfToken,
          onError: (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Please Try Again!",
              timer: 5000,
              text: "Some Input Fields are empty!",
            });
          },
          onSuccess: () => {
            closingModal();
            Swal.fire({
              icon: "success",
              title: "Success!",
              timer: 5000,
              text: "Successfully Create New Verification!",
            });
          }
        });
      }
    });
  };
  const handleRFAVerification = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        put(route('RFAVerificationProcessor.update', form.verification.at(-1).id), {
          _token: csrfToken,
          onError: (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Please Try Again!",
              timer: 5000,
              text: "Some Input Fields are empty!",
            });
          },
          onSuccess: () => {
            closingModal();
            Swal.fire({
              icon: "success",
              title: "Success!",
              timer: 5000,
              text: "Successfully Create New Verification!",
            });
          }
        });
      }
    });
  };
  
  return { handleNewRFAVerification, handleRFAVerification, };
}