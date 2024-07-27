class API {
  private baseURL: string;
  private options: any; // You can specify the type for options based on your needs

  constructor(baseURL: string, options: any) {
    this.baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";
    this.options = options || {};
  }

  private formatURL(path: string): string {
    // Remove leading / from the path
    path = path.startsWith("/") ? path.slice(1) : path;
    return this.baseURL + path;
  }

  private formatParams(params: any): string {
    // Convert object to query parameters
    const queryParams = new URLSearchParams(params).toString();
    return queryParams ? `?${queryParams}` : "";
  }

  async get(path: string, args: any): Promise<any> {
    const url = this.formatURL(path) + this.formatParams(args);
    const response = await fetch(url, this.options);
    return response.json();
  }

  async post(path: string, args: any): Promise<any> {
    const url = this.formatURL(path);
    const options = {
      ...this.options,
      method: "POST",
      headers: {
        ...(this.options.headers || {}),
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(args),
    };

    const response = await fetch(url, options);
    return response.json();
  }

  async upload(path: string, files: File[] | File, args: any): Promise<any> {
    const url = this.formatURL(path) + this.formatParams(args);
    const formData = new FormData();
    if (Array.isArray(files)) {
      // If multiple files, append each with its real name to the form data
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      // If a single file, append it with its real name to the form data
      formData.append("file", files);
    }

    const options = {
      ...this.options,
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, options);
    return response.json();
  }
}

export default function createAPI(baseURL: string, options?: any) {
  return new API(baseURL, options);
}
