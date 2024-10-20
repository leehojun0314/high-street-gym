// import YogaImg from '@/assets/activities/yoga.jpg';
import useActivity from '@/hooks/useActivity';
import { Link } from 'react-router-dom';
export default function Activity() {
  const { activity, activities, handleActivityClick } = useActivity();
  return (
    <main>
      <section className='bg-[url("/src/assets/activities/yoga.jpg")] h-[200px] bg-cover bg-center'>
        {/* <img
          src={YogaImg}
          alt='Banner image'
          width={'100%'}
          // height={200}
          className='object-cover relative top-[-140%]'
        /> */}
      </section>
      <section className='p-8 flex flex-row justify-around'>
        <div className='w-[50%]'>
          <h1 className='text-2xl font-bold'>{activity?.activity_name}</h1>
          <p className='h-[300px] overflow-auto'>
            {activity?.activity_description}
          </p>
        </div>
        <aside className='mt-[-100px]  w-[280px] rounded text-center text-white p-4 flex flex-col gap-4'>
          <div className='bg-black flex flex-col gap-4 p-6 rounded-lg'>
            <h2 className='text-2xl bold'>Activities</h2>
            <hr />
            <ul className='flex flex-col gap-4'>
              {activities.map((el) => (
                <li
                  key={el.activity_id}
                  className={
                    'cursor-pointer group hover:text-primary hover:decoration-primary' +
                    (el.activity_id === activity?.activity_id
                      ? ' text-primary'
                      : '')
                  }
                >
                  <span
                    onClick={handleActivityClick(el.activity_id)}
                    className={
                      'block group-hover:text-primary leading-4' +
                      (el.activity_id === activity?.activity_id
                        ? ' underline decoration-primary'
                        : '')
                    }
                  >
                    {el.activity_name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link className='btn btn-primary' to='/booking/new'>
            Book Now
          </Link>
        </aside>
      </section>
    </main>
  );
}
