import React, { Fragment, useState } from 'react';
import { CategoriesData } from '../Data/CategoriesData';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector, CheckIcon } from 'react-icons/hi';

const YearData = [
  { title: 'Sort By Year' },
  { title: '1700 - 1800' },
  { title: '1800 - 1900' },
  { title: '1900 - 2000' },
];

const TimesData = [
  { title: 'Sort By Hours' },
  { title: '1 - 2 Hours' },
  { title: '2 - 3 Hours' },
  { title: '3 - 4 Hours' },
];

const RatesData = [
  { title: 'Sort By Rates' },
  { title: '1 Star' },
  { title: '2 Star' },
  { title: '3 Star' },
  { title: '4 Star' },
  { title: '5 Star' },
];

function Filter() {
  const [category, setCategory] = useState({ title: 'Category' });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);

  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items: CategoriesData,
    },
    {
      value: year,
      onchange: setYear,
      items: YearData,
    },
    {
      value: times,
      onchange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onchange: setRates,
      items: RatesData,
    },
  ];

  return (
    <>
      <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
        {Filter.map((item, index) => (
          <Listbox key={index} value={item.value} onChange={item.onchange}>
            <div className="relative">
              <Listbox.Button className="relative border border-gray-800 bg-main w-full text-white rounded-lg py-4 pl-6 pr-10 text-left text-xs">
                <span className="block truncate">{item.value.title}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                 

                        <HiSelector className="h-4 w-5" aria-hidden="true"/>
                    </span>
                    </Listbox.Button>
                    <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className='absolute z-10 mt-1 bg-dry border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60  ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
            </Listbox.Options>
                </Transition>        
                </div>
            </Listbox>

        ))}
    </div> 
 </>

  )
}

export default Filter
