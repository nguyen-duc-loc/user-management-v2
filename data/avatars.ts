export const getAvatars = async (): Promise<{
  bucketName: string;
  numberOfObjects: number;
  objects: AvatarObject[];
} | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/avatars`);

  const responseJSON: {
    success: true;
    data: {
      bucketName: string;
      numberOfObjects: number;
      objects: AvatarObject[];
    } | null;
  } = await response.json();

  return responseJSON.data;
};
