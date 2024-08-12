import prisma from '@/prisma/client';
import { Router } from 'express';
import xml2js from 'xml2js';
export const xmlController = Router();

xmlController.post('/classes', async (req, res) => {
  const xmlData = req.file?.buffer.toString();

  if (!xmlData) {
    return res.status(400).send('No XML file uploaded');
  }

  xml2js.parseString(xmlData, async (err, result) => {
    if (err) {
      return res.status(400).send('Invalid XML');
    }
    console.log('result: ', result);
    const classes = result.classes.class;

    if (!Array.isArray(classes)) {
      return res.status(400).send('Invalid XML format');
    }

    try {
      for (const classData of classes) {
        await prisma.class.create({
          data: {
            class_datetime: classData.class_datetime,
            class_location_id: parseInt(classData.class_location_id[0]),
            class_activity_id: parseInt(classData.class_activity_id[0]),
            class_trainer_user_id: parseInt(classData.class_trainer_user_id[0]),
            class_name: classData.class_name[0],
          },
        });
      }
      res.status(201).send('Classes created successfully');
    } catch (error) {
      console.error('Error creating classes:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});
