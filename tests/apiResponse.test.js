import { expect, jest } from "@jest/globals";
import { successResponse } from "../src/utils/apiResponse.js";

function createMockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
}

describe("apiResponse helpers", () => {

  test("succesResponse deberia enviar una respuesta exitosa con status 200, message, payload", () => {
    const res = createMockResponse();

    successResponse(res, {
      message: 'Products retrieved successfully',
      payload: [
        {
          title: "Monitor curvo",
          price: 100,
          stock: 8
        }
      ]
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: 'Products retrieved successfully',
      payload: [
        {
          title: "Monitor curvo",
          price: 100,
          stock: 8
        }
      ]
    })
  });

  test("successResponse deberia enviar una respuesta exitosa con status 201, message, payload", () => {
    const res = createMockResponse();

    successResponse(res, {
      statusCode: 201,
      message: "Product by id",
      payload: { id: "p1", title: "Teclado mecanico" }
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Product by id",
      payload: { id: "p1", title: "Teclado mecanico" }
    })
  })

});