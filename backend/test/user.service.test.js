import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../src/prisma/prismaClient.js', () => ({
  default: { user: { findUnique: vi.fn(), create: vi.fn() } },
}));

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(() => 'fake-token'), 
}));

import * as userService from '../src/services/user.service.js';
import prisma from '../src/prisma/prismaClient.js';
import bcrypt from 'bcrypt';

const resMock = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
});

describe('UserService - loginUser', () => {
  afterEach(() => vi.clearAllMocks());

  it('Debería retornar error con credenciales incorrectas', async () => {
    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const res = resMock();

    prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedPassword', role: 'USER' });
    bcrypt.compare.mockResolvedValue(false);

    await userService.loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
  });

  it('Debería retornar error si el usuario no existe', async () => {
    const req = { body: { email: 'noone@example.com', password: '1234' } };
    const res = resMock();

    prisma.user.findUnique.mockResolvedValue(null);

    await userService.loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
  });
});
