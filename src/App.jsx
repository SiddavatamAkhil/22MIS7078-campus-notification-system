import { useEffect, useState } from "react"
import savelog from "./log"
import "./App.css"

function App(){

  const [notificationdata, setnotificationdata] = useState([])
  const [displaydata, setdisplaydata] = useState([])
  const [selectedfilter, setselectedfilter] = useState("all")
  const [currentpage, setcurrentpage] = useState(1)
  const [isloading, setisloading] = useState(false)

  useEffect(()=>{

    getnotifications()

  }, [])

  useEffect(()=>{

    filternotifications()

  }, [selectedfilter, currentpage, notificationdata])

  async function getnotifications(){

    try{

      setisloading(true)

      savelog(
        "frontend",
        "info",
        "api",
        "loading notifications"
      )

      let sampledata = [

        {
          type: "event",
          message: "tech fest tomorrow",
          time: "10:30 am"
        },

        {
          type: "placement",
          message: "tcs hiring drive",
          time: "11:00 am"
        },

        {
          type: "result",
          message: "mid exam marks released",
          time: "12:00 pm"
        },

        {
          type: "placement",
          message: "infosys hiring process",
          time: "1:00 pm"
        },

        {
          type: "event",
          message: "project expo next week",
          time: "2:00 pm"
        },

        {
          type: "result",
          message: "project review results updated",
          time: "3:00 pm"
        }

      ]

      setnotificationdata(sampledata)

      savelog(
        "frontend",
        "info",
        "api",
        "notifications loaded"
      )

      setisloading(false)

    }
    catch(error){

      savelog(
        "frontend",
        "error",
        "api",
        "loading failed"
      )

      setisloading(false)

    }

  }

  function filternotifications(){

    let tempdata = [...notificationdata]

    if(selectedfilter != "all"){

      tempdata = tempdata.filter(
        (item) => item.type == selectedfilter
      )

    }

    let startvalue = (currentpage - 1) * 2
    let endvalue = startvalue + 2

    setdisplaydata(tempdata.slice(startvalue, endvalue))

  }

  function changefilter(name){

    setselectedfilter(name)
    setcurrentpage(1)

    savelog(
      "frontend",
      "info",
      "component",
      "filter changed"
    )

  }

  return(

    <div className="mainbox">

      <h1>campus notifications</h1>

      <p className="counttxt">
        total notifications : {displaydata.length}
      </p>

      <div className="topbtns">

        <button onClick={()=>changefilter("all")}>
          all
        </button>

        <button onClick={()=>changefilter("event")}>
          event
        </button>

        <button onClick={()=>changefilter("result")}>
          result
        </button>

        <button onClick={()=>changefilter("placement")}>
          placement
        </button>

      </div>

      {

        isloading ?

        <h2 className="loadingtxt">
          loading...
        </h2>

        :

        displaydata.length == 0 ?

        <p className="emptytxt">
          no notifications found
        </p>

        :

        displaydata.map((item, index)=>(

          <div
            className="cardbox"
            key={index}
            onClick={()=>
              savelog(
                "frontend",
                "info",
                "component",
                "notification clicked"
              )
            }
          >

            <h2>
              {item.type}
            </h2>

            <small>
              new notification
            </small>

            <p>
              {item.message}
            </p>

            <span>
              {item.time}
            </span>

          </div>

        ))

      }

      <div className="pagebox">

        <button
          disabled={currentpage == 1}
          onClick={()=>setcurrentpage(currentpage - 1)}
        >
          prev
        </button>

        <button
          disabled={displaydata.length < 2}
          onClick={()=>setcurrentpage(currentpage + 1)}
        >
          next
        </button>

      </div>

    </div>

  )

}

export default App