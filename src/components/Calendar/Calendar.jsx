import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./Calendar.css";
import { NavLink } from "react-router-dom";

class Calendar extends Component {
  state = { selectedDay: undefined };

  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  };

  handlePickShift = () => {
    console.log("button");
  };

  // TODO: Make sure that

  render() {
    return (
      <div className="wrapper">
        <div className="centered">
          <DayPicker
            className="centered"
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
            //disabledDays={{ daysOfWeek: [0] }}
          />
          {this.state.selectedDay ? (
            <div>
              <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
              <button onClick={this.handlePickShift}>
                <NavLink to="/ShiftPicker"> Chose Shift </NavLink>
              </button>
            </div>
          ) : (
            <p>Please select a day.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;
