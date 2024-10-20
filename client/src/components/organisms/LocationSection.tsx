import { locations } from '@/static/locations';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import addressLogo from '@/assets/address.svg';
import phoneLogo from '@/assets/phone.svg';
export default function LocationSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabMenu = useCallback((index: number) => {
    return () => {
      setSelectedIndex(index);
    };
  }, []);
  return (
    <section className='flex flex-row p-6 items-center gap-3'>
      <div className='flex flex-col gap-[10px] flex-1'>
        {/* left */}
        <div className='md:w-[400px] bg-black text-white'>
          {/* menu */}
          <ul className='list-none flex flex-col text-[40px] items-center justify-center p-0 py-[40px] gap-[10px] overflow-hidden'>
            {locations.map((location, index) => {
              return (
                <motion.li
                  key={index}
                  onClick={handleTabMenu(index)}
                  whileHover={{ scale: 1.1 }}
                  whileInView={{
                    x: 200,
                  }}
                  viewport={{ once: true }}
                  // animate={{
                  // 	color:
                  // 		selectedIndex === index ? '#4ff9da' : 'white', // Change color on selection
                  // 	textDecoration:
                  // 		selectedIndex === index ? 'underline' : 'none',
                  // 	textDecorationColor:
                  // 		selectedIndex === index ? '#4ff9da' : 'white',
                  // }}
                  transition={{
                    // delay: 0.2,
                    type: 'spring',
                  }}
                  className={` cursor-pointer relative left-[-200px] ${
                    selectedIndex === index
                      ? 'text-primary underline decoration-primary'
                      : 'text-white'
                  }`}
                >
                  {location.name}
                </motion.li>
              );
            })}
          </ul>
        </div>
        <div className='md:w-[400px] min-h-[170px] border-2 border-black bg-primary p-6 text-2xl justify-between flex flex-col '>
          {/* info */}
          <address
            className='mb-4 flex flex-row gap-1 flex-wrap'
            itemScope
            itemType='http://schema.org/PostalAddress'
          >
            <img
              width={24}
              height={24}
              src={addressLogo}
              alt='address'
              className='inline min-h-0'
            />{' '}
            {/* <span>{locations[selectedIndex].address1}</span>
						<br />
						<span>{locations[selectedIndex].address2}</span> */}
            <span itemProp='streetAddress'>
              {locations[selectedIndex].address.streetAddress}
            </span>
            <span itemProp='addressRegion'>
              {locations[selectedIndex].address.addressRegion}
            </span>
            <span itemProp='postalCode'>
              {locations[selectedIndex].address.postalCode}
            </span>
            <span itemProp='addressCountry'>
              {locations[selectedIndex].address.addressCountry}
            </span>
          </address>
          <div>
            <img src={phoneLogo} alt='phone' width={24} className='inline' />{' '}
            <a
              href={`tel:${locations[selectedIndex].telephone.replace(
                '-',
                '',
              )}`}
              className='bg-inherit focus:border-none'
              itemProp='telephone'
            >
              {locations[selectedIndex].telephone}
            </a>
          </div>
        </div>
      </div>
      <div className='md:block hidden flex-[3]'>
        {/* right */}
        {locations.map((location, index) => {
          return (
            <iframe
              src={location.map}
              width='100%'
              height='550'
              style={{
                border: 0,
                display: index == selectedIndex ? 'block' : 'none',
                width: '100%',
              }}
              title='googleMap'
              referrerPolicy='no-referrer-when-downgrade'
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}
