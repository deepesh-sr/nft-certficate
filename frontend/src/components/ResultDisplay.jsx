const ResultDisplay = ({ result, onReset }) => {
  return (
    <div className="text-center">
      {result.success ? (
        <div className="space-y-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Success!</h3>
          <p className="text-gray-600">{result.message}</p>
          
          {result.transactionUrl && result.nftUrl && (
            <div className="space-y-3">
              <a
                href={result.transactionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Transaction on Solana Explorer
              </a>
              <a
                href={result.nftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                View NFT on Explorer
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Error</h3>
          <p className="text-gray-600">{result.message}</p>
        </div>
      )}
      
      <button
        onClick={onReset}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Create Another Certificate
      </button>
    </div>
  )
}

export default ResultDisplay
