export const MAX_FILE_SIZE = (10 << 10) << 10

export const fileSizeValidations =
  (maxFileSize = MAX_FILE_SIZE) =>
  (file: File) =>
    !file || (!!file && file.size <= maxFileSize)
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const extenstionValidation =
  (ext = ACCEPTED_IMAGE_TYPES) =>
  (file: File) =>
    !file || (!!file && ext.includes(file.type))
