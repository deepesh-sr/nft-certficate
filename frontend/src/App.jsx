import { useState } from 'react'
import './App.css'
import CertificateForm from './components/CertificateForm'
import ResultDisplay from './components/ResultDisplay'
import { createNFTCertificate } from './services/api'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleCreateNFT = async (formData, imageFile) => {
    setIsLoading(true)
    
    try {
      // Use the real API to create NFT certificate with optional image
      const response = await createNFTCertificate(formData, imageFile)
      
      setResult({
        success: true,
        message: response.message,
        transactionUrl: response.transactionUrl,
        nftUrl: response.nftUrl
      })
    } catch (error) {
      setResult({
        success: false,
        message: error.message || 'Failed to create NFT certificate'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NFT Certificate Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create blockchain-verified certificates as NFTs on Solana
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {!result ? (
            <CertificateForm onSubmit={handleCreateNFT} isLoading={isLoading} />
          ) : (
            <ResultDisplay result={result} onReset={resetForm} />
          )}
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">How it works</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">1</div>
              <p>Upload a custom certificate image or use the default template provided by the system.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">2</div>
              <p>Fill in the certificate details including student name, university, course, and other relevant information.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">3</div>
              <p>The system generates metadata and uploads both the certificate image and data to IPFS via Irys.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">4</div>
              <p>An NFT is minted on the Solana blockchain with the certificate data as immutable metadata.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">5</div>
              <p>The certificate is now permanently verified on the blockchain and can be viewed on Solana Explorer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
