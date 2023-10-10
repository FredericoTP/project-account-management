import { JwtPayload } from 'jsonwebtoken';

interface JwtInterface {
  generateToken(payload: JwtObject): string;
  validateToken(token: string): string | JwtPayload;
}

interface JwtObject {
  id: number;
  name: string;
  email: string;
}

export { JwtInterface, JwtObject };
