import { csrfToken } from "@/constant";
import Swal from "sweetalert2";

export function handleSubmit(data, post, put, closingModal, selectedForm){
  const handleSubmitPending = (e) => {
    const status = data.status;
    e.preventDefault();
    Swal.fire({
      title: status === "Draft" ? "Save as Draft?" : "Are you sure?",
      text: status === "Draft" ? "You can continue editing later." : "You won't be able to revert this!",
      icon: status === "Draft" ? "info" : "question",
      showCancelButton: true,
      confirmButtonColor: status === "Draft" ? "#3085d6" : "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === "Draft" ? "Save Draft" : "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('car_form_owner.store'), {
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
              title: status === "Draft" ? "Draft Saved!" : "Success!",
              timer: 5000,
              text: status === "Draft" ? "Draft saved successfully." : "Successfully submitted form!",
            });
          }
        });
      }
    });
  };

  const handleUpdateSubmit = (e) => {
    const status = data.status;
    e.preventDefault();
    Swal.fire({
      title: status === "Draft" ? "Save as Draft?" : "Are you sure?",
      text: status === "Draft" ? "You can continue editing later." : "You won't be able to revert this!",
      icon: status === "Draft" ? "info" : "question",
      showCancelButton: true,
      confirmButtonColor: status === "Draft" ? "#3085d6" : "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === "Draft" ? "Save Draft" : "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        put(route('car_form_owner.update', selectedForm.carFormOwner), {
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
              title: status === "Draft" ? "Draft Saved!" : "Success!",
              timer: 5000,
              text: status === "Draft" ? "Draft saved successfully." : "Successfully submitted form!",
            });
          }
        });
      }
    });
  };
  const handleDepartmentHeadSubmit = (e) => {
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
        post(route('car_form_department_head.store'), {
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
              text: status === "Revision" ? "Successfully return to owner!" : "Successfully Approved Forms!",
            });
          }
        });
      }
    });
  }
  const handleApproverSubmit = (e) => {
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
        post(route('car_form_approver.store'), {
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
              text: status === "Revision" ? "Successfully return to owner!" : "Successfully Approved Form!",
            });
          }
        });
      }
    });
  }

  return {
    handleSubmitPending, 
    handleUpdateSubmit, 
    handleDepartmentHeadSubmit, 
    handleApproverSubmit, 
  }
}