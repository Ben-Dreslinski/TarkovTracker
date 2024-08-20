import axios, { AxiosInstance, AxiosResponse } from 'axios';

class BaseApi {
  private axiosInstance: AxiosInstance;
  private readonly baseURL: string;

  constructor() {
    this.baseURL = 'https://tarkov.wpgtracker.top';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Method for GET requests
  public async get<T>(route: string, params?: object): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(route, { params });
      return response;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  // Method for POST requests
  public async post<T>(route: string, data: object): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(route, data);
      return response;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
}

export default new BaseApi();
