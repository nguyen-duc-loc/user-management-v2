export const getUsers = async (
  page: number,
  limit: number
): Promise<{
  totalUsers: number;
  users: User[];
}> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/users?${searchParams.toString()}`
  );

  const responseJSON: {
    success: boolean;
    data: { totalUsers: number; users: User[] } | null;
  } = await response.json();

  if (!responseJSON.data) {
    return {
      totalUsers: 0,
      users: [],
    };
  }

  return responseJSON.data;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`);

  const user = (await response.json()).data as User | null;

  return user;
};
