async function savelog(stackname, loglevel, packagename, logtext){

  let logdata = {
    stack: stackname,
    level: loglevel,
    package: packagename,
    message: logtext
  }

  try{

    await fetch("http://4.224.186.213/evaluation-service/logs", {

      method: "POST",

      headers:{
        "Content-Type":"application/json"
      },

      body: JSON.stringify(logdata)

    })

  }
  catch(error){

  }

}

export default savelog