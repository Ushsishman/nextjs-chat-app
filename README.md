# Next.js Real-Time Chat Application

A modern, real-time chat application built with Next.js, Firebase, and TypeScript. Experience seamless communication with both private messaging and group chat capabilities.

🔗 [Live Demo](https://nextjs-chat-app-hmyoe.vercel.app/)

## Features

- **Real-time Messaging**: Instant message delivery and updates
- **User Authentication**: Secure login and user management
- **Private Chats**: One-on-one messaging between users
- **Group Chats**: Create and manage group conversations
- **Media Sharing**: Support for images (PNG, JPG) and videos (MP4)
- **Read Receipts**: Track message status with single/double check marks
- **Responsive Design**: Seamless experience across all devices
- **Modern UI**: Clean and intuitive interface

## Tech Stack

- **Frontend**: Next.js 15.0.3, React 19
- **Styling**: Tailwind CSS, clsx for conditional styling
- **Backend/Database**: Firebase (Firestore)
- **File Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Type Safety**: TypeScript
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Media Playback**: React Player

## Key Features

### Messaging
- Real-time message synchronization
- Message status indicators (sent/read)
- Media file sharing (images and videos)
- Message timestamps

### Groups
- Create and join group chats
- Shared media in groups

### User Experience
- Responsive sidebar navigation
- Real-time read receipts
- Intuitive media sharing interface
- Mobile-friendly design

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
- Create a Firebase project
- Enable Authentication, Firestore, and Storage
- Add your Firebase configuration to `firebaseConfig.js`

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
