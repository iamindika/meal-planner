import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const ScheduleContext = createContext();

const ScheduleContextProvider = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    error: null,
    isUpdating: false
  });
  return (
    <ScheduleContext.Provider
      value={{
        state,
        setState
      }}
    >
      {props.children}
    </ScheduleContext.Provider>
  );
};

export const useFetchSchedule = () => {
  const { state, setState } = useContext(ScheduleContext);
  React.useEffect(() => {
    fetchData();
  }, []);
};

const fetchData = async () => {
  setState((prev) => {
    if (prev.data) {
      return {
        ...prev,
        isUpdating: true
      }
    }

    try {
      const res = await axios.all([
        axios({
          method: 'GET',
          url: `/recipes/user/${id}/slot/1`,
        }),
        axios({
          method: 'GET',
          url: `/recipes/user/${id}/slot/2`,
        }),
        axios({
          method: 'GET',
          url: `/recipes/user/${id}/slot/3`,
        })
      ])
      setState({
        isLoading: false,
        isUpdating: false,
        error: null,
        data: res.data
      })
    } catch (e) {
      setState({
        isLoading: false,
        isUpdating: false,
        error: e,
        data: null
      })
    }
  })
}