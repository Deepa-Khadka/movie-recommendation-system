import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiSelector, HiCheck } from "react-icons/hi";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";

function Filter(props) {
  const {
    Categories,
    category,
    setCategory,
    setLanguage,
    language,
    year,
    setYear,
    times,
    setTimes,
    rates,
    setRates,
  } = props?.data;
  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items:
        Categories?.length > 0
          ? [{ title: "All Categories" }, ...Categories]
          : [{ title: "No category found" }],
    },
    {
      value: language,
      onchange: setLanguage,
      items: LanguageData,
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
      <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
        {Filter.map((item, index) => (
          <Listbox key={index} value={item.value} onChange={item.onchange}>
            <div className="relative">
              <Listbox.Button className="relative border border-gray-800 bg-main w-full text-white rounded-lg py-4 pl-6 pr-10 text-left text-xs">
                <span className="block truncate">
                  {item.value?.title || ""}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector className="h-4 w-5" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 bg-dry border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60  ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {item.items.map((option, optionIndex) => (
                    <Listbox.Option
                      key={optionIndex}
                      className={({ active }) =>
                        `${active ? "text-dryGray bg-subMain" : "text-dryGray"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {option.title}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-subMain" : "text-subMain"
                              }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        ))}
      </div>
    </>
  );
}

export default Filter;
