# Image Text Editor (celebrare)

This project is a web-based image editor that allows users to upload images, add text over them, and manipulate the text's appearance (font, size, style, and color). The text can also be dragged around the image. The image slider functionality allows multiple images to be displayed and navigated using the Swiper.js library.

## Features

- **Image Slider**: Displays a set of images that the user can swipe through.
- **Text Addition**: Add editable text to an image.
- **Text Editing**:
  - Change text content.
  - Adjust text's font, size, weight, and style.
  - Change text color.
- **Text Dragging**: Drag text to any position on the image.
- **Image Upload**: Upload a custom image to be displayed in the slider.
- **User Interface**: Simple and user-friendly UI for text manipulation.

## Swiper.js Library

This project uses **Swiper.js** to enable image slider functionality. Swiper.js is a powerful and flexible mobile-friendly slider library that makes it easy to implement responsive sliders with smooth navigation. It provides features like touch support, pagination, navigation arrows, and more.

- **Swiper Version**: `11.x.x`
- **Official Website**: [https://swiperjs.com/](https://swiperjs.com/)
- **Features Used**:
  - **Navigation**: Users can swipe or click on navigation arrows to move between images.
  - **Pagination**: Displays a pagination control that allows users to see the active slide.
  - **Touch Support**: Allows users to swipe images on touch devices.

## How to Use

1. **Add Text to Image**:
   - Click the "Add Text" button to add a default text box to the active image.
   - The text box will appear in the center of the image, and you can drag it around.

2. **Edit Text**:
   - Once the text is added, click on the text box to select it.
   - The text control panel will appear on the sidebar, where you can:
     - **Text Input**: Change the content of the text box.
     - **Font Family**: Choose from several fonts.
     - **Font Size**: Adjust the size of the text.
     - **Font Weight**: Choose between normal and bold.
     - **Font Style**: Toggle between normal and italic.
     - **Text Color**: Pick a color using the color picker.

3. **Drag Text**:
   - Click and hold the text box to drag it to any desired location on the image.

4. **Upload Image**:
   - Click the "Upload Image" button in the sidebar to upload an image from your device. This image will replace the current image in the slider.

5. **Swipe Through Images**:
   - Use the left and right arrows to navigate between the images in the slider.

## Installation

To run this project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/image-text-editor.git
   ```

2. Navigate to the project directory:
   ```bash
   cd image-text-editor
   ```

3. Open the `index.html` file in your preferred web browser.

## Dependencies

- **Swiper.js**: For the image slider functionality.
  - CDN link included in the HTML file (`https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`).

## Technologies Used

- **HTML**: Markup structure for the webpage.
- **CSS**: Styling for the layout and design of the editor.
- **JavaScript**: For adding interactivity such as text manipulation and image upload.
- **Swiper.js**: For the image slider and navigation.
