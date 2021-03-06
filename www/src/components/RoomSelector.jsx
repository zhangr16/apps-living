import React from 'react';
import {Select} from 'antd';
import axios from 'axios';
import Helper from "./Helper";

export default class RoomSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      selected: 'Select Room',
    };
  }

  fetchRooms(house) {
    axios.get(Helper.getURL() + '/api/rooms/' + house, {
    })
      .then(jsonData => {
        this.setState({
          rooms: jsonData.data.rooms
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(selected) {
    // console.log('RoomSelector Touched!!!');
    this.props.getRoomNumber(selected);
    let r = this.state.rooms;
    for (let i = 0; i < r.length; i++) {
      if (r[i].roomNumber === selected) {
        this.props.getRoomId(r[i].roomId);
      }
    }
    this.setState({
      selected: selected
    });
  }

  componentWillReceiveProps(nextProps) {
    this.fetchRooms(nextProps.house);
    if (nextProps.reset === true) {
      this.setState({selected: 'Select Room'});
    }
  }

  render() {

    const Option = Select.Option;
    let r = this.state.rooms;
    let children = [];
    for (let i = 0; i < r.length; i++) {
      children.push(<Option key={r[i].roomNumber}>
        {r[i].roomNumber}</Option>);
    }

    console.log('RoomSelector.state:', this.state);
    console.log('RoomSelector.props:', this.props);

    return (
      <div>
        <Select showSearch
                style={{ width: 200}}
                placeholder="Select Room"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                value={this.state.selected}
                disabled={this.props.disabled}
        >
          {children}
        </Select>
      </div>
    );
  }
}
