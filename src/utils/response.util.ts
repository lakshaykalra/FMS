export const successResponse = (data: any, message = 'success', statusCode = 200) => {
  return {
    data,
    message,
    statusCode,
  };
};

export const failureResponse = (message: string, statusCode: number, error?: any) => {
  return {
    message,
    statusCode,
    error,
  };
};
