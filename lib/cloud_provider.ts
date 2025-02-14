export const cloudProvider =
  (process.env.CLOUD_PROVIDER?.toLowerCase() as CloudProvider) || "aws";
