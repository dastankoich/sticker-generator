# Multi-Language Sticker Generator with Azure Translator

Welcome to the Multi-Language Sticker Generator repository! This project is a React 18.2.0 application that allows users to generate stickers in multiple languages using the Azure Translator service.

## Introduction
The Multi-Language Sticker Generator is a web application that allows users to create custom stickers in various languages. It leverages the power of the Azure Translator service to dynamically translate user input into different target languages, providing a personalized and multilingual sticker experience.

## Features
- Generate custom stickers with personalized text.
- Translate sticker text into multiple languages using Azure Translator.
- Choose from a variety of sticker designs and styles.
- Download stickers 

## Installation

To install and run the Multi-Language Sticker Generator locally, follow these steps:

1. Clone the repository:
   ```shell
   git clone https://github.com/dastankoich/sticker-generator.git

3. Navigate to the project directory:
4. Install the dependencies:
    ```
    npm install
    ```

5. Set up the Azure Translator service:
- Sign up for an Azure account if you don't have one.
- Create an instance of the Azure Translator service.
- Retrieve the necessary credentials (e.g., subscription key, endpoint).

6. Configure the application:
- Create a `.env` file in the project root directory.
- Set the following environment variables in the `.env` file:
  ```
  REACT_APP_KEY=your_translator_key
  REACT_APP_AZURE_BASE_URL=your_translator_endpoint
  REACT_APP_LOCATION=your_translator_location
  ```

## Getting Started

To start the Multi-Language Sticker Generator, use the following command:
   ```shell
   npm start
   ```

## Usage
1. Open the application in your web browser by navigating to `http://localhost:3000`.

2. Enter the desired text for your sticker in the input field.

3. Select the image by clicking "SlectImage" button.

4. Choose a sticker design and style.

5. Click the "Generate" button to create the sticker.

6. Preview the generated sticker, and if satisfied, click the "Download Sticker" button to save it to your device.





