import { axiosAPI } from '@/libs/axiosAPI';
import { TActivity } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export default function useActivity() {
  const [activity, setActivity] = useState<TActivity>();
  const [activities, setActivities] = useState<TActivity[]>([]);
  useEffect(() => {
    axiosAPI
      .get('/activity')
      .then((res) => {
        console.log('activities: ', res.data);
        setActivities(res.data);
        setActivity(res.data[0]);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }, []);
  const handleActivityClick = useCallback(
    (id: number) => {
      return () => {
        setActivity(activities.find((el) => el.activity_id === id));
      };
    },
    [activities],
  );
  return {
    activity,
    activities,
    handleActivityClick,
  };
}
