import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { url } from 'inspector';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  return (
    <div style={{ direction: "rtl", minHeight: "11vh" }}>
      <Window
        title={" تغییرات لحظه ای تتر (دلار)"}
        style={{
          color: "#f7faf9",
          fontSize: 17,
          minHeight: 190,
          margin: 180,
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "100%", height: 50, backgroundColor: "#3c6e5a", borderRadius: 0, textAlign: "center", }}>
          <br-x />
          <br-xx />
          🪙 قیمت در لحظه: {(props.p.price as number).toLocaleString("fa-IR")}
        </div>
        <div style={{ width: "100%", height: 50, backgroundColor: "#4d7867", borderRadius: 0, textAlign: "center", }}>
          <br-x />
          <br-xx />
          💰 تغییرات در ۲۴ ساعت اخیر: ٪{(Number(props.p.diff24d as number)).toLocaleString("fa-IR")}
        </div>

        <div style={{ width: "100%", height: 50, backgroundColor: "#648779", borderRadius: 0, textAlign: "center", }}>
          <br-x />
          <br-xx />
          📈 تغییرات هفتگی: ٪{(Number(props.p.diff7d as number)).toLocaleString("fa-IR")}
        </div>

        <div style={{ width: "100%", height: 50, backgroundColor: "#81a697", borderRadius: 0, textAlign: "center", }}>
          <br-x />
          <br-xx />
          📉 تغییرات ماهانه: ٪{(Number(props.p.diff30d as number)).toLocaleString("fa-IR")}
        </div>



        <br />
        <center style={{ fontSize: 10, color: "black", }}>
          تهیه شده توسط هستی نگهبان - LocalHost ©
        </center>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT


  console.log("PRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIICE", p)


  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}