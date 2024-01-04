# Add to Cart with Firebase Integration

A web application using Firebase Realtime Database to implement a shopping cart functionality. Users can add items to the cart, and the items will be displayed with the option to remove them with a delay.

## Prerequisites

- Modern web browser
- Firebase account (for database setup)

## Getting Started

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/dzhu0/add-to-cart.git
    ```

2. Open the `index.html` file in your web browser.

3. Configure Firebase:
    - Create a new Firebase project: [Firebase Console](https://console.firebase.google.com/).
    - Copy your Firebase project's configuration object and replace the `appSettings` object in `index.js` with your configuration.

4. Run the application.

## Usage

- Open the web application in your browser.
- Enter an item in the input field and submit the form to add it to the shopping cart.
- Click on an item in the shopping cart to mark it for removal.
- Items marked for removal will be removed after a 1.5-second delay.
- Click on the item again will stop the item from being removed.

## Structure

- `index.html`: HTML file for the web page.
- `index.css`: CSS file for styling.
- `index.js`: JavaScript file containing the main application logic.

## Dependencies

- Firebase Realtime Database: [Firebase](https://firebase.google.com/)

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Follow the project's coding style and make sure the tests pass.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
