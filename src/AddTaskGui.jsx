import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./Palette";
import supabase from "./supabase";

dayjs.extend(duration);

export default function AddTaskGui({
  setTasks,
  taskList,
  showForm,
  setShowForm,
}) {
  const [str, setStr] = useState("");
  const [cat, setCat] = useState("");
  const [time, setTime] = useState(dayjs());
  const [isUploading, setIsUploading] = useState(false);

  function DateTimePickerValue({ time, setTime }) {
    return (
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='Select a time'
            views={["year", "month", "day", "hours", "minutes"]}
            sx={{ marginLeft: "10px" }}
            value={time}
            onChange={(newTime) => setTime(newTime)}
            disablePast
          />
        </LocalizationProvider>
      </ThemeProvider>
    );
  }

  async function handleSubmit(e) {
    let task;
    // prevent browser reload
    e.preventDefault();

    // check if data is valid => create new fact obj

    if (str && cat && time && str.length <= 200) {
      // add fact to ui
      setIsUploading(true);
      let countdownMs = time.diff(dayjs());

      let countdownMinutes = Math.round(dayjs.duration(countdownMs).asMinutes());

      const { data: task, error } = await supabase
        .from("list")
        .insert([
          {
            text: str,
            type: cat,
            time,
            countdown: countdownMinutes,
            is_deleted: false,
          },
        ])
        .select();

      if (!error) setTasks((taskList) => [task[0], ...taskList]);

      setIsUploading(false);

      console.log(time);
      // reset inputs
      setStr("");
      setCat("");
      setTime(useState(dayjs()));

      // close form
      setShowForm(!showForm);
    }
  }

  return (
    <>
      <div className='contact card'>
        <form onSubmit={handleSubmit}>
          <input
            id='eventField'
            type='text'
            placeholder='Event name'
            value={str}
            onChange={(e) => setStr(e.target.value)}
          />
          <span style={{ fontSize: "14px" }}> {200 - str.length}</span>

          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value=''>Reminder type:</option>
            <option value='Action'>Action</option>
            <option value='Event'>Event</option>
          </select>

          <DateTimePickerValue time={time} setTime={setTime} />

          <button className='stylebutton' type='submit' disabled={isUploading}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}
