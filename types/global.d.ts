type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  birthdate: Date;
  avatar: string | null;
};

type AvatarObject = {
  Url: string;
  Key: string;
  LastModified: Date;
  Size: number;
  StorageClass: string;
};
