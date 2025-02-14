export const getAvatars = async (): Promise<{
  bucketName: string;
  numberOfObjects: number;
  objects: StorageObject[];
} | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/avatars`);

  const responseJSON: {
    success: true;
    data: {
      bucketName: string;
      numberOfObjects: number;
      objects: StorageObject[];
    } | null;
  } = await response.json();

  return responseJSON.data;
};
