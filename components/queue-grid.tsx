import { useEffect, useState } from 'react';

import { Tooltip } from '@mui/material';
import Moment from 'react-moment';

const QueueGrid = (props: any) => { 
  console.log(props);

  const { userRequest, lastEstimatedRequest } = props;
  const defaultNumOfCell = 82;

  const [ queuePos, setQueuePos ] = useState(29);

  useEffect(() => {
    setQueuePos(userRequest?.queuePos);
    console.log(lastEstimatedRequest);
  }, []);

  const getToolTipText = (children, request) => {
    const data = (<Moment format='YYYY/MM/DD'>{ request?.createdAt }</Moment>);

    return (
      <Tooltip title={
        <span>
          { "Request ID : " + request?.id }
          <br></br>
          { "Queue Position : " + request?.queuePos }
          <br></br>
          { "Submited Date : " }
          { data }
        </span>
      }>
        { children }
      </Tooltip>
    )
  }
  
  const hightLightedCell = (
    getToolTipText(
      <td scope="row">
        <a href="javascript:void(0)">
          <div style={{
            borderRadius: "16px",
            backgroundColor:  "red",

            display: "block",
            height: "6px",
            width: "6px"
          }}>
          </div>
        </a>
      </td>, userRequest)
  );

  const lastEstimatedRequestCell = (
    getToolTipText(
      <td scope="row">
        <a href="javascript:void(0)">
          <div style={{
            borderRadius: "16px",
            backgroundColor:  "green",

            display: "block",
            height: "6px",
            width: "6px"
          }}>
          </div>
        </a>
      </td>, lastEstimatedRequest)
  )

  const queueGrid = (isUpper) => {
    const upperRow = [];
    const lowerRow = [];

    const numOfCellPerRow  = defaultNumOfCell / 2;

    for(let i = numOfCellPerRow - 1; i >= 0 ; i --) {
      if(i === userRequest?.queuePos && i !== 0) {
        lowerRow.push(hightLightedCell);
      }else if(i === userRequest?.queuePos && i === 0) {
        if(!userRequest?.unlocked) {
          lowerRow.push(hightLightedCell);
        }else {
          lowerRow.push(lastEstimatedRequestCell? lastEstimatedRequestCell : (<td scope="row"></td>));
        }
      }else {
        if(i === 0) {
          lowerRow.push(lastEstimatedRequestCell? lastEstimatedRequestCell : (<td scope="row"></td>));
        }else {
          lowerRow.push((<td scope="row"></td>));
        }
      }
    }

    for(let j = defaultNumOfCell - 1; j >= numOfCellPerRow; j --) {
      if(j === userRequest?.queuePos) {
        upperRow.push(hightLightedCell);
      }else {
        upperRow.push((<td scope="row"></td>));
      }
    }

    return isUpper ? upperRow : lowerRow;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            { queueGrid(true) }
          </tr>
          
          <tr>
            { queueGrid(false) }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default QueueGrid;