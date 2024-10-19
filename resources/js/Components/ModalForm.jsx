export default function ModalForm({handleSubmit, children, className=""}){
  return(
    <form onSubmit={handleSubmit} className={`flex flex-col h-[calc(89vh-6rem)] ` + className}>
      {children}
    </form>
  );
}