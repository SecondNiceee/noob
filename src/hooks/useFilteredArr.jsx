import { useMemo } from "react";

export const useFilteredArr = (ordersInformation , filterBy ) => {
    const filteredArr = useMemo(() => {
      if (ordersInformation !== null && ordersInformation){
        let stepOne = ordersInformation.filter((e) => e.status === "active")
        // let stepTwo = stepOne.filter((e) => String(e.user.id) !== String(2144832745))
        let stepThree = stepOne.filter((e) =>
          e.taskName.toLowerCase().includes(filterBy.toLowerCase())
        );
        return stepThree
      }
      return null
      }, [filterBy, ordersInformation]);
    return filteredArr
}