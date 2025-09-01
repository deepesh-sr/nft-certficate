import { useState } from 'react'

const CertificateForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    course: '',
    year: '',
    certificateId: '',
    cgpa: '',
    description: ''
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData, selectedImage)
  }

  const resetForm = () => {
    setFormData({
      studentName: '',
      university: '',
      course: '',
      year: '',
      certificateId: '',
      cgpa: '',
      description: ''
    })
    setSelectedImage(null)
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById('certificateImage')
    if (fileInput) fileInput.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-4">
            <label htmlFor="certificateImage" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Certificate Image (Optional)
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                Upload a custom certificate image (PNG, JPG, GIF, WebP - Max 10MB) or use the default template
              </span>
              <input
                id="certificateImage"
                name="certificateImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <span className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {selectedImage ? 'Change Image' : 'Select Image'}
              </span>
            </label>
          </div>
          
          {imagePreview && (
            <div className="mt-4">
              <img 
                src={imagePreview} 
                alt="Certificate preview" 
                className="mx-auto max-h-48 rounded-lg shadow-md"
              />
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedImage.name}
              </p>
            </div>
          )}
          
          {!selectedImage && (
            <p className="mt-2 text-sm text-gray-500">
              No image selected - will use default certificate template
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University *
          </label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter university name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course *
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            min="2000"
            max="2030"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certificate ID *
          </label>
          <input
            type="text"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter certificate ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CGPA
          </label>
          <input
            type="number"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="9.1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter certificate description..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating NFT...
            </div>
          ) : (
            'Create NFT Certificate'
          )}
        </button>
      </div>
    </form>
  )
}

export default CertificateForm
