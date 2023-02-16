import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any) => {
  const decoded = jwtDecode(response.credential);

  console.log(response, jwtDecode(response), decoded);
};
