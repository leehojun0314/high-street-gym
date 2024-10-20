import prisma from '@/prisma/client';
import { Request, Response } from 'express';
import xml2js from 'xml2js';

export default async function xmlController(req: Request, res: Response) {
  const xmlData = req.file?.buffer.toString();
  console.log('xml upload called');
  if (!xmlData) {
    return res.status(400).send('No XML file uploaded');
  }
  console.log('xml data: ', xmlData);

  xml2js.parseString(xmlData, async (err, result) => {
    if (err) {
      console.log('err: ', err);
      return res.status(400).send('Invalid XML');
    }
    console.log('result: ', result);
    if (!result) {
      return res.status(400).send('Invalid XML format');
    }

    try {
      // Location 검증
      if (
        result['locations-upload'] &&
        result['locations-upload']['$'].operation === 'insert'
      ) {
        const locations = result['locations-upload'].locations[0].location;
        console.log('locations: ', locations);
        if (!locations || locations.length === 0) {
          return res.status(400).send('No locations found');
        }

        for (const location of locations) {
          if (!location.name || !location.name[0]) {
            return res.status(400).send('Location name is required');
          }

          // Location 이름이 빈 문자열이 아닌지 확인
          if (
            typeof location.name[0] !== 'string' ||
            location.name[0].trim() === ''
          ) {
            return res.status(400).send('Invalid location name');
          }

          console.log('location: ', location);
          await prisma.location.create({
            data: {
              location_name: location.name[0],
            },
          });
        }
      }

      // Activity validation
      else if (result) {
        const activities = result['activities-upload'].activities[0].activity;
        console.log('activities: ', activities);
        if (!activities || activities.length === 0) {
          return res.status(400).send('No activities found');
        }

        for (const activity of activities) {
          // validate essential fields
          if (!activity['activity-name'] || !activity['activity-name'][0]) {
            return res.status(400).send('Activity name is required');
          }
          if (
            !activity['activity-description'] ||
            !activity['activity-description'][0]
          ) {
            return res.status(400).send('Activity description is required');
          }
          if (
            !activity['activity-description'] ||
            !activity['activity-description'][0]
          ) {
            return res.status(400).send('Activity duration is required');
          }
          if (!activity['activity-type'] || !activity['activity-type'][0]) {
            return res.status(400).send('Activity type is required');
          }

          // check if duration is number and greater than 0
          const duration = Number(activity['activity-duration'][0]);
          if (isNaN(duration) || duration <= 0) {
            return res.status(400).send('Invalid activity duration');
          }

          console.log('activity: ', activity);
          await prisma.activity.create({
            data: {
              activity_name: activity['activity-name'][0],
              activity_description: activity['activity-description'][0],
              activity_duration: duration,
              activity_type: activity['activity-type'][0],
            },
          });
        }
      }

      res.status(200).send('XML data uploaded successfully');
    } catch (error) {
      console.log('error: ', error);
      res.status(500).send('Error uploading XML data');
    }
  });
}
