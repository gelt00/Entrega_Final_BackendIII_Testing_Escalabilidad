import { jest, describe, test, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../src/repositories/adoptions.repository.js', () => ({
  getAllAdoptions: jest.fn(),
  getAdoptionById: jest.fn(),
  createAdoption: jest.fn(),
}));

jest.unstable_mockModule('../src/repositories/users.repository.js', () => ({
  getUserById: jest.fn(),
  findUserByEmail: jest.fn(),
}));

jest.unstable_mockModule('../src/repositories/pets.repository.js', () => ({
  getPetById: jest.fn(),
  createPet: jest.fn(),
  updatePetById: jest.fn(),
}));

const adoptionsRepo = await import('../src/repositories/adoptions.repository.js');
const usersRepo = await import('../src/repositories/users.repository.js');
const petsRepo = await import('../src/repositories/pets.repository.js');
const { default: app } = await import('../src/app.js');
const { default: request } = await import('supertest');

describe('Router de Adopciones: GET & POST /api/adoptions (Functional Tests con Mocks)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/adoptions -> Obtener todas las adopciones', () => {
    test('Debería retornar 200 y el listado de adopciones', async () => {
      const mockAdoptions = [
        {
          _id: '60d5ec49f1b2c81184a7e1a1',
          owner: '60d5ec49f1b2c81184a7e100',
          pet: '60d5ec49f1b2c81184a7e200',
          status: 'completado',
        },
      ];
      adoptionsRepo.getAllAdoptions.mockResolvedValue(mockAdoptions);

      const response = await request(app).get('/api/adoptions');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Adopciones obtenidas exitosamente');
      expect(response.body.payload).toEqual(mockAdoptions);
      expect(adoptionsRepo.getAllAdoptions).toHaveBeenCalledTimes(1);
    });

    test('Debería manejar errores y pasar al middleware de errores', async () => {
      adoptionsRepo.getAllAdoptions.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/adoptions');

      expect(response.statusCode).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/adoptions/:aid -> Obtener adopción por ID', () => {
    test('Debería retornar 200 y la adopción si existe', async () => {
      const mockAdoption = {
        _id: '60d5ec49f1b2c81184a7e1a1',
        owner: '60d5ec49f1b2c81184a7e100',
        pet: '60d5ec49f1b2c81184a7e200',
        status: 'completado',
      };
      adoptionsRepo.getAdoptionById.mockResolvedValue(mockAdoption);

      const response = await request(app).get('/api/adoptions/60d5ec49f1b2c81184a7e1a1');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toEqual(mockAdoption);
      expect(adoptionsRepo.getAdoptionById).toHaveBeenCalledWith('60d5ec49f1b2c81184a7e1a1');
    });

    test('Debería retornar 404 si la adopción no existe', async () => {
      adoptionsRepo.getAdoptionById.mockResolvedValue(null);

      const response = await request(app).get('/api/adoptions/60d5ec49f1b2c81184a7e999');

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Adopción no encontrada');
    });
  });

  describe('POST /api/adoptions/:uid/:pid -> Crear registro de adopción', () => {
    const validUid = '60d5ec49f1b2c81184a7e100';
    const validPid = '60d5ec49f1b2c81184a7e200';

    test('Debería crear una adopción exitosamente (Status 201)', async () => {
      usersRepo.getUserById.mockResolvedValue({ _id: validUid, username: 'juan' });
      petsRepo.getPetById.mockResolvedValue({ _id: validPid, name: 'Fido', adopted: false });
      
      const createdAdoption = {
        _id: '60d5ec49f1b2c81184a7e1a1',
        owner: validUid,
        pet: validPid,
        status: 'completado',
      };
      adoptionsRepo.createAdoption.mockResolvedValue(createdAdoption);
      petsRepo.updatePetById.mockResolvedValue({ _id: validPid, adopted: true, owner: validUid });

      const response = await request(app).post(`/api/adoptions/${validUid}/${validPid}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toEqual(createdAdoption);
      expect(petsRepo.updatePetById).toHaveBeenCalledWith(validPid, { adopted: true, owner: validUid });
    });

    test('Debería retornar 404 si el usuario no existe', async () => {
      usersRepo.getUserById.mockResolvedValue(null);

      const response = await request(app).post(`/api/adoptions/invalidUser/${validPid}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Usuario no encontrado');
    });

    test('Debería retornar 404 si la mascota no existe', async () => {
      usersRepo.getUserById.mockResolvedValue({ _id: validUid, username: 'juan' });
      petsRepo.getPetById.mockResolvedValue(null);

      const response = await request(app).post(`/api/adoptions/${validUid}/invalidPet`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Mascota no encontrada');
    });

    test('Debería retornar 400 si la mascota ya fue adoptada previamente', async () => {
      usersRepo.getUserById.mockResolvedValue({ _id: validUid, username: 'juan' });
      petsRepo.getPetById.mockResolvedValue({ _id: validPid, name: 'Fido', adopted: true });

      const response = await request(app).post(`/api/adoptions/${validUid}/${validPid}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('La mascota ya ha sido adoptada');
    });
  });
});
