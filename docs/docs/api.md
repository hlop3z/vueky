# (API) Application Programming Interface

The **`vuek.API`** function simplifies making HTTP requests to a specified base URL with customizable options. This documentation provides an overview of how to set up the API client and make GET, POST, and file upload requests.

## Setup

### Import and Initialize

```js
const baseURL = "https://example.com";
const options = {
  headers: {
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
};

const api = vuek.API(baseURL, options);
```

- `baseURL`: The base URL for the API.
- `options`: An object containing configuration options, such as headers.

## Making Requests

### GET Request

```js
api
  .get("path", { param1: "value1", param2: "value2" })
  .then((data) => console.log("GET response:", data))
  .catch((error) => console.error("GET error:", error));
```

- `path`: The endpoint path relative to the base URL.
- `params`: An object containing query parameters.

### POST Request

```js
api
  .post("path", { key1: "value1", key2: "value2" })
  .then((data) => console.log("POST response:", data))
  .catch((error) => console.error("POST error:", error));
```

- `path`: The endpoint path relative to the base URL.
- `body`: An object containing the request payload.

### File Upload

#### Single File Upload

```js
const fileInput = document.getElementById('fileInput') as HTMLInputElement;

api
  .upload("upload", fileInput.files[0])
  .then((data) => console.log("File Upload response:", data))
  .catch((error) => console.error("File Upload error:", error));
```

- `path`: The endpoint path relative to the base URL.
- `file`: A single file to be uploaded.

#### Multiple Files Upload

```js
const multipleFiles = [fileInput.files[0], fileInput.files[1]];

api
  .upload("upload", multipleFiles)
  .then((data) => console.log("Files Upload response:", data))
  .catch((error) => console.error("Files Upload error:", error));
```

- `path`: The endpoint path relative to the base URL.
- `files`: An array of files to be uploaded.

## Error Handling

Each request method returns a promise that can be handled using `.then()` for successful responses and `.catch()` for handling errors.

### Example

```js
api
  .get("example", { sample: "data" })
  .then((response) => {
    console.log("Response received:", response);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

This setup provides a consistent and straightforward way to interact with your API, handling various types of requests with ease.
