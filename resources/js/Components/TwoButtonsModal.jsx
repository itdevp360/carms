function ButtongPlacing({selectedTabIndex, form, processing, firstButton, firstButtonClassName, secondButton, secondButtonClassName, firstButtonClick, secondButtonClick,}){
  return(
    <>  
      {form.status !== "Manager's Review" && form.status !== "Manager's Revised" && form.status !== "Approver's Review" && form.status !== "Approver's Revised" ? (
        <div className="flex justify-between py-4 px-8">
          {(form.source !== "Request For Action" ? selectedTabIndex === 3 : selectedTabIndex === 0) && (
            <button 
              disabled={processing}
              onClick={firstButtonClick}
              className={"bg-[#ffaf54d6] hover:bg-[#f99d35d6] px-4 py-2 rounded " + firstButtonClassName}>
                {firstButton}
            </button>
          )}
          <span></span>
          <button 
            disabled={processing}
            onClick={secondButtonClick}
            className={"bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 " + secondButtonClassName}>
              {secondButton}
          </button>
        </div>
      ) : 
        <div className="flex justify-between py-4 px-8">
          {(form.source !== "Request For Action" ? selectedTabIndex === 3 : selectedTabIndex === 0) && (
            <>
              <button 
                disabled={processing}
                onClick={firstButtonClick}
                className={"bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white " + firstButtonClassName}>
                  {firstButton}
              </button>
              <span></span>
              <button 
                disabled={processing}
                onClick={secondButtonClick}
                className={"bg-[#ffaf54d6] px-4 py-2 rounded hover:bg-[#f99d35d6] " + secondButtonClassName}>
                  {secondButton}
              </button>
            </>
          )}
        </div>
      }    
    </>  
  );
}

export default function TwoButtonsModal({selectedTabIndex, form, processing, 
  firstButton, firstButtonClassName = "", secondButton, secondButtonClassName = "", 
  firstButtonClick = () => {}, secondButtonClick = () => {},
  }){
  return(
    <ButtongPlacing 
      selectedTabIndex={selectedTabIndex}
      form={form}
      processing={processing}
      firstButton={firstButton}
      firstButtonClassName={firstButtonClassName}
      secondButton={secondButton}
      secondButtonClassName={secondButtonClassName}
      firstButtonClick={firstButtonClick}
      secondButtonClick={secondButtonClick}
    />
  );
}