import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { isJwtEmptyOrInvalid } from "../../util/jwt-util";
import { getRequestById } from "../../util/request-report-util";
import NavBar from "../../components/nav-bar";
import Moment from "react-moment";

const requestById = (props: any) => {
  console.log('requesById', 'props', props);

  const router = useRouter();
  const [ request, setRequest ] = useState();

  const requestStatus = () => {
    return (
      <div className="request-status">
        <div className="request-status__icon">
          <span>{ request?.unlocked? "✅" : "⛏️" }</span> 
        </div>

        <div>Request ID : { request?.id }</div>

        <div>Estimation : { request?.unlocked? "Ready" : "In progress" }</div>

        <div>
          <span>Submitted Date :&nbsp;</span>
          <Moment format="YYYY/MM/DD">{ request?.createdAt }</Moment>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if(!isJwtEmptyOrInvalid()) {
      getRequestById(props.id).then(res => { setRequest(res); }).catch(err => {
        alert('Opps. Something is wrong.');
        router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/user-home`);
      });
    }else {
      router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
    }
  }, []);

  return (
    <div className="requests_id">
      <NavBar/>

      <div className="requests_id__content">
        <div><b>Tier Estimation Status</b></div>
        <div style={{
          fontSize: "16px", 
          margin: "11px 0px 0px 0px"
        }}>
          <b>◾️ 👥 Queue Position : { request?.queuePos }</b>
        </div>
        { requestStatus() }
      </div>
    </div>
  );
}

export default requestById;

export async function getServerSideProps(ctx: any) {
  console.log('UserHome', 'getServerSideProps', ctx);

  const { id } = ctx.params;

  return { props: { id: id } };
}

