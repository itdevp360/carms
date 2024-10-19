export default function PageLayout({children}){
  return (
    <div className="py-4">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="text-gray-800">
              {children}
            </div>
          </div>
        </div>
      </div>
  )
}