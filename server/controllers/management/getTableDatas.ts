import prisma from '@/prisma/client';
import { activityTypes, EType, TExtendedRequest, TTable } from '@/types';
import { getErrorMessage, remapFilters } from '@/utils/functions';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export async function getTableDatas(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    const { table, ...filtersQuery } = req.query as {
      table: TTable;
      [key: string]: string;
    };
    console.log('table: ', table);
    console.log('filtersQuery: ', filtersQuery);
    const filters = remapFilters(filtersQuery);
    if (!table) {
      res.status(400).send('table is required');
      return;
    }
    console.log('table: ', table);
    if (user?.user_role === 'ADMIN') {
      switch (table) {
        case 'activity': {
          const activities = await prisma.activity.findMany({
            where: filters,
          });
          const fields = prisma.activity.fields;
          const extendedFields = {
            ...fields,
            activity_id: {
              ...fields['activity_id'],
              isPrimaryKey: true,
            },
            activity_type: {
              ...fields['activity_type'],
              options: Object.values(EType).map((value) => ({
                value,
                label: activityTypes[value],
              })),
            },
            activity_description: {
              ...fields['activity_description'],
              typeName: 'LongString',
            },
          };
          res
            .status(200)
            .send({ tableDatas: activities, fields: extendedFields });
          break;
        }

        case 'booking': {
          const bookings = await prisma.booking.findMany({
            where: filters,
          });

          const fields = prisma.booking.fields;
          const members = await prisma.user.findMany({
            where: {
              user_role: 'MEMBER',
            },
          });
          const classes = await prisma.class.findMany();
          const extendedFields = {
            ...fields,
            booking_id: {
              ...fields['booking_id'],
              isPrimaryKey: true,
            },
            booking_user_id: {
              ...fields['booking_user_id'],
              isForeignKey: true,
              label: 'booked_by',
              options: members.map((user) => ({
                value: user.user_id,
                label: user.user_firstname + ' ' + user.user_lastname,
              })),
            },
            booking_class_id: {
              ...fields['booking_class_id'],
              isForeignKey: true,
              label: 'class_name',
              options: classes.map((class_) => ({
                value: class_.class_id,
                label: class_.class_name,
              })),
            },
          };
          res
            .status(200)
            .send({ tableDatas: bookings, fields: extendedFields });
          break;
        }
        case 'class': {
          const classes = await prisma.class.findMany({
            where: filters,
          });

          const locations = await prisma.location.findMany();
          const activities = await prisma.activity.findMany();
          const trainers = (await prisma.user.findMany()).filter(
            (user) =>
              user.user_role === 'TRAINER' || user.user_role === 'ADMIN',
          );
          const fields = prisma.class.fields;
          const extendedFields = {
            ...fields,
            class_id: {
              ...fields['class_id'],
              isPrimaryKey: true,
            },
            class_datetime: {
              ...fields['class_datetime'],
              typeName: 'DateTime',
            },
            class_trainer_user_id: {
              ...fields['class_trainer_user_id'],
              isForeignKey: true,
              label: 'class_trainer',
              options: trainers.map((user) => ({
                value: user.user_id,
                label: user.user_firstname + ' ' + user.user_lastname,
              })),
            },
            class_location_id: {
              ...fields['class_location_id'],
              isForeignKey: true,
              label: 'class_location',
              options: locations.map((location) => ({
                value: location.location_id,
                label: location.location_name,
              })),
            },
            class_activity_id: {
              ...fields['class_activity_id'],
              isForeignKey: true,
              label: 'class_activity',
              options: activities.map((activity) => ({
                value: activity.activity_id,
                label: activity.activity_name,
              })),
            },
          };

          res.status(200).send({ tableDatas: classes, fields: extendedFields });
          break;
        }
        case 'blog': {
          const blogs = await prisma.blog.findMany({
            where: filters,
            include: {
              User: {
                select: {
                  user_firstname: true,
                  user_lastname: true,
                },
              },
            },
          });

          // 사용자 이름을 포함한 새로운 데이터 구조를 생성
          const updatedBlogs = blogs.map((blog) => ({
            ...blog,
            post_user_name: `${blog.User.user_firstname} ${blog.User.user_lastname}`, // 이름과 성을 합쳐서 보여줌
          }));

          const fields = prisma.blog.fields;
          const extendedFields = {
            ...fields,
            blog_id: {
              ...fields['blog_id'],
              isPrimaryKey: true,
            },
          };
          res.status(200).send({
            tableDatas: updatedBlogs,
            fields: extendedFields,
          });
          break;
        }
        case 'user': {
          const users = await prisma.user.findMany({
            where: filters,
          });
          const fields = prisma.user.fields;
          const extendedFields = {
            ...fields,
            user_id: {
              ...fields['user_id'],
              isPrimaryKey: true,
            },
            user_role: {
              ...fields['user_role'],
              options: [
                { value: 'ADMIN', label: 'ADMIN' },
                { value: 'MEMBER', label: 'MEMBER' },
                { value: 'TRAINER', label: 'TRAINER' },
              ],
            },
            gender: {
              ...fields['gender'],
              options: [
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
                { value: 'NOT_SPECIFIED', label: 'Not Specified' },
              ],
            },
            dob: {
              ...fields['dob'],
              typeName: 'Date',
            },
          };
          res.status(200).send({
            tableDatas: users,
            fields: extendedFields,
          });
          break;
        }
        case 'location': {
          const locations = await prisma.location.findMany({
            where: filters,
          });
          const fields: Prisma.LocationFieldRefs = prisma.location.fields;
          const extendedFields = {
            ...fields,
            location_id: {
              ...fields['location_id'],
              isPrimaryKey: true,
            },
          };

          res
            .status(200)
            .send({ tableDatas: locations, fields: extendedFields });
          break;
        }
        default: {
          res.status(400).send('table is not valid');
        }
      }
    } else if (user?.user_role === 'TRAINER') {
      switch (table) {
        case 'activity': {
          const activities = await prisma.activity.findMany({
            where: filters,
          });
          const fields = prisma.activity.fields;
          const extendedFields = {
            ...fields,
            activity_id: {
              ...fields['activity_id'],
              isPrimaryKey: true,
            },
            activity_type: {
              ...fields['activity_type'],
              options: Object.values(EType).map((value) => ({
                value,
                label: activityTypes[value],
              })),
            },
            activity_description: {
              ...fields['activity_description'],
              typeName: 'LongString',
            },
          };
          res
            .status(200)
            .send({ tableDatas: activities, fields: extendedFields });
          break;
        }

        case 'class': {
          const classes = await prisma.class.findMany({
            where: filters,
          });

          const locations = await prisma.location.findMany();
          const activities = await prisma.activity.findMany();
          const trainers = await prisma.user.findMany({
            where: {
              user_role: {
                in: ['TRAINER', 'ADMIN'],
              },
            },
          });
          const fields = prisma.class.fields;
          const extendedFields = {
            ...fields,
            class_id: {
              ...fields['class_id'],
              isPrimaryKey: true,
            },
            class_datetime: {
              ...fields['class_datetime'],
              typeName: 'DateTime',
            },
            class_trainer_user_id: {
              ...fields['class_trainer_user_id'],
              isForeignKey: true,
              label: 'class_trainer',
              options: trainers.map((user) => ({
                value: user.user_id,
                label: user.user_firstname + ' ' + user.user_lastname,
              })),
            },
            class_location_id: {
              ...fields['class_location_id'],
              isForeignKey: true,
              label: 'class_location',
              options: locations.map((location) => ({
                value: location.location_id,
                label: location.location_name,
              })),
            },
            class_activity_id: {
              ...fields['class_activity_id'],
              isForeignKey: true,
              label: 'class_activity',
              options: activities.map((activity) => ({
                value: activity.activity_id,
                label: activity.activity_name,
              })),
            },
          };

          res.status(200).send({ tableDatas: classes, fields: extendedFields });
          break;
        }

        default:
          res.status(400).send('table is not valid');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.log('get data error: ', error);
    res.status(500).send(getErrorMessage(error));
  }
}
