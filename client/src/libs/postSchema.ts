import * as yup from 'yup';
export const postSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  content: yup
    .string()
    .required('Content is required')
    .min(2, 'Content must be at least 2 characters long')
    .max(500, 'Content must be at most 500 characters long'),
});
