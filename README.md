# NFT Certificate Generator

A full-stack application for creating blockchain-verified certificates as NFTs on the Solana blockchain.

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Metaplex SDK
- **Blockchain**: Solana (Devnet)
- **Storage**: IPFS via Irys

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Solana keypair (located at `./keypair.json`)
- Certificate image (located at `./assets/certificate.png`)

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend runs on: `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5174`

## 📝 How It Works

1. **Fill Form**: Enter certificate details (student name, university, course, etc.)
2. **Image Upload**: System uses the certificate template from `./assets/certificate.png`
3. **Metadata Creation**: Dynamic metadata is generated with form data
4. **IPFS Upload**: Image and metadata are uploaded to IPFS via Irys
5. **NFT Minting**: NFT is minted on Solana blockchain with immutable certificate data

## 🔧 API Endpoints

- `POST /api/create-nft` - Create a new NFT certificate
- `GET /api/nft-status/:signature` - Check transaction status
- `GET /api/certificates` - List created certificates (placeholder)
- `GET /health` - Health check

## 📁 Project Structure

```
nft_certificate/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── App.jsx          # Main app
├── backend/                 # Express.js backend
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── server.js            # Server entry point
├── assets/                  # Certificate images
├── keypair.json            # Solana wallet keypair
└── umi.js                  # Original NFT creation script
```

## 🎯 Features

### Frontend
- ✅ Responsive form with validation
- ✅ Real-time loading states
- ✅ Success/error handling
- ✅ Direct links to Solana Explorer
- ✅ Mobile-friendly design

### Backend
- ✅ RESTful API
- ✅ Input validation
- ✅ Error handling
- ✅ CORS configuration
- ✅ Environment variables

### Blockchain
- ✅ Solana NFT minting
- ✅ IPFS metadata storage
- ✅ Immutable certificate data
- ✅ Explorer integration

## 🔐 Security

- Environment variables for sensitive data
- Input validation and sanitization
- CORS protection
- Helmet security headers

## 🧪 Testing

Fill out the form at `http://localhost:5174` with sample data:
- Student Name: "John Doe"
- University: "Test University"
- Course: "Blockchain Development"
- Year: 2025
- Certificate ID: "CERT-001"
- CGPA: 9.5

## 🛠️ Customization

1. **Certificate Image**: Replace `./assets/certificate.png` with your template
2. **Metadata**: Modify `createMetadata()` in `./backend/services/nftService.js`
3. **Styling**: Update Tailwind classes in React components
4. **Network**: Change from devnet to mainnet in environment variables

## 🔗 Resources

- [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Irys Documentation](https://docs.irys.xyz/)

## 📊 Status

✅ **Backend**: Running on http://localhost:3001  
✅ **Frontend**: Running on http://localhost:5174  
✅ **Blockchain**: Connected to Solana Devnet  
✅ **Storage**: IPFS via Irys Devnet
