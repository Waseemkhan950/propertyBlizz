# Property Blizz

Property Blizz is a modern real estate web application built with Next.js and Tailwind CSS. It allows users to browse, search, and manage properties, as well as interact with other users through messaging and bookmarking features.

## Features

- **Property Listings**: Browse featured properties and search for properties based on various criteria.
- **User Authentication**: Secure login and registration using NextAuth.js.
- **Add/Edit Properties**: Users can add new properties or edit their existing ones.
- **Saved Properties**: Bookmark properties for quick access later.
- **Messaging**: Send and receive messages with other users.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Interactive Maps**: View property locations on an interactive map.

## Folder Structure

```
app/
  - Main application pages and layouts.
  - Includes subdirectories for specific features like messages, profile, and properties.

components/
  - Reusable React components such as Navbar, Footer, PropertyCard, etc.

config/
  - Configuration files for external services like Cloudinary.

context/
  - Global context for managing application state.

models/
  - Mongoose models for MongoDB collections (Message, Property, User).

public/
  - Static assets like images.

utils/
  - Utility functions for authentication and session management.
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/property-blizz.git
   ```

2. Navigate to the project directory:

   ```bash
   cd property-blizz
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality issues.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **MongoDB**: NoSQL database for storing application data.
- **NextAuth.js**: Authentication library for Next.js.
- **Cloudinary**: Image and video management service.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or feedback, please contact [theasyncvibe@gmail.com](mailto:theasyncvibe@gmail.com).
