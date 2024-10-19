import { csrfToken } from "@/constant";
import Swal from "sweetalert2";

export function handleOtherVerificationSubmit(post, closingModal, data, put, form){
  const handleOtherVerification = (e) => {
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
        post(route('otherVerificationProcessor.store'), {
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
  const handleUpdateOtherVerification = (e) => {
    const status = data.status;
    e.preventDefault();
    Swal.fire({
      title: status === "Revision" ? "Are you sure you want to return to owner??" : "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "Revision" ? "#ffaf54d6" : "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === "Revision" ? "Return to Owner" : "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        put(route('otherVerificationProcessor.update', form.verification.at(-1).id), {
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
              title:"Success!",
              timer: 5000,
              text: status === "Revision" ? "Successfully return to owner!" : "Successfully Approved Forms!",
            });
          }
        });
      }
    });
  };
  return { handleOtherVerification, handleUpdateOtherVerification };
}